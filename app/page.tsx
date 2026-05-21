import HeroCard from "@/app/components/HeroCard";
import ListItem from "@/app/components/ListItem";
import SecondaryCard from "@/app/components/SecondaryCard";
import { supabase } from "@/lib/supabase";
import type { NewsItem } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data || [];
}

function uniqueValues(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value)))
  );
}

function countSentiment(news: NewsItem[], sentiment: string) {
  return news.filter(
    (item) => item.sentiment?.toLowerCase() === sentiment
  ).length;
}

export default async function HomePage() {
  const news = await getNews();
  const hero = news[0];
  const featured = news.slice(1, 5);
  const rest = news.slice(5);
  const now = new Date();
  const nowTime = now.getTime();
  const categories =
    uniqueValues(news.map((item) => item.category)).slice(0, 6);
  const tags = uniqueValues(
    news.flatMap((item) => (Array.isArray(item.tags) ? item.tags : []))
  ).slice(0, 10);
  const freshCount = news.filter((item) => {
    if (!item.published_at) return false;

    const publishedTime = new Date(item.published_at).getTime();

    return (
      !Number.isNaN(publishedTime) &&
      nowTime - publishedTime < 24 * 60 * 60 * 1000
    );
  }).length;
  const today = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#edf8f5_48%,#f9fafb_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="border-b border-slate-200 pb-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black tracking-[0.18em] text-white shadow-lg shadow-slate-900/15">
                AI
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-slate-500">
                  Daily brief
                </p>
                <h1 className="mt-1 text-3xl font-black leading-none tracking-normal text-slate-950 sm:text-4xl">
                  AI Newsroom
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-600">
              <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-slate-200">
                {today}
              </span>
              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-white">
                {news.length} stories
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-800 ring-1 ring-emerald-200">
                {freshCount} fresh
              </span>
            </div>
          </div>

          <nav
            className="mt-6 flex flex-wrap gap-2"
            aria-label="News categories"
          >
            {(categories.length
              ? categories
              : ["Technology", "Business", "Science", "World"]
            ).map((category) => (
              <span
                key={category}
                className="whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-600"
              >
                {category}
              </span>
            ))}
          </nav>
        </header>

        {hero ? (
          <>
            <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
              <HeroCard item={hero} />

              <aside className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">
                    Editor picks
                  </h2>
                  <span className="text-xs font-bold text-slate-400">
                    {featured.length} updates
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {featured.length ? (
                    featured.map((item, index) => (
                      <SecondaryCard
                        key={item.id}
                        item={item}
                        index={index}
                      />
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-5 text-sm font-semibold text-slate-500">
                      New picks will appear as the feed updates.
                    </div>
                  )}
                </div>
              </aside>
            </section>

            <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                      Latest coverage
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-normal text-slate-950">
                      The rest of the feed
                    </h2>
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    {rest.length} stories
                  </span>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white/75 shadow-sm">
                  {rest.length ? (
                    rest.map((item, index) => (
                      <ListItem
                        key={item.id}
                        item={item}
                        index={index}
                      />
                    ))
                  ) : (
                    <div className="p-6 text-sm font-semibold text-slate-500">
                      All caught up. New stories will land here.
                    </div>
                  )}
                </div>
              </div>

              <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                <section className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-sm">
                  <h2 className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
                    Briefing stats
                  </h2>
                  <div className="mt-5 grid grid-cols-3 gap-4 border-y border-slate-200 py-4">
                    <div>
                      <p className="text-2xl font-black tabular-nums text-slate-950">
                        {news.length}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        Total
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-black tabular-nums text-emerald-700">
                        {countSentiment(news, "positive")}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        Positive
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-black tabular-nums text-red-700">
                        {countSentiment(news, "negative")}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        Negative
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {categories.length
                      ? `${categories.length} categories tracked across this briefing.`
                      : "Categories will appear as stories are classified."}
                  </p>
                </section>

                <section className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
                  <h2 className="text-sm font-black uppercase tracking-[0.22em] text-slate-300">
                    Tracked topics
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.length ? (
                      tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 ring-1 ring-white/10"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm font-semibold text-slate-400">
                        Tags will appear here.
                      </span>
                    )}
                  </div>
                </section>
              </aside>
            </section>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <section className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-400">
        No stories
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
        The newsroom is quiet right now.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
        New briefings will appear as soon as the feed publishes.
      </p>
    </section>
  );
}
