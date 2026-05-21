import { SENTIMENT_MAP } from "@/lib/utils";

export default function SentimentDot({
  sentiment,
}: {
  sentiment?: string | null;
}) {
  const s =
    SENTIMENT_MAP[
      sentiment?.toLowerCase()
    ];

  if (!s) return null;

  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${s.cls}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {s.label}
    </span>
  );
}
