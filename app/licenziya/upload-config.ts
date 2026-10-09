/** Public configuration: never place secrets or credentials in this file. */
export const config = {
  enabled: true,
  supabaseUrl: "https://atxwvjxbqjgkbjlhsdch.supabase.co",
  publicAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0eHd2anhicWpna2JqbGhzZGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwODM5MjcsImV4cCI6MjA4MzY1OTkyN30.5mIZX4EYVPbQbCbHWww8ROD5taCQ51o5qNHOMcKK_s4",
  maxFileBytes: 20 * 1024 * 1024,
};

export const documentTypes = [
  { id: "programme", title: "Единая ДПП — 162 часа" },
  { id: "order", title: "Приказ об утверждении" },
  { id: "fos", title: "Фонд оценочных средств" },
  { id: "application", title: "Заявление" },
  { id: "appendix5", title: "Приложение 5" },
] as const;
