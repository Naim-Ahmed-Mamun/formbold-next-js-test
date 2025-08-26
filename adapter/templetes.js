import { sanityProjectId } from "../services/config";

export const getDataFromSanity = async (query) => {
  const url = `https://${sanityProjectId}.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());
  if (result?.result) {
    return { isError: false, result: result.result };
  }
  return { isError: true };
};

// get all templates post from sanity by query
export const getAllTemplates = async () => {
  const allTemplates = encodeURIComponent('*[ _type == "templatePost" ]');
  return await getDataFromSanity(allTemplates);
};

// get template by slug
export const getTemplatesBySlug = async (slug) => {
  const slugQuery = encodeURIComponent(
    `*[_type == "templatePost" && [slug].current match "${slug}"]`
  );
  return await getDataFromSanity(slugQuery);
};

// get all templates tags from sanity by query
export const getAllTemplateTags = async () => {
  const allTags = encodeURIComponent('*[ _type == "templateTags" ]');
  return await getDataFromSanity(allTags);
};
