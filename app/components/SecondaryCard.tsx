/* eslint-disable @next/next/no-img-element */

import CategoryBadge from "./CategoryBadge";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";
import type { NewsItem } from "@/lib/utils";

function SecondaryCard({
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
      <article
        className="group grid min-h-[156px] grid-cols-[96px_1fr] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:grid-cols-[132px_1fr] lg:min-h-[132px]"
        style={{
          animationDelay: `${index * 80}ms`,
        }}
      >
        <div className="relative overflow-hidden bg-slate-100">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm font-black tracking-[0.14em] text-slate-400">
                {marker}
              </span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-between p-4">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={item.category} />
            <span className="text-xs font-semibold text-slate-500">
              {timeAgo(item.published_at) || "Latest"}
            </span>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-black leading-snug tracking-normal text-slate-950 line-clamp-2">
              {title}
            </h3>
            {item.summary ? (
              <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                {item.summary}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </a>
  );
}

export default SecondaryCard;
