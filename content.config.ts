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
    slug: slugSchema
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
    title: z.string(),
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

// Base schema object for section items (without URL fields)
const baseSectionFields = {
  title: z.string(),
  logo: imageSchema.optional(),
  slug: z.string().optional(),
};

// Base schema object with URL fields
const baseSectionWithUrlFields = {
  ...baseSectionFields,
  url: urlSchema.optional(),
  urlText: z.string().optional(),
};

// Helper function to create section schema with URL validation
const createSectionSchema = (additionalFields: Record<string, any>) => {
  return z.object({
    ...baseSectionWithUrlFields,
    ...additionalFields,
  }).refine((data) => !data.urlText || data.url, {
    message: "urlText can only be provided when url is present",
    path: ["urlText"],
  });
};

const experienceSectionSchema = z.array(createSectionSchema({
  focus: z.string(),
  startDate: dateSchema,
  endDate: dateSchema.optional(),
}));

const projectsSectionSchema = z.array(createSectionSchema({
  technology: z.array(z.string()),
  releaseDate: dateSchema,
  logo: imageSchema, // Override to make required
}));

const mentorshipSectionSchema = z.array(createSectionSchema({
  price: z.string(),
  length: z.string(),
  logo: imageSchema, // Override to make required
}));

const achievementsSectionSchema = z.array(createSectionSchema({
  type: z.enum(["Article", "Award", "Patent"]),
  author: z.string(),
  date: dateSchema,
  logo: imageSchema, // Override to make required
}));

const educationSectionSchema = z.array(createSectionSchema({
  qualification: z.string(),
  startDate: dateSchema,
  endDate: dateSchema,
}));

const appendixSectionSchema = z.array(z.object(baseSectionFields));

// Individual section collections
const sections = defineCollection({
  type: "data",
  schema: z.union([
    experienceSectionSchema,
    projectsSectionSchema,
    mentorshipSectionSchema,
    achievementsSectionSchema,
    educationSectionSchema,
    appendixSectionSchema,
  ]),
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

export {
  experienceSectionSchema,
  projectsSectionSchema,
  mentorshipSectionSchema,
  achievementsSectionSchema,
  educationSectionSchema,
  appendixSectionSchema,
};