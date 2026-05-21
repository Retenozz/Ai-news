import { SENTIMENT_MAP } from "@/lib/utils";

export default function SentimentDot({
  sentiment,
}: {
  sentiment: string;
}) {
  const s =
    SENTIMENT_MAP[
      sentiment?.toLowerCase()
    ];

  if (!s) return null;

  return (
    <span
      className={`text-xs font-medium ${s.cls} flex items-center gap-1`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {s.label}
    </span>
  );
}