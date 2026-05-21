import { CATEGORY_COLORS } from "@/lib/utils";

export default function CategoryBadge({
  category,
}: {
  category: string;
}) {
  const cls =
    CATEGORY_COLORS[
      category?.toLowerCase()
    ] ??
    "bg-zinc-800 text-zinc-400 ring-zinc-700/40";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ring-1 ${cls}`}
    >
      {category}
    </span>
  );
}