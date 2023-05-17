import { DefaultDocumentNodeResolver } from "sanity/desk";
import { cats as catsType } from "../schemas/cat.schema";
import { posts as postsType } from "../schemas/posts.schema";
import { CatCollectiblePreviewPane } from "./cat-collectible-preview.component";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { groq } from "next-sanity";
import { useClient } from "sanity";
import { PostPreview } from "./post-preview.component";

export const previewDocumentNode = (): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case catsType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component((context) => {
              const client = useClient();
              const { document } = context;
              console.log(context);
              //const category = useFormValue(["category"]);
              const [category, setCategory] = useState<string | undefined>(
                undefined
              );

              const [personality, setPersonality] = useState<
                string | undefined
              >(undefined);

              useEffect(() => {
                const fetchAttributes = async () => {
                  const attrs = ["category", "personality"];
                  const ids = attrs.map(
                    (attr) => document.displayed[attr]._ref
                  );

                  const data: { _type: string; name: string }[] =
                    await client.fetch(
                      groq`*[_type in $attrs && _id in $ids]{
                      _type,
                       name
                     }`,
                      { attrs, ids }
                    );

                  if (data) {
                    setCategory(data.find((x) => x._type === "category")?.name);
                    setPersonality(
                      data.find((x) => x._type === "personality")?.name
                    );
                  }
                };

                fetchAttributes();
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [document.displayed.category, document.displayed.personality]);

              return (
                <CatCollectiblePreviewPane
                  name={document.displayed.name.en as string}
                  image={document.displayed.image as any}
                  attributes={{
                    category,
                    personality,
                    edition: document.displayed.edition as "matte" | "foil",
                  }}
                />
              );
            })
            .title("Preview"),
        ]);

      case postsType.name: {
        return S.document().views([
          S.view.form(),
          S.view.component(PostPreview).title("Preview"),
        ]);
      }
      default:
        return null;
    }
  };
};
