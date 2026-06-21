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
      <section className="flex flex-col items-start space-y-4 py-8 md:py-12 border-b-2 border-border mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase underline decoration-2 underline-offset-4">
          EXT. MOVIE FINDER - CONTINUOUS
        </h2>
        <p className="text-base text-foreground max-w-3xl leading-relaxed">
          A vast database of motion pictures waits to be discovered. 
          The USER explores trending titles, searches for classics, and saves their top picks.
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
