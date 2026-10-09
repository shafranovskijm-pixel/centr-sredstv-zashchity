"use client";

import { useRef, useState, type FormEvent } from "react";
import { config, documentTypes } from "./upload-config";
import styles from "./page.module.css";

type Receipt = { id: string; title: string; filename: string };
type ApiResult = Record<string, unknown>;
const unconfirmed = "Приём файла не подтверждён. Попробуйте ещё раз.";
const expectedBucket = "csz-signed-intake";
const fileTypes: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

function hasPublicAnonKey() {
  try {
    const claims = JSON.parse(atob(config.publicAnonKey.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return claims.role === "anon";
  } catch {
    return false;
  }
}

function receiptFrom(result: ApiResult): string | null {
  return result.status === "awaiting_review" && typeof result.receipt_id === "string" && result.receipt_id.trim()
    ? result.receipt_id
    : null;
}

async function rpc(name: string, payload: ApiResult, signal: AbortSignal): Promise<ApiResult> {
  const response = await fetch(`${config.supabaseUrl}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.publicAnonKey,
      Authorization: `Bearer ${config.publicAnonKey}`,
    },
    body: JSON.stringify(payload),
    signal,
    credentials: "omit",
    cache: "no-store",
  });
  if (!response.ok) throw new Error(unconfirmed);
  const result: unknown = await response.json();
  if (typeof result !== "object" || result === null || Array.isArray(result)) throw new Error(unconfirmed);
  return result as ApiResult;
}

export default function UploadDocuments() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const sentFiles = useRef(new Set<string>());
  const requestIds = useRef(new Map<string, string>());
  const inFlight = useRef(false);
  const connected = config.enabled && hasPublicAnonKey();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!connected || inFlight.current) return;
    setError("");
    const form = event.currentTarget;
    const fields = new FormData(form);
    const file = fields.get("file");
    const documentType = String(fields.get("document_type") || "");
    const selectedType = documentTypes.find((type) => type.id === documentType);
    const comment = String(fields.get("comment") || "").trim();

    if (!(file instanceof File) || !file.size) {
      setError("Выберите непустой файл подписанного документа.");
      return;
    }
    if (!/\.(pdf|docx|xlsx)$/i.test(file.name)) {
      setError("Принимаем файлы PDF, DOCX и XLSX.");
      return;
    }
    if (file.size > config.maxFileBytes) {
      setError("Файл превышает 20 МБ. Сохраните копию меньшего размера.");
      return;
    }
    if (file.name.length > 180) {
      setError("Сократите название файла до 180 символов и повторите загрузку.");
      return;
    }
    if (!selectedType) {
      setError("Выберите вид документа.");
      return;
    }

    inFlight.current = true;
    setBusy(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60_000);

    try {
      const bytesHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", await file.arrayBuffer())))
        .map((byte) => byte.toString(16).padStart(2, "0")).join("");
      const signature = JSON.stringify([documentType, file.name, file.size, comment, bytesHash]);
      if (sentFiles.current.has(signature)) {
        setError("Этот файл уже принят в этой сессии. Для новой версии выберите другой файл.");
        return;
      }
      const requestHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(signature))))
        .map((byte) => byte.toString(16).padStart(2, "0")).join("");
      const storageKey = `csz-upload:${requestHash}`;
      let requestId = requestIds.current.get(signature);
      try {
        const saved = sessionStorage.getItem(storageKey);
        if (saved && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(saved)) requestId = saved;
      } catch { /* In-memory retries also work when session storage is unavailable. */ }
      if (!requestId) requestId = crypto.randomUUID();
      requestIds.current.set(signature, requestId);
      try { sessionStorage.setItem(storageKey, requestId); } catch { /* Keep the in-memory key. */ }

      const extension = file.name.split(".").pop()!.toLowerCase();
      const prepared = await rpc("prepare_csz_signed_upload", {
        p_document_type: documentType,
        p_extension: extension,
        p_original_filename: file.name,
        p_size_bytes: file.size,
        p_comment: comment,
        p_request_id: requestId,
      }, controller.signal);
      let receiptId: string | null = null;
      if (typeof prepared.receipt === "object" && prepared.receipt !== null) {
        receiptId = receiptFrom(prepared.receipt as ApiResult);
      }
      if (!receiptId) {
        if (
          typeof prepared.upload_id !== "string" || !/^[0-9a-f-]{36}$/i.test(prepared.upload_id) ||
          prepared.bucket_id !== expectedBucket ||
          prepared.object_path !== `55c536f0-6024-4386-950e-d180a358e841/${prepared.upload_id}.${extension}` ||
          prepared.content_type !== fileTypes[extension]
        ) throw new Error(unconfirmed);
        const uploaded = await fetch(`${config.supabaseUrl}/storage/v1/object/${expectedBucket}/${prepared.object_path}`, {
          method: "POST",
          headers: {
            "Content-Type": String(prepared.content_type),
            apikey: config.publicAnonKey,
            Authorization: `Bearer ${config.publicAnonKey}`,
            "x-upsert": "false",
          },
          body: file,
          signal: controller.signal,
          credentials: "omit",
          cache: "no-store",
        });
        // Storage versions report existing objects as either 400 or 409.
        // Only the server-side finalization can confirm the reserved file exists.
        if (!uploaded.ok && uploaded.status !== 400 && uploaded.status !== 409) {
          if (uploaded.status === 413) throw new Error("Сервис не принял размер файла. Уменьшите его и повторите загрузку.");
          if (uploaded.status === 429) throw new Error("Слишком много попыток. Повторите загрузку немного позже.");
          throw new Error(unconfirmed);
        }
        const finalized = await rpc("finalize_csz_signed_upload", {
          p_upload_id: prepared.upload_id,
          p_request_id: requestId,
        }, controller.signal);
        receiptId = receiptFrom(finalized);
      }
      if (!receiptId) throw new Error(unconfirmed);
      sentFiles.current.add(signature);
      setReceipts((previous) => [
        ...previous,
        { id: receiptId, title: selectedType.title, filename: file.name },
      ]);
      form.reset();
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "";
      setError(
        message.startsWith("Сервис") || message.startsWith("Слишком") || message.startsWith("Приём")
          ? message
          : "Подтверждение не получено. Проверьте соединение и повторите загрузку.",
      );
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <div className={styles.upload} id="return-documents">
      <div className={styles.uploadHeading}>
        <div>
          <h3>Вернуть подписанные документы</h3>
          <p id="upload-help">По одному файлу: PDF, DOCX или XLSX, до 20 МБ.</p>
        </div>
        {!connected && <span className={styles.connectionStatus}>Приём подписанных файлов пока недоступен</span>}
      </div>
      <form onSubmit={submit} aria-describedby="upload-help" aria-busy={busy}>
        <fieldset disabled={!connected || busy} className={styles.uploadFields}>
          <legend className={styles.srOnly}>Загрузка подписанного документа</legend>
          <label>
            <span>Вид документа</span>
            <select name="document_type" defaultValue="" required>
              <option value="" disabled>Выберите документ</option>
              {documentTypes.map((type) => <option key={type.id} value={type.id}>{type.title}</option>)}
            </select>
          </label>
          <label>
            <span>Подписанный файл</span>
            <input name="file" type="file" accept=".pdf,.docx,.xlsx" required />
          </label>
          <label className={styles.commentField}>
            <span>Комментарий <small>необязательно</small></span>
            <input name="comment" type="text" maxLength={1000} placeholder="Например, уточнение к новой версии" />
          </label>
          <button className={styles.submitButton} type="submit">
            {busy ? "Загружаем…" : "Загрузить подписанный файл"}
          </button>
        </fieldset>
        {error && <p className={styles.uploadError} role="alert">{error}</p>}
      </form>
      <div aria-live="polite" aria-atomic="false">
        {receipts.length > 0 && (
          <ul className={styles.receipts}>
            {receipts.map((receipt, index) => (
              <li key={`${receipt.id}-${index}`}>
                <strong>Файл получен, ожидает проверки: {receipt.title}</strong>
                <span>{receipt.filename}</span>
                <span>Номер приёма: {receipt.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
