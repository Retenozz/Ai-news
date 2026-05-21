type Props = {
  src?: string | null;
  alt: string;
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
        className={`flex items-center justify-center bg-zinc-800/70 ${className}`}
      >
        <span className="text-3xl select-none">
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
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}