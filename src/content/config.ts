import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");
const urlSchema = z.string().url();
const imageSchema = z.string().regex(/\.(jpg|jpeg|png|webp|svg)$/i, "Image must be a valid image file");
const slugSchema = z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional();

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    name: z.string(),
    locations: z.array(z.string()),
    startDate: dateSchema,
    endDate: dateSchema,
    qualification: z.string(),
    major: z.string().optional(),
    description: z.string().optional(),
    slug: slugSchema
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    focus: z.string().optional(),
    location: z.array(z.string()).optional(),
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
    industry: z.array(z.string()).optional(),
    people: z.array(reference("people")).optional(),
    logo: imageSchema.optional(),
    slug: slugSchema
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    url: urlSchema,
    image: imageSchema,
    description: z.string().optional(),
    slug: slugSchema
  }),
});


const achievements = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/achievements" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["Article", "Award", "Patent"]),
    author: z.string(),
    date: dateSchema,
    url: urlSchema.optional(),
    logo: imageSchema,
    slug: slugSchema
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    technology: z.array(z.string()),
    releaseDate: dateSchema,
    people: z.array(reference("people")).optional(),
    logo: imageSchema,
    url: urlSchema,
    slug: slugSchema
  }),
});

const mentorship = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/mentorship" }),
  schema: z.object({
    name: z.string(),
    price: z.string(),
    url: urlSchema,
    length: z.string(),
    logo: imageSchema,
  }),
});

const appendix = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/appendix" }),
  schema: z.object({
    title: z.string(),
    slug: slugSchema
  }),
});

// Sections collection with separate files for each type
const sections = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/sections" }),
  schema: z.array(z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),  
    date: z.string().optional(),
    type: z.string().optional(),
    logo: imageSchema.optional(),
    slug: z.string().optional(),
    url: urlSchema.optional(),
    urlText: z.string().optional(),
  }).refine((data) => !data.urlText || data.url, {
    message: "urlText can only be provided when url is present",
    path: ["urlText"],
  })),
});

export const collections = {
  education,
  experience,
  people,
  achievements,
  projects,
  mentorship,
  appendix,
  sections,
};