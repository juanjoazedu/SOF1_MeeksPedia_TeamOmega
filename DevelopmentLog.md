# Development Log - MeeksPedia

In this document, each team member registers the activities completed on the same day they work, detailing the difficulties encountered, solutions applied, and associated commits.

---

| Date | Team Member | Requirement | Activities Completed | Blockers / Difficulties Encountered | Resolution Applied | Associated Commits |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-09-16 | Samuel Arias | RF-01 | Defined TypeScript interfaces for characters and API responses, and created modular service functions in `apiClient.ts`. | Received TS1484 error due to `verbatimModuleSyntax` rule in Vite/TypeScript. | Updated interface imports to explicit `import type` syntax. | `feat(api):` defined character types and created apiClient base service |
| 2026-09-16 | Samuel Arias | RF-01 | Refactored service functions into `getAllCharacters` and added `AbortSignal` support. | Understanding how `AbortSignal` links `fetch` with `useEffect` cleanup to cancel pending requests. | Added optional `signal?: AbortSignal` parameter to fetch calls and integrated `AbortController` in component lifecycle. | `refactor(api):` split fetch logic and added AbortSignal support |
| 2026-09-16 | Samuel Arias | RF-01 | Built `CharacterCard.tsx` to render item properties and `ListCharacters.tsx` to consume and render the character list. | Ensuring RF-01 implementation stayed strictly within scope without prematurely adding RF-02 UI states. | Simplified `ListCharacters` logic to focus solely on fetching, canceling, and mapping items. | `feat(ui):` implemented ListCharacters and CharacterCard components for RF-01 |
| 2026-09-17 | Samuel Arias | RF-03 | Implemented controlled search input with manual 400ms debounce using setTimeout inside useEffect and request cancellation. | API returns a 404 HTTP status code when no characters match the search query, throwing an unhandled fetch error. | Handled 404 status directly in getCharactersByName to return an empty results array gracefully. | `feat(ui):` implement RF-03 search filter with 400ms manual debounce |

---
