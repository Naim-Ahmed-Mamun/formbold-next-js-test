import { sanityDocsPorjectId } from "../services/config";

export const getDataFromSanity = async (query) => {
  const url = `https://${sanityDocsPorjectId}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  if (result?.result) {
    return { isError: false, result: result.result };
  }
  return { isError: true };
};

// get all docs post from sanity by query
export const getAllDocsPost = async () => {
  const allDocsPost = encodeURIComponent('*[ _type == "docsPost" ]');
  return await getDataFromSanity(allDocsPost);
};

export const getAllDocPostsSlug = async () => {
  const allDocsPostSlug = encodeURIComponent('*[ _type == "docsPost" ]{slug}');
  return await getDataFromSanity(allDocsPostSlug);
};

export const getAllSidebarMenu = async () => {
  const allMenus = encodeURIComponent('*[_type == "menu"] | order(index asc)');
  return await getDataFromSanity(allMenus);
};

// get all docs post from sanity by query
export const getDocsPostBySlug = async (slug) => {
  const docsPostBySlug = encodeURIComponent(
    `*[ _type == "docsPost" && slug.current == "${slug}" ]`
  );
  return await getDataFromSanity(docsPostBySlug);
};
