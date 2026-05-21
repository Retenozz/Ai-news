import Thumbnail from "./Thumbnail";
import CategoryBadge from "./CategoryBadge";

import {
  CATEGORY_EMOJI,
  timeAgo,
} from "@/lib/utils";

export default function ListItem({
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
      <article className="group flex items-start gap-5 py-5 border-b border-zinc-800/60">
        <div className="w-8 text-right">
          <span className="text-2xl font-black text-zinc-800">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <Thumbnail
          src={item.image_url}
          alt={item.title}
          className="w-20 h-16 rounded-xl"
          fallback={emoji}
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge
              category={item.category}
            />

            <span className="text-[11px] text-zinc-600">
              {timeAgo(item.published_at)}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-zinc-200 line-clamp-2">
            {item.title}
          </h3>
        </div>
      </article>
    </a>
  );
}