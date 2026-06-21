# AI Log

## Tools Used
- Google Gemini 3.1 Pro (High) model for AI pair programming
- `create-next-app` for Next.js 15 scaffolding
- Tailwind CSS (v4) for styling and layout
- Framer Motion for UI animations and modal transitions
- Lucide React for consistent icons
- TMDB API for fetching live movie data

## Best Prompts
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
- **Frontend Design Overhaul:** The AI initially generated a generic dark-mode template. I directed it to take a bold, justified aesthetic risk by implementing a brutalist "Hollywood Screenplay" design system, completely reshaping the typography, color palette, and micro-copy to match the subject matter's specific world.
