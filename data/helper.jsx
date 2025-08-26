import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

import rehypeRaw from "rehype-raw"; // 🆕 Add this

export async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) // 🆕 Important
    .use(rehypeRaw) // 🆕 Important: allow parsing raw HTML inside markdown
    .use(rehypePrism)
    .use(rehypeStringify, { allowDangerousHtml: true }) // 🆕 Important
    .process(markdown);

  return result.toString();
}

export function getPostSlugs(dirName) {
  const postsDirectory = join(process.cwd(), `data/markdown/${dirName}`);
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = [], dirName) {
  const postsDirectory = join(process.cwd(), `data/markdown/${dirName}`);
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = [], dirName) {
  const slugs = getPostSlugs(dirName);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, dirName))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
