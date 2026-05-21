import { CATEGORY_COLORS } from "@/lib/utils";

export default function CategoryBadge({
  category,
}: {
  category?: string | null;
}) {
  const label = category || "Brief";
  const cls =
    CATEGORY_COLORS[
      label.toLowerCase()
    ] ??
    "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.08em] ring-1 ${cls}`}
    >
      {label}
    </span>
  );
}
