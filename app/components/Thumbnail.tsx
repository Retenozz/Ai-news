/* eslint-disable @next/next/no-img-element */

type Props = {
  src?: string | null;
  alt?: string | null;
  className: string;
  fallback: string;
};

export default function Thumbnail({
  src,
  alt,
  className,
  fallback,
}: Props) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center border border-slate-200 bg-slate-100 ${className}`}
      >
        <span className="select-none text-sm font-black tracking-[0.14em] text-slate-400">
          {fallback}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt || ""}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
