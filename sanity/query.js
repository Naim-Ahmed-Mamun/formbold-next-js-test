// import { groq } from "next-sanity";
const postData = `{
  title,
  metadata,
  slug,
  tags,
  author->{
    _id,
    name,
    slug,
    image,
    description,
    bio
  },
  category->{
    _id,
    title,
    slug
  },
  mainImage,
  publishedAt,
  body
}`;

// export const postQuery = groq`*[_type == "post"] ${postData}`;
export const postQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  ...,
  tags[]->{
    _id,
    title,
    slug,
  }
  }`;

export const postQueryBySlug = `*[ _type == "blogPost" && slug.current == $slug][0] {
      ...,
      author->{
        _id,
        name,
        slug,
        image,
      },
      tags[]->{
        _id,
        title,
        slug,
      }
    }`;

export const postQueryByTag = `*[_type == "blogPost" && $slug in tags[]->slug.current] {
  ...,
  tags[]->{
    _id,
    title,
    slug,
  }
  }`;

export const postQueryByAuthor = `*[_type == "post" && author->slug.current == $slug] ${postData}`;

export const postQueryByCategory = `*[_type == "post" && category->slug.current == $slug] ${postData}`;

export const postSlugQuery = `*[_type == "blogPost"] { 'slug': slug.current }`;
