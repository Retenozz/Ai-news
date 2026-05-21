import CategoryBadge from "./CategoryBadge";
import SentimentDot from "./SentimentDot";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";

export default function HeroCard({
  item,
}: {
  item: any;
}) {
  const emoji =
    CATEGORY_EMOJI[
      item.category?.toLowerCase()
    ] ?? "📰";

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="group relative col-span-full lg:col-span-2 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 cursor-pointer min-h-[420px] lg:min-h-[480px]">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
          <span className="absolute bottom-12 right-12 text-8xl opacity-10 select-none">
            {emoji}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        <div className="relative h-full flex flex-col p-8 lg:p-12 min-h-[420px] lg:min-h-[480px]">
          <div className="flex items-center gap-3">
            <CategoryBadge
              category={item.category}
            />

            <span className="text-xs text-zinc-400 font-mono">
              {timeAgo(item.published_at)}
            </span>
          </div>

          <div className="mt-auto">
            <h2 className="text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-white mb-4">
              {item.title}
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed line-clamp-3 max-w-2xl">
              {item.summary}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {item.tags
                ?.slice(0, 4)
                .map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[11px] text-zinc-500 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            <SentimentDot
              sentiment={item.sentiment}
            />
          </div>
        </div>
      </article>
    </a>
  );
}