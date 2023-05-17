import { BlockElementIcon, ControlsIcon, SearchIcon } from "@sanity/icons";
import { DocumentDefinition } from "sanity";

export const posts: DocumentDefinition = {
  name: "posts",
  title: "Posts",
  type: "document",
  fieldsets: [
    {
      name: "robots",
      title: "Robots",
      //@ts-ignore
      group: "seo",
    },
  ],
  groups: [
    { name: "all-fields", hidden: true },
    {
      name: "config",
      title: "Configuration",
      icon: ControlsIcon,
      default: true,
    },
    {
      name: "content",
      title: "Content",
      icon: BlockElementIcon,
    },
    {
      name: "seo",
      title: "SEO",
      icon: SearchIcon,
    },
  ],
  fields: [
    {
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title.en",
      },
      validation: (Rule) => Rule.required(),
      group: "config",
    },
    {
      title: "Headline",
      name: "title",
      type: "localeString",
      group: "config",
    },
    {
      name: "content",
      type: "array",
      title: "Post",
      of: [{ type: "hero" }, { type: "richtext" }, { type: "gallery" }],
      group: "content",
    },
    {
      name: "meta_title",
      type: "string",
      title: "SEO Title",
      group: "seo",
    },
    {
      name: "meta_description",
      type: "text",
      title: "SEO Description",
      group: "seo",
    },
    {
      name: "noindex",
      type: "boolean",
      title: "No Index?",
      description: "Prevents crawlers from indexing this post.",
      fieldset: "robots",
      group: "seo",
      initialValue: false,
    },
    {
      name: "nofollow",
      type: "boolean",
      title: "No Follow?",
      description:
        "Prevents crawlers from following links present in this post.",
      fieldset: "robots",
      group: "seo",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
};
