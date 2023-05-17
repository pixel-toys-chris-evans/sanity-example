import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import { urlForImage } from "../../../lib/sanity.image";

async function getPost(slug: string) {
  const post = await client.fetch(
    groq`*[!(_id in path("drafts.**")) && _type == "posts" && slug.current == $slug][0]{
      "title": title.en,
      content,
    }`,
    {
      slug,
    }
  );

  return post;
}

type HeroBlock = {
  _key: string;
  _type: "hero";
  heading: string;
  image: {
    alt: string;
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  tagline: string;
};

type HeroProps = Omit<HeroBlock, "_key" | "_type">;

const Hero = ({ heading, image, tagline }: HeroProps) => {
  return (
    <header
      className={`block w-full h-96 bg-cover bg-center text-white`}
      style={
        typeof image?.asset !== "undefined"
          ? { backgroundImage: `url('${urlForImage(image).url()}')` }
          : {}
      }
    >
      <div className="p-16 w-full h-full flex flex-col items-start justify-end backdrop-blur-sm bg-gradient-to-t from-black bg-opacity-25">
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        <p>{tagline}</p>
      </div>
    </header>
  );
};

export interface Post {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  content: HeroBlock[];
  slug: Slug;
  title: Title;
  _updatedAt: string;
}

export interface Content {
  _key: string;
  _type: string;
  heading?: string;
  image?: Image;
  tagline?: string;
  richtext?: Richtext[];
  images?: Image[];
}

export interface Image {
  _type: string;
  alt: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Richtext {
  _key: string;
  _type: string;
  children: Children[];
  markDefs: any[];
  style: string;
}

export interface Children {
  _key: string;
  _type: string;
  marks: any[];
  text: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface Title {
  _type: string;
  en: string;
}

const BLOCK_MAP = {
  hero: Hero,
};

const BLOCK_KEYS = Object.keys(BLOCK_MAP);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = (await getPost(params.slug)) as {
    title: string;
    content: HeroBlock[];
  };

  return (
    <article className="w-full h-full flex flex-col">
      {post.content.map((block) => {
        const { _key, _type, ...props } = block;
        if (BLOCK_KEYS.findIndex((key) => key === _type) >= 0) {
          const Component = BLOCK_MAP[_type];

          return <Component key={_key} {...props} />;
        }
      })}
    </article>
  );
}
