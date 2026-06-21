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
      <section className="flex flex-col items-center text-center space-y-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Find Your Next <span className="text-primary">Favorite Movie</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore trending titles, search for classics, and save your top picks.
        </p>
      </section>

      <section className="w-full">
        <SearchBar />
      </section>

      <section className="mt-4">
        <Suspense key={`${query}-${page}`} fallback={<LoadingSpinner />}>
          <MovieList page={page > 0 ? page : 1} query={query} />
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
