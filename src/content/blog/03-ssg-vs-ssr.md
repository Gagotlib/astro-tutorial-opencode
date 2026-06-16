---
title: "SSG vs SSR in Astro"
description: "Understanding static generation and server-side rendering in Astro, and how they compare to Next.js."
pubDate: 2026-03-03
author: "Astro Tutorial"
tags: ["astro", "ssg", "ssr", "rendering"]
nextJsEquivalent: "Next.js SSR and SSG"
---

## Rendering Modes in Astro

### Static Site Generation (SSG) - Default

Astro generates all pages at build time as static HTML files. This is the default and recommended mode.

**Advantages:**
- Fastest possible page loads
- Can be deployed to any static host (CDN)
- No server costs
- Best SEO

**Disadvantages:**
- Content is static until next build
- Dynamic features require client-side JS or API calls

### Server-Side Rendering (SSR)

Astro can render pages on the server per request when you enable `output: 'server'` or `output: 'hybrid'`.

**Advantages:**
- Dynamic content on every request
- Server-side authentication
- API endpoints
- Form handling

**Disadvantages:**
- Requires a server/edge runtime
- Slower than static pages
- Higher hosting costs

### Hybrid Mode (Recommended)

In `astro.config.mjs`, set `output: 'hybrid'`. Pages with `export const prerender = false` are SSR, others are SSG.

```astro
--- 
// This page is pre-rendered at build time (default for hybrid)
---
```

```astro
---
// This page renders per request
export const prerender = false;
---
```

### Comparison with Next.js

In Next.js App Router:
- Static by default for `generateStaticParams`
- Dynamic by default unless explicitly opted out
- Uses `force-static` or `revalidate` for caching

In Astro:
- Static by default
- SSR opt-in with `prerender = false`
- Simmental than Next.js caching model
