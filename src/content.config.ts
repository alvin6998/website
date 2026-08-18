import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    status: z.enum(['開發中', '完成']),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    updatedAt: z.date(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'networking',
      'cloudflare',
      'dns',
      'linux',
      'sdr',
      'weather',
      'ai',
    ]),
    updatedAt: z.date(),
  }),
});

const opensource = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opensource' }),
  schema: z.object({
    name: z.string(),
    author: z.string(),
    github: z.string().url(),
    website: z.string().url().optional(),
    license: z.string(),
    language: z.array(z.string()).optional(),
    category: z.string().optional(),
    reason: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.date(),
  }),
});

export const collections = { projects, notes, opensource, about };
