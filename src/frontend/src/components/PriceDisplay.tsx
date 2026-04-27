interface PriceDisplayProps {
  min: bigint;
  max: bigint;
  className?: string;
}

function formatIndianPrice(n: bigint): string {
  const num = Number(n);
  if (num >= 10_000_000) {
    return `₹${(num / 10_000_000).toFixed(1)}Cr`;
  }
  if (num >= 100_000) {
    return `₹${(num / 100_000).toFixed(1)}L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export function PriceDisplay({ min, max, className }: PriceDisplayProps) {
  return (
    <span className={className}>
      {formatIndianPrice(min)} – {formatIndianPrice(max)}
    </span>
  );
}

export { formatIndianPrice };
