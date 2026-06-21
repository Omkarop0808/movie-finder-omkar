import { Suspense } from "react";
import { getMovies } from "@/lib/tmdb";
import { MovieGrid } from "@/components/MovieGrid";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner, ErrorMessage } from "@/components/States";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? parseInt(resolvedSearchParams.page) : 1;
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col items-center text-center space-y-6 py-12 md:py-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Find Your Next <br className="hidden md:block" />
          <span className="text-primary italic">Favorite Movie</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light">
          Explore trending titles, search for classics, and save your top picks.
        </p>
      </section>

      <section className="w-full">
        <SearchBar />
      </section>

      <section className="mt-4">
        <Suspense key={`${query}-${page}`} fallback={<LoadingSpinner />}>
          {/* Movie Grid Section */}
          <section className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {query ? `Search Results for "${query}"` : "Trending Movies"}
              </h2>
              {!query && (
                <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  Updated Daily
                </div>
              )}
            </div>
            <MovieList page={page > 0 ? page : 1} query={query} />
          </section>
        </Suspense>
      </section>
    </div>
  );
}

async function MovieList({ page, query }: { page: number; query: string }) {
  try {
    const data = await getMovies(page, query);
    return (
      <>
        <MovieGrid movies={data.results} />
        <Pagination currentPage={page} totalPages={data.total_pages} query={query} />
      </>
    );
  } catch (error) {
    return <ErrorMessage message="Failed to fetch movies from TMDB. Please check your API key and connection." />;
  }
}
