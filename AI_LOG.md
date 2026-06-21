# AI Log

## Tools Used
- Google Gemini 3.1 Pro (High) model for AI pair programming
- `create-next-app` for Next.js 15 scaffolding
- Tailwind CSS (v4) for styling and layout
- Framer Motion for UI animations and modal transitions
- Lucide React for consistent icons
- TMDB API for fetching live movie data

## Best Prompts
-**Prompt:**Build a Movie Discovery App in Next.js using the TMDB API. Read every requirement below carefully and follow it exactly — do not deviate or simplify.

CORE FEATURES:
Browse page showing a responsive grid of movies. Each movie card shows poster image, title, release year, and rating (out of 10, from TMDB vote_average).

Search bar that lets users search movies by title. Results update as the user types with debounced input (300ms delay so it does not fire on every keystroke).

Clicking any movie card opens a detail view (modal or separate page — modal is fine) showing the full overview, poster, release date, rating, genres, and runtime if available from the TMDB API.

Favorites system: a heart or star icon on each movie card and on the detail view to add/remove from favorites. Favorites must persist after a page reload using localStorage. Add a dedicated /favorites page or section showing all saved favorites.

Loading state: show a spinner or skeleton loader while data is being fetched from TMDB.
Error state: if the API call fails, show a clear message like "Something went wrong. Please try again."
Empty state: if a search returns no results, show a clear message like "No movies found for this search."

HARD REQUIREMENTS — these are non-negotiable, follow exactly:

R1 — Pagination: The browse grid must use manual Next and Previous buttons for pagination. Do NOT implement infinite scroll or auto-loading. Show exactly 12 results per page, no more, no less. Use TMDB's page parameter and slice or request to get exactly 12 items per page.

R2 — The footer on the homepage must contain this exact text and nothing substituted: "Built for Jeevan — [YOUR_NAME]"
(Replace [YOUR_NAME] with my actual name before generating — ask me for it if not already provided.)

R3 — Repository setup: this project will be pushed to a GitHub repo named movie-finder-[firstname] in all lowercase. Structure the project cleanly so it is ready to push as-is.

TECH STACK:
Next.js (App Router), fetch TMDB API using environment variable NEXT_PUBLIC_TMDB_API_KEY (or server-side TMDB_API_KEY using a Next.js API route if you want to hide the key — your choice, but be consistent). Use Tailwind CSS for styling. Keep components clean and organized: separate components for MovieCard, MovieGrid, SearchBar, Pagination, MovieDetailModal, FavoritesButton, LoadingSpinner, ErrorMessage, EmptyState.

DESIGN:
Clean, modern, responsive UI. Dark or light theme, your call, but make it look intentional and professional, not default Bootstrap-looking. Mobile responsive grid (1 column mobile, 2-3 tablet, 4+ desktop). Smooth hover states on movie cards. Smooth modal open/close transition.

README REQUIREMENTS:
Generate a README.md that explains: what the app does, which public API was used (state TMDB clearly, or note if a different API was substituted), how to get an API key, how to set up the .env file, and exact commands to run the app locally (npm install, npm run dev).

DO NOT:
Do not use infinite scroll. Do not skip loading/error/empty states. Do not hardcode the footer name as a placeholder — use my real name. Do not over-engineer with a backend or database — this is frontend + public API only, exactly as specified.

After building, give me a short summary of: any TMDB API quirks you handled, any decision you made where the brief was ambiguous and why, and one thing you'd flag for me to double check before I submit.
- **Prompt:** "Build a Next.js TMDB utility that precisely paginates 12 items per page by mapping the app's 12-item chunks onto TMDB's native 20-item chunks without dropping any results."
  - *Why it worked:* This specific prompt forced the AI to solve the mathematical offset problem rather than simply slicing the first 12 results of a page and discarding the rest. This perfectly fulfills the strict pagination requirement.
- **Prompt:** "Implement a modern, premium dark theme for the movie app using CSS variables in globals.css for Tailwind v4."
  - *Why it worked:* Tailwind v4 shifted away from `tailwind.config.ts`, so explicitly mentioning CSS variables in `globals.css` guided the AI to create the correct styling architecture.
- **Prompt:** "Create a useFavorites custom hook that syncs to localStorage and cleanly handles Next.js hydration mismatches."
  - *Why it worked:* Reminding the AI about Next.js hydration issues ensured the `isLoaded` state was implemented, preventing errors when rendering heart icons.

## What I Fixed Manually
- **Pagination slicing logic edge cases:** The AI initially calculated TMDB page offsets but missed that a 12-item slice could span *across* two different TMDB pages (e.g., items 12 to 24). I manually guided the AI to fetch both TMDB pages when `tmdbPage1 !== tmdbPage2`, concatenate their results, and then perform the slice.
- **Next.js Image VPN Routing (unoptimized: true):** The AI initially used `next/image` to render TMDB posters. While the `remotePatterns` config was correct, Next.js tries to download and optimize the image on the *local Node server*. Since my local server is blocked from TMDB by my ISP (and doesn't use the browser's VPN), the images failed to load. I manually added `unoptimized: true` to `next.config.ts` to bypass local server optimization and pass the raw TMDB URLs directly to the browser, which successfully routes through the VPN.
- **Debounce Implementation for Search:** The AI used a basic `setTimeout` inside the component body for search delay. I manually refactored this into a robust `useDebounce` custom hook to prevent memory leaks, handle React lifecycles correctly, and ensure production-ready search behavior.
- **Frontend Design & Theme Toggle Fix:** The AI initially generated a CSS layout that hardcoded dark mode colors without properly utilizing the `.dark` class pattern required by `next-themes` and Tailwind v4. I manually overhauled `globals.css` to properly separate the `:root` (light) and `.dark` palettes and restored the Next.js `Geist` font integration so the theme toggle works flawlessly across the entire app.
