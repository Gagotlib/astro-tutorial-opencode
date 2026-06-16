# Astro Tutorial for Next.js Developers

A complete educational project designed to help React and Next.js developers understand Astro from scratch through practical examples and comparisons.

## What is Astro?

Astro is a modern web framework for content-focused websites. Unlike Next.js (which ships JavaScript for the entire page), Astro ships **zero JavaScript by default** and only hydrates interactive components when needed.

**The core idea:** Your page is mostly static HTML. Interactive "islands" of React (or Vue, Svelte, etc.) are loaded only where needed.

## What Problems Does Astro Solve?

| Problem | Astro's Solution |
|---------|-----------------|
| Too much JavaScript shipped to the client | Zero JS by default, only load what's interactive |
| Slow time-to-interactive | Only hydrate components that need it |
| Complex build setups | Built-in support for Markdown, content collections, image optimization |
| Framework lock-in | Use React, Vue, Svelte, or all of them on the same page |
| Performance vs. developer experience | You get both — full DX with optimal performance |

## Islands Architecture Explained Simply

In a traditional React app (including Next.js), every component in the tree is hydrated on the client. Even purely presentational components ship JavaScript.

In Astro, your page is rendered as static HTML. Interactive components become **islands**:

```
Traditional Next.js SPA:
┌──────────────────────────────────┐
│  Entire Page Hydrated (all JS)   │
│  [Header] [Content] [Sidebar]    │
│    All components send JS to     │
│    the browser for hydration      │
└──────────────────────────────────┘

Astro Islands Architecture:
┌──────────────────────────────────┐
│  Static HTML Streamed (no JS)    │
│  [Header] [Content] [Sidebar]    │
│            │                     │
│     ┌──────┘──────┐              │
│     ▼             ▼              │
│  [Counter]    [Search Bar]       │
│  (Island)     (Island)           │
│  Only these components ship JS  │
└──────────────────────────────────┘
```

### Client Directives

| Directive | When JS Loads | Use Case |
|-----------|---------------|----------|
| `client:load` | Immediately on load | Critical UI (navigation, header) |
| `client:idle` | When browser is idle | Non-critical UI |
| `client:visible` | When element is visible | Below-the-fold content |
| `client:media` | When media query matches | Responsive components |
| `client:only` | Client-only, skip SSR | Browser-only components |

## SSG vs SSR in Astro

### Static Site Generation (SSG) — Default

- Pages are rendered at build time to static HTML files
- Can be deployed to any static host (CDN, Netlify, Vercel)
- Zero server cost
- Fastest possible page loads

### Server-Side Rendering (SSR)

- Pages are rendered per request
- Requires a Node.js server or edge runtime
- Enables sessions, authentication, API endpoints
- Set `output: "server"` in `astro.config.mjs`

### Hybrid Approach

In this project, content pages (blog, home, performance) are pre-rendered at build time with `export const prerender = true`, while the dashboard and API endpoints run on the server per request.

## When Astro is Better than Next.js

- **Content-heavy websites** — blogs, documentation, marketing sites, portfolios
- **Performance-critical pages** — when every KB of JavaScript matters
- **E-commerce product pages** — mostly static with small interactive elements
- **Multi-framework projects** — use React for one component, Vue for another
- **Static-first approach** — when most of your page doesn't need JS

## When Next.js is Better than Astro

- **Full-featured web applications** — dashboards, social media, SaaS platforms
- **Heavy client-side interactivity** — complex state management throughout the page
- **Extensive API routes** — when you need many server endpoints
- **App Router features** — layouts, loading states, error boundaries, parallel routes
- **Rich React ecosystem** — when you need the full React ecosystem

## How React Components Work Inside Astro

React components in Astro are compiled to static HTML at build time. They only become interactive when you add a `client:*` directive:

```astro
---
// src/pages/index.astro
// This runs at build time (or server-side)
import MyReactComponent from "../components/MyReactComponent";
---

<!-- Static HTML — zero JavaScript -->
<MyReactComponent />

<!-- Interactive island — React hydrates this component -->
<MyReactComponent client:load />
```

### Important Notes

- React components can receive props from Astro at build time
- Props are serialized as JSON in the HTML
- The React runtime is shared across all islands (only loaded once)
- You can't use React hooks inside `.astro` files (only in `.tsx`/`.jsx` files)
- `.astro` components are purely template/view — no client-side state

## Project Structure

```
astro-tutorial-opencode/
├── src/
│   ├── components/
│   │   └── react/           # Interactive React islands
│   │       ├── Counter.tsx
│   │       ├── TodoList.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── LoginForm.tsx
│   │       ├── HydrationVisualizer.tsx
│   │       └── StaticComparison.tsx
│   ├── content/
│   │   ├── config.ts         # Content collection schemas
│   │   └── blog/             # Markdown blog posts
│   │       ├── 01-astro-vs-nextjs.md
│   │       ├── 02-islands-architecture.md
│   │       ├── 03-ssg-vs-ssr.md
│   │       └── 04-content-collections.md
│   ├── layouts/
│   │   ├── BaseLayout.astro  # Main layout with nav/footer
│   │   └── BlogLayout.astro  # Blog post layout
│   ├── lib/
│   │   └── auth.ts           # Simple session auth
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── dashboard.astro   # Interactive dashboard
│   │   ├── performance.astro # Performance demo
│   │   ├── login.astro       # Auth demo
│   │   ├── api-examples.astro# API documentation
│   │   ├── api/              # API endpoints
│   │   │   ├── hello.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── session.ts
│   │   └── blog/             # Blog pages
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── public/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Pages Overview

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home page with blog links, interactive islands, performance comparison |
| `/blog` | Static | Blog index listing all posts |
| `/blog/[slug]` | Static | Individual blog posts from Markdown |
| `/dashboard` | Dynamic | Interactive dashboard with multiple React islands |
| `/performance` | Static | Performance comparison of different rendering strategies |
| `/login` | Dynamic | Demo authentication page |
| `/api-examples` | Static | API endpoint documentation with code comparisons |
| `/api/hello` | Dynamic | Simple JSON greeting endpoint |
| `/api/login` | Dynamic | POST endpoint for authentication |
| `/api/logout` | Dynamic | Clears session cookie |
| `/api/session` | Dynamic | Returns current session status |

## Best Practices

1. **Default to static** — Only use SSR when you need dynamic data or authentication
2. **Use islands sparingly** — Not every component needs to be interactive
3. **Choose the right client directive** — Use `client:visible` for below-the-fold content
4. **Share the React runtime** — Multiple islands share one React instance
5. **Keep islands small** — Each island should be a focused interactive element
6. **Use content collections** — Type-safe Markdown with Zod validation
7. **Leverage hybrid output** — Mix static and server-rendered pages

## Common Mistakes

1. **Making everything an island** — If a component doesn't need interactivity, keep it as a static Astro component
2. **Forgetting `prerender = false`** — API endpoints must opt out of static generation
3. **Using React hooks in `.astro` files** — Hooks only work in `.tsx`/`.jsx` components
4. **Overusing `client:load`** — Use `client:idle` or `client:visible` when possible
5. **Assuming all pages are SSR** — Astro is static by default; SSR must be explicitly enabled

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Astro 5** — Web framework
- **TypeScript** — Type safety
- **TailwindCSS** — Styling
- **React 18** — Interactive islands
- **@astrojs/node** — SSR adapter
