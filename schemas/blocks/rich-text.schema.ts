import { ObjectDefinition } from "sanity";

export const richtext: ObjectDefinition = {
  title: "Rich Text",
  name: "richtext",
  type: "object",
  fields: [
    {
      title: "Rich Text",
      name: "richtext",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
