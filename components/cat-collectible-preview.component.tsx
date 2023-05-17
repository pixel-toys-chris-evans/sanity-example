/* eslint-disable jsx-a11y/alt-text */

import { urlForImage } from "../lib/sanity.image";

/* eslint-disable @next/next/no-img-element */
export type CatCollectiblePreviewPaneProps = {
  name: string;
  image: any;
  attributes: {
    category?: string;
    personality?: string;
    edition: "matte" | "foil";
  };
};

export function CatCollectiblePreviewPane({
  name,
  image,
  attributes: attrs,
}: CatCollectiblePreviewPaneProps) {
  return (
    <div className="h-full flex justify-center items-center bg-gray-900">
      <figure
        className={
          "block w-full min-w-[320px] max-w-[384px] aspect-square rounded-2xl relative isolate z-0"
        }
      >
        <img
          src={
            image?.asset?._ref
              ? urlForImage(image).width(384).height(384).fit("fill").url()
              : ""
          }
          className="w-full aspect-square rounded-2xl"
        />
        {attrs.personality && (
          <img
            src={`/personality-${attrs.personality.toLowerCase()}.svg`}
            className="block absolute w-16 aspect-square inset-auto bottom-0 left-4 -rotate-12"
          />
        )}
        <figcaption className="block absolute inset-auto bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] font-bold text-white decoration-[none] text-5xl z-30">
          <span>{name}</span>
        </figcaption>
        {attrs.category && (
          <span
            className={`block absolute px-4 py-1.5 font-bold text-lg text-white border-4 border-white border-solid rounded-2xl inset-auto top-4 right-4 z-30 bg-pink-500 ${attrs.category}`}
          >
            {attrs.category}
          </span>
        )}
      </figure>
    </div>
  );
}
