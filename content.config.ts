import { defineCollection, z, reference } from "astro:content";

// Shared validation schemas
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
    colleagues: z.array(reference("colleagues")).optional(),
  }),
});

const colleagues = defineCollection({
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
    type: z.enum(["article", "award", "patent"]),
    author: z.string(),
    date: dateSchema,
    url: urlSchema.optional(),
    slug: slugSchema
  }),
});

export const collections = {
  education,
  experience,
  colleagues,
  achievements,
};