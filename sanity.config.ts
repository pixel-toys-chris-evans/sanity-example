import { defineConfig, buildLegacyTheme } from "sanity";
import { deskTool } from "sanity/desk";
import { scheduledPublishing } from "@sanity/scheduled-publishing";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import {
  IdStructure,
  ReferenceBehavior,
  documentI18n,
} from "@sanity/document-internationalization";
import { LaunchIcon, RobotIcon } from "@sanity/icons";

import { schemaTypes } from "./schemas";
import { previewDocumentNode } from "./components/preview-document.component";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;

import { Fredoka } from "next/font/google";
import { Logo } from "./app/studio/[[...index]]/logo.component";

// If loading a variable font, you don't need to specify the font weight
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "700"] });

export const theme = buildLegacyTheme({
  "--main-navigation-color": "#fff",
  "--main-navigation-color--inverted": "#000",
  "--font-family-base": fredoka.style.fontFamily,
});

const config = {
  title: "Meow Meow Collectibles",

  projectId,

  studio: {
    components: {
      logo: Logo,
    },
  },
  plugins: [
    documentI18n({
      base: "en-US",
      languages: [
        {
          title: "English (US)",
          id: "en-US",
        },
        {
          title: "Portugese (BR)",
          id: "pt-BR",
        },
      ],
      idStructure: IdStructure.DELIMITER,
      referenceBehavior: ReferenceBehavior.STRONG,
      withTranslationsMaintenance: false,
      fieldNames: {
        lang: "__i18n_lang",
        references: "__i18n_refs",
        baseReference: "__i18n_base",
      },
    }),
    deskTool({
      structure: (S) => {
        return S.list()
          .title("Content")
          .items([
            S.listItem().title("What's New").child(S.documentTypeList("posts")),
            S.listItem()
              .title("Meow Meows")
              .child(
                S.list()
                  .title("Meow Meows")
                  .items([
                    S.listItem()
                      .title("Cats")
                      .child(S.documentTypeList("cats")),
                    S.listItem()
                      .title("Categories")
                      .child(S.documentTypeList("category")),
                    S.listItem()
                      .title("Personalities")
                      .child(S.documentTypeList("personality")),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["cats", "category", "personality", "posts"].includes(
                  listItem.getId()!
                )
            ),
          ]);
      },
      defaultDocumentNode: previewDocumentNode(),
    }),
    scheduledPublishing(),
    media(),
  ],
  theme,
  schema: {
    types: schemaTypes,
  },
};

export default defineConfig([
  {
    ...config,
    title: "Meow Meows (LIVE) 🟢",
    subtitle: "Production",
    name: "production",
    basePath: "/studio/live",
    icon: LaunchIcon,
    dataset: "production",
  },
  {
    ...config,
    title: "Development 🏗️",
    name: "develop",
    basePath: "/studio/develop",
    subtitle: "Development",
    icon: RobotIcon,
    dataset: "development",
    plugins: [
      ...config.plugins,
      visionTool({ defaultApiVersion: "2022-10-21" }),
    ],
  },
]);
