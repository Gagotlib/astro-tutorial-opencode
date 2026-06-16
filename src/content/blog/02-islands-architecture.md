---
title: "Islands Architecture Explained"
description: "Understanding Astro's islands architecture and how it compares to React's hydration model."
pubDate: 2026-03-02
author: "Astro Tutorial"
tags: ["astro", "islands", "hydration", "performance"]
nextJsEquivalent: "React hydration in Next.js"
---

## What are Islands?

Islands architecture is a pattern where interactive UI components are treated as isolated "islands" in a sea of static HTML. This is the opposite of the traditional SPA approach where the entire page is hydrated.

### How Next.js Handles Hydration

In Next.js (pages router), the entire React component tree is hydrated on the client. This means:

- All components are sent as JavaScript
- The entire page needs to hydrate before any interaction works
- Bundle size grows with every component, even static ones

### How Astro Handles Hydration

Astro only sends JavaScript for components that explicitly request it:

```astro
<!-- This component is completely static - zero JS shipped -->
<StaticHeader />

<!-- This component becomes an interactive island -->
<InteractiveCounter client:load />
```

### Client Directives

| Directive | When JS Loads |
|-----------|---------------|
| `client:load` | Immediately on page load |
| `client:idle` | When browser is idle |
| `client:visible` | When element scrolls into viewport |
| `client:media` | When media query matches |
| `client:only` | Only on client (skip SSR) |

### Performance Benefits

- Smaller bundle sizes (often 90%+ smaller than equivalent React apps)
- Faster time to interactive
- Better Core Web Vitals scores
- Lower data consumption for users
