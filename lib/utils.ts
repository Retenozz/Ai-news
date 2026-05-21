export type NewsItem = {
  id: string | number;
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  published_at?: string | null;
  link?: string | null;
  image?: string | null;
  tags?: string[] | null;
  sentiment?: string | null;
  source?: string | null;
};

export function timeAgo(dateStr?: string | null) {
  if (!dateStr) return "";

  const publishedTime = new Date(dateStr).getTime();

  if (Number.isNaN(publishedTime)) return "";

  const diff = Date.now() - publishedTime;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

export const CATEGORY_COLORS: Record<string, string> = {
  technology: "bg-sky-50 text-sky-700 ring-sky-200",
  business: "bg-amber-50 text-amber-800 ring-amber-200",
  politics: "bg-red-50 text-red-700 ring-red-200",
  science: "bg-violet-50 text-violet-700 ring-violet-200",
  world: "bg-teal-50 text-teal-700 ring-teal-200",
  sports: "bg-green-50 text-green-700 ring-green-200",
  entertainment: "bg-pink-50 text-pink-700 ring-pink-200",
};

export const CATEGORY_EMOJI: Record<string, string> = {
  technology: "AI",
  business: "BIZ",
  politics: "GOV",
  world: "WORLD",
  science: "LAB",
  sports: "SPORT",
  entertainment: "MEDIA",
};

export const SENTIMENT_MAP: Record<
  string,
  { label: string; cls: string }
> = {
  positive: {
    label: "Positive",
    cls: "text-emerald-700",
  },
  negative: {
    label: "Negative",
    cls: "text-red-700",
  },
  neutral: {
    label: "Neutral",
    cls: "text-slate-500",
  },
};
