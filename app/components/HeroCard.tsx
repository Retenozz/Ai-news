/* eslint-disable @next/next/no-img-element */

import CategoryBadge from "./CategoryBadge";
import SentimentDot from "./SentimentDot";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";
import type { NewsItem } from "@/lib/utils";

export default function HeroCard({
  item,
}: {
  item: NewsItem;
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
      className="block h-full rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/70"
      aria-label={title}
    >
      <article className="group relative min-h-[470px] overflow-hidden rounded-lg border border-slate-900 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.28)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.34)] lg:min-h-[560px]">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#164e63_48%,#312e81_100%)]">
            <span className="absolute bottom-8 right-8 select-none text-7xl font-black tracking-[0.16em] text-white/10 lg:text-8xl">
              {marker}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.55)_48%,rgba(2,6,23,0.96)_100%)]" />

        <div className="relative flex min-h-[470px] flex-col p-5 sm:p-7 lg:min-h-[560px] lg:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={item.category} />
            <span className="border-l border-white/20 pl-3 text-xs font-semibold text-white/70">
              {timeAgo(item.published_at) || "Latest"}
            </span>
            {item.source ? (
              <span className="text-xs font-semibold text-white/55">
                {item.source}
              </span>
            ) : null}
          </div>

          <div className="mt-auto max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Top story
            </p>
            <h2 className="text-3xl font-black leading-[1.04] tracking-normal text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {item.summary ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 line-clamp-3">
                {item.summary}
              </p>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
            <div className="flex min-w-0 flex-wrap gap-2">
              {item.tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <SentimentDot sentiment={item.sentiment} />
          </div>
        </div>
      </article>
    </a>
  );
}
