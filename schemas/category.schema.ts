import { defineField, defineType } from "sanity";

export const category = defineType({
  type: "document",
  name: "category",
  title: "Category",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Category",
    }),
  ],
});
