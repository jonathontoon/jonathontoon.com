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

const companies = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: urlSchema.optional(),
    locations: z.array(z.string()).optional(),
    state: z.enum(["active", "closed", "sold", "acquired"]),
    colleagues: z.array(reference("colleagues")).optional(),
    description: z.string().optional(),
    founded: dateSchema.optional(),
    slug: slugSchema
  }),
});

const role = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    company: reference("companies").optional(),
    startDate: dateSchema,
    endDate: dateSchema.optional(),
    locations: z.array(z.string()).optional(),
    type: z.enum(["full-time", "part-time", "contract", "internship", "freelance", "volunteering", "sabbatical"]),
    colleagues: z.array(reference("colleagues")).optional(),
    projects: z.array(reference("projects")).optional(),
    description: z.string().optional(),
    slug: slugSchema
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

const stack = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: urlSchema
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z.enum(["work", "education", "personal"]),
    context: z.union([
      reference("companies"),
      reference("education")
    ]).optional(),
    role: reference("role").optional(),
    tags: z.array(z.string()).optional(),
    date: dateSchema,
    platforms: z.array(z.enum(["web", "ios", "android", "desktop", "other"])).optional(),
    stack: z.array(reference("stack")).optional(),
    outcomes: z.array(z.string()).optional(),
    references: z.array(urlSchema).optional(),
    slug: slugSchema
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    publication: z.string(),
    date: dateSchema,
    url: urlSchema.optional(),
    type: z.enum(["article", "paper", "book", "blog-post", "whitepaper", "conference", "other"]),
    description: z.string().optional(),
    slug: slugSchema
  }),
});

const awards = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    organization: z.union([
      reference("companies"),
      reference("education")
    ]),
    date: dateSchema,
    category: z.enum(["award", "honor", "recognition", "certification", "achievement"]),
    slug: slugSchema
  }),
});

const patents = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    number: z.string(),
    date: dateSchema,
    inventors: z.array(z.string()),
    role: reference('role'),
    description: z.string(),
    url: urlSchema.optional(),
    slug: slugSchema
  }),
});

export const collections = {
  education,
  companies,
  role,
  colleagues,
  stack,
  projects,
  publications,
  awards,
  patents,
};