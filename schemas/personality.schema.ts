import { defineField, defineType } from "sanity";

export const personality = defineType({
  type: "document",
  name: "personality",
  title: "Personality",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Personality",
    }),
  ],
});
