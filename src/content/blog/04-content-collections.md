---
title: "Content Collections in Astro"
description: "Learn how Astro's content collections work and how they compare to Next.js MDX handling."
pubDate: 2026-03-04
author: "Astro Tutorial"
tags: ["astro", "content", "collections", "mdx"]
nextJsEquivalent: "Next.js MDX with gray-matter or contentlayer"
---

## Content Collections

Content collections are Astro's built-in way to manage Markdown, MDX, JSON, and YAML content.

### How It Works

1. Define collections in `src/content/config.ts`
2. Add content files to `src/content/<collection-name>/`
3. Use `getCollection()` to query content in your pages

### Collection Schema

You can define a schema with Zod validation:

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
  }),
});
```

### Querying Content

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---
```

### Advantages Over Next.js MDX

- No need for gray-matter or frontmatter parsers
- Built-in type safety with Zod schemas
- Automatic TypeScript support
- Simplified file-based routing integration
- Direct rendering in `.astro` templates

### Comparison with Next.js

In Next.js, you typically use:
- `@next/mdx` with gray-matter
- Contentlayer (now deprecated in favor of MDX)
- File system reading in `getStaticPaths`

Astro's approach is more streamlined and requires less boilerplate.
