import ImageUrlBuilder from "@sanity/image-url";
import config from "./client-config";

import { createClient } from "@sanity/client";

import {
  postQuery,
  postQueryBySlug,
  postQueryByTag,
  postQueryByAuthor,
  postQueryByCategory,
  postSlugQuery,
} from "./query";

export const client = createClient(config);
export async function sanityFetch({ query, qParams, tags }) {
  return client.fetch(query, qParams, {
    cache: "force-cache",
    next: { tags },
  });
}

export function imageBuilder(source) {
  return ImageUrlBuilder(config).image(source);
}

export const getPosts = async () => {
  const data = await sanityFetch({
    query: postQuery,
    qParams: {},
    tags: ["post", "author", "category"],
  });
  return data;
};

export const getPostBySlug = async (slug) => {
  const data = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getPostsByTag = async (tag) => {
  const data = await sanityFetch({
    query: postQueryByTag,
    qParams: { slug: tag },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getTagBySlug = async (slug) => {
  return await sanityFetch({
    query: `*[_type == "blogTags" && slug.current == $slug][0]`,
    qParams: { slug },
    tags: ["blogTags"],
  });
};

export const getAllTags = async () => {
  return await sanityFetch({
    query: `*[_type == "blogTags"]`,
    qParams: {},
    tags: ["blogTags"],
  });
};

export const getPostsByAuthor = async (slug) => {
  const data = await sanityFetch({
    query: postQueryByAuthor,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getPostsByCategory = async (slug) => {
  const data = await sanityFetch({
    query: postQueryByCategory,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getAuthorBySlug = async (slug) => {
  const data = await sanityFetch({
    query: `*[_type == "author" && slug.current == $slug][0]`,
    qParams: { slug },
    tags: ["author"],
  });

  return data;
};

export const getAllPostSlugs = async () => {
  const data = await sanityFetch({
    query: postSlugQuery,
    qParams: {},
    tags: ["post"],
  });
  return data;
};
