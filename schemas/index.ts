import { richtext } from "./blocks/rich-text.schema";
import { gallery } from "./blocks/gallery.schema";
import { hero } from "./blocks/hero.schema";
import { cats, localeString } from "./cat.schema";
import { category } from "./category.schema";
import { personality } from "./personality.schema";
import { posts } from "./posts.schema";

export const schemaTypes = [
  cats,
  category,
  personality,
  posts,
  hero,
  richtext,
  gallery,
  localeString,
];
