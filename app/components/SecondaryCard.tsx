import Thumbnail from "./Thumbnail";
import CategoryBadge from "./CategoryBadge";
import SentimentDot from "./SentimentDot";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";

export default function SecondaryCard({
  item,
  index,
}: {
  item: any;
  index: number;
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
      <article
        className="group bg-zinc-900/60 rounded-2xl border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300 overflow-hidden flex flex-col"
        style={{
          animationDelay: `${index * 80}ms`,
        }}
      >
        <div className="relative">
          <Thumbnail
            src={item.image_url}
            alt={item.title}
            className="h-40 w-full"
            fallback={emoji}
          />

          <div className="absolute bottom-3 left-3">
            <CategoryBadge
              category={item.category}
            />
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white mb-3 line-clamp-2">
            {item.title}
          </h3>

          <p className="text-zinc-500 text-sm line-clamp-2 flex-1">
            {item.summary}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-zinc-600 font-mono">
              {timeAgo(item.published_at)}
            </span>

            <SentimentDot
              sentiment={item.sentiment}
            />
          </div>
        </div>
      </article>
    </a>
  );
}