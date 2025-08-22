import { defineCollection, z, reference } from "astro:content";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");
const urlSchema = z.string().url();
const imageSchema = z.string().regex(/\.(jpg|jpeg|png|webp|svg)$/i, "Image must be a valid image file");
const slugSchema = z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional();

const education = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    title: z.string(),
    focus: z.string(),
    location: z.array(z.string()),
    startDate: dateSchema,
    endDate: dateSchema.optional(),
    people: z.array(reference("people")).optional(),
    logo: imageSchema.optional(),
  }),
});

const people = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: urlSchema,
    image: imageSchema,
    description: z.string().optional(),
    slug: slugSchema
  }),
});


const achievements = defineCollection({
  type: "content",
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
  type: "content",
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
  type: "content",
  schema: z.object({
    name: z.string(),
    price: z.string(),
    url: urlSchema,
    length: z.string(),
    logo: imageSchema,
  }),
});

const appendix = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: slugSchema
  }),
});

export const collections = {
  education,
  experience,
  people,
  achievements,
  projects,
  mentorship,
  appendix,
};