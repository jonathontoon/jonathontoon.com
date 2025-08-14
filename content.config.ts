import { defineCollection, z, reference } from "astro:content";

const education = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    location: z.array(z.string()),
    startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    qualification: z.string(),
    major: z.string().optional()
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format").optional(),
    endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format").optional(),
    location: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    type: z.enum(["full-time", "part-time", "contract", "internship", "freelance", "volunteering", "sabbatical"]).optional(),
    roles: z.array(z.object({
      title: z.string(),
      startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
      endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format").optional(),
      location: z.array(z.string()).optional(),
      type: z.enum(["full-time", "part-time", "contract", "internship", "freelance", "volunteering", "sabbatical"]).optional(),
    })).optional(),
  }),
});


const contributors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    image: z.string(),
  }),
});

const stack = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    type: z.enum(["work", "education", "personal"]),
    tags: z.array(z.string()).optional(),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    location: z.array(z.string()).optional(),
    platform: z.array(z.enum(["web", "ios", "android", "other"])).optional(),
    stack: z.array(reference("stack")).optional(),
    contributors: z.array(reference("contributors")).optional(),
    outcome: z.array(z.string()).optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    repository: z.string().url().optional(),
    status: z.enum(["active", "completed", "archived", "on-hold"]).optional(),
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    publication: z.string(),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    url: z.string().url().optional(),
    type: z.enum(["article", "paper", "book", "blog-post", "whitepaper", "other"]),
  }),
});

const awards = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    description: z.string(),
    category: z.enum(["award", "honor", "recognition", "certification", "achievement"]),
  }),
});

const patents = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    number: z.string(),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    inventors: z.array(z.string()),
    work: reference('work'),
    description: z.string(),
    url: z.string().url().optional(),
  }),
});

export const collections = {
  education,
  work,
  contributors,
  stack,
  projects,
  publications,
  awards,
  patents,
};