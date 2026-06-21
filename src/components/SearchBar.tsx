"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Sync external URL changes back to local state
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Handle debounced search routing
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (debouncedQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(debouncedQuery.trim())}&page=1`);
    } else if (debouncedQuery === "") {
      router.push(`/`);
    }
  }, [debouncedQuery, router]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative flex items-end">
        <span className="text-muted-foreground mr-4 font-bold">QUERY:</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="[ENTER MOVIE TITLE...]"
          className="w-full pb-2 bg-transparent border-b-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all font-mono uppercase tracking-widest"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-0 bottom-2 text-primary font-bold hover:text-primary/80 transition-colors uppercase"
          >
            [X]
          </button>
        )}
      </div>
    </div>
  );
}
