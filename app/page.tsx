import { supabase } from "@/lib/supabase";

import HeroCard from "@/app/components/HeroCard";
import SecondaryCard from "@/app/components/SecondaryCard";
import ListItem from "@/app/components/ListItem";

export const dynamic = "force-dynamic";

async function getNews() {
  const { data } = await supabase
    .from("news")
    .select("*")
    .order("published_at", {
      ascending: false,
    });

  return data || [];
}

export default async function HomePage() {
  const news = await getNews();

  const hero = news[0];

  const featured = news.slice(1, 5);

  const rest = news.slice(5);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {hero && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <HeroCard item={hero} />

              <div className="grid gap-4">
                {featured.map(
                  (item: any, i: number) => (
                    <SecondaryCard
                      key={item.id}
                      item={item}
                      index={i}
                    />
                  )
                )}
              </div>
            </div>
          </section>
        )}

        <section className="max-w-3xl">
          {rest.map(
            (item: any, i: number) => (
              <ListItem
                key={item.id}
                item={item}
                index={i}
              />
            )
          )}
        </section>
      </div>
    </main>
  );
}