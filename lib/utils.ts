export function timeAgo(dateStr: string) {
  if (!dateStr) return "";

  const diff =
    Date.now() -
    new Date(dateStr).getTime();

  const m = Math.floor(diff / 60000);

  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;

  const h = Math.floor(m / 60);

  if (h < 24) return `${h}h ago`;

  return `${Math.floor(h / 24)}d ago`;
}

export const CATEGORY_COLORS: Record<
  string,
  string
> = {
  technology:
    "bg-sky-500/10 text-sky-400 ring-sky-500/20",

  business:
    "bg-amber-500/10 text-amber-400 ring-amber-500/20",

  politics:
    "bg-red-500/10 text-red-400 ring-red-500/20",

  science:
    "bg-violet-500/10 text-violet-400 ring-violet-500/20",

  world:
    "bg-teal-500/10 text-teal-400 ring-teal-500/20",

  sports:
    "bg-green-500/10 text-green-400 ring-green-500/20",

  entertainment:
    "bg-pink-500/10 text-pink-400 ring-pink-500/20",
};

export const CATEGORY_EMOJI: Record<
  string,
  string
> = {
  technology: "💻",
  business: "📊",
  politics: "🏛️",
  world: "🌍",
  science: "🔬",
  sports: "⚽",
  entertainment: "🎬",
};

export const SENTIMENT_MAP: Record<
  string,
  { label: string; cls: string }
> = {
  positive: {
    label: "Positive",
    cls: "text-emerald-400",
  },

  negative: {
    label: "Negative",
    cls: "text-red-400",
  },

  neutral: {
    label: "Neutral",
    cls: "text-zinc-500",
  },
};