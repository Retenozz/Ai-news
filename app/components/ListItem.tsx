import Thumbnail from "./Thumbnail";
import CategoryBadge from "./CategoryBadge";
import SentimentDot from "./SentimentDot";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";
import type { NewsItem } from "@/lib/utils";

export default function ListItem({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) {
  const categoryKey = item.category?.toLowerCase() || "";
  const marker = CATEGORY_EMOJI[categoryKey] ?? "NEWS";
  const href = item.link || "#";
  const title = item.title || "Untitled briefing";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/70"
      aria-label={title}
    >
      <article className="group grid grid-cols-[36px_1fr] gap-4 border-b border-slate-200 py-5 transition duration-300 hover:bg-white/70 sm:grid-cols-[48px_124px_1fr] sm:px-3">
        <div className="pt-1 text-right">
          <span className="text-sm font-black tabular-nums text-slate-300 transition group-hover:text-slate-500 sm:text-base">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <Thumbnail
          src={item.image_url}
          alt={title}
          className="hidden h-20 w-full rounded-lg sm:block"
          fallback={marker}
        />

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <CategoryBadge category={item.category} />
            <span className="text-xs font-semibold text-slate-500">
              {timeAgo(item.published_at) || "Latest"}
            </span>
            <SentimentDot sentiment={item.sentiment} />
          </div>

          <h3 className="text-base font-black leading-snug tracking-normal text-slate-950 line-clamp-2 transition group-hover:text-sky-800">
            {title}
          </h3>
          {item.summary ? (
            <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
              {item.summary}
            </p>
          ) : null}
        </div>
      </article>
    </a>
  );
}
