export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
}

export interface PaginatedMovies {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string, page: number = 1): Promise<{ results: Movie[], total_results: number }> {
  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  
  if (!apiKey) {
    throw new Error('TMDB_API_KEY is not defined in environment variables');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('page', page.toString());
  
  // Use either Bearer token or api_key param
  const headers: Record<string, string> = {
    accept: 'application/json',
  };
  
  // Usually, newer TMDB tokens are Bearer tokens. If it's a long token, it's Bearer. If short, it's api_key.
  // We'll support both by passing api_key if it doesn't look like a JWT, otherwise Bearer.
  if (apiKey.length > 40) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else {
    url.searchParams.append('api_key', apiKey);
  }

  const res = await fetch(url.toString(), { headers, next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetches movies from TMDB and slices exactly 12 items per page.
 * Maps 12-item app pages to 20-item TMDB pages.
 */
export async function getMovies(page: number, query: string = ''): Promise<PaginatedMovies> {
  const APP_PAGE_SIZE = 12;
  const TMDB_PAGE_SIZE = 20;

  const startIdx = (page - 1) * APP_PAGE_SIZE;
  const endIdx = page * APP_PAGE_SIZE;

  const tmdbPage1 = Math.floor(startIdx / TMDB_PAGE_SIZE) + 1;
  const tmdbPage2 = Math.floor((endIdx - 1) / TMDB_PAGE_SIZE) + 1;

  const endpoint = query 
    ? `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
    : `/movie/popular?language=en-US`;

  try {
    let allResults: Movie[] = [];
    let totalResults = 0;

    // Fetch first required TMDB page
    const data1 = await fetchFromTMDB(endpoint, tmdbPage1);
    allResults = [...data1.results];
    totalResults = data1.total_results;

    // If our 12 items span across two TMDB pages, fetch the second one too
    if (tmdbPage1 !== tmdbPage2) {
      // Only fetch if there's actually a second page available
      if (data1.results.length === TMDB_PAGE_SIZE) {
        const data2 = await fetchFromTMDB(endpoint, tmdbPage2);
        allResults = [...allResults, ...data2.results];
      }
    }

    // Calculate slice indices relative to the fetched chunk
    const sliceStart = startIdx % TMDB_PAGE_SIZE;
    const sliceEnd = sliceStart + APP_PAGE_SIZE;

    const finalResults = allResults.slice(sliceStart, sliceEnd);
    
    // Total pages in our app's math
    const totalAppPages = Math.ceil(totalResults / APP_PAGE_SIZE);

    return {
      results: finalResults,
      total_results: totalResults,
      total_pages: totalAppPages,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function getMovieDetails(id: string): Promise<Movie> {
  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) throw new Error('TMDB API Key missing');

  const url = new URL(`${TMDB_BASE_URL}/movie/${id}?language=en-US`);
  const headers: Record<string, string> = { accept: 'application/json' };
  
  if (apiKey.length > 40) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else {
    url.searchParams.append('api_key', apiKey);
  }

  const res = await fetch(url.toString(), { headers, next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch movie details`);
  }

  return res.json();
}
