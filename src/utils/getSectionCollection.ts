import { getCollection } from "astro:content";

export const getSectionCollection = async (sectionId: string) => {
  const collection = await getCollection(
    "sections",
    ({ id }) => id === sectionId
  );
  return collection[0]?.data || [];
};
