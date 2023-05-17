import { DocumentDefinition, defineField, defineType } from "sanity";

const supportedLanguages = [
  { id: "en", title: "[en-US] English (United States)", isDefault: true },
  { id: "no", title: "[nb-NO] Norwegian" },
  { id: "fr", title: "[fr-FR] French" },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export const localeString = {
  title: "Localized string",
  name: "localeString",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "string",
    fieldset: lang.isDefault ? null : "translations",
  })),
};

export const cats: DocumentDefinition = {
  type: "document",
  name: "cats",
  title: "Cats",
  fieldsets: [{ name: "attributes", title: "Attributes" }],
  fields: [
    {
      type: "localeString",
      name: "name",
      title: "Name",
    },
    {
      type: "image",
      name: "image",
      title: "Image",
    },
    {
      type: "text",
      name: "description",
      title: "Description",
      initialValue: "I am cat!",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "reference",
      name: "category",
      title: "Category",
      to: [{ type: "category" }],
      fieldset: "attributes",
    },
    {
      type: "reference",
      name: "personality",
      title: "Personality",
      to: [{ type: "personality" }],
      fieldset: "attributes",
    },
    {
      type: "boolean",
      name: "isFoil",
      title: "Is Foil?",
      description: 'Whether or not the card is a "foil" edition.',
      fieldset: "attributes",
    },
  ],
  preview: {
    select: {
      name: "name.en",
      image: "image",
    },
    prepare({ name, image }) {
      return {
        title: name,
        media: image,
      };
    },
  },
};
