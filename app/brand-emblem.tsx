type BrandEmblemProps = {
  className?: string;
  decorative?: boolean;
};

export default function BrandEmblem({
  className = "",
  decorative = false,
}: BrandEmblemProps) {
  return (
    <img
      className={`brand-emblem ${className}`.trim()}
      src="/images/centr-sredstv-zashchity-emblem.png"
      alt={decorative ? "" : "Эмблема Центра средств защиты"}
      aria-hidden={decorative ? true : undefined}
      width="1254"
      height="1254"
    />
  );
}
