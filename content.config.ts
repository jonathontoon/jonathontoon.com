import { defineCollection, z, reference } from 'astro:content';

const education = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    name: z.string(),
    location: z.array(z.string()).optional(),
    website: z.string().url().optional(),
    roles: z.array(z.object({
      title: z.string(),
      startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
      endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format").optional(),
      location: z.array(z.string()),
      type: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']).optional(),
    })).optional(),
  }),
});


const contributors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    image: z.string(),
  }),
});

const stack = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tags: z.array(z.string()),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
    location: z.array(z.string()),
    platform: z.array(z.enum(['web', 'ios', 'android', 'other'])).optional(),
    stack: z.array(reference('stack')),
    contributors: z.array(reference('contributors')),
    outcome: z.array(z.string()),
  }),
});

export const collections = {
  education,
  work,
  contributors,
  stack,
  projects,
};