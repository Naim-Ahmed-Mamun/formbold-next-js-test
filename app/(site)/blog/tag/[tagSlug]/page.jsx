import { notFound } from "next/navigation";
import BlogCard from "../../../../../components/Blogs/BlogCard";
import {
  getAllTags,
  getPostsByTag,
  getTagBySlug,
} from "../../../../../sanity/utils";
import { imageUrlBuilder } from "../../../../../services/config";

export const generateMetadata = async ({ params }) => {
  const { tagSlug } = await params;
  const tagDetail = await getTagBySlug(tagSlug);
  return {
    title: `${tagDetail?.title || "Tag"} | FormBold`,
    description: tagDetail?.description || "",
    alternates: {
      canonical: `${siteURL}/blog/tag/${tagSlug}`,
    },
  };
};
export async function generateStaticParams() {
  const allTags = await getAllTags();
  const tagsSlug = allTags?.map((tag) => {
    return { params: { tagSlug: tag?.slug?.current } };
  });
  return tagsSlug;
}
export default async function TagSlugPage({ params }) {
  const { tagSlug } = await params;
  const posts = await getPostsByTag(tagSlug);
  const tagDetail = await getTagBySlug(tagSlug);
  if (tagDetail?.isError) return notFound();
  return (
    <section className="pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <h1 className="mb-5 text-center text-3xl font-bold leading-tight text-black md:text-4xl md:leading-tight xl:text-[40px] xl:leading-tight">
                {tagDetail?.ogTitle || tagDetail?.title}
              </h1>
              <p className="`font-medium w-full text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                {tagDetail?.ogDescription || tagDetail?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts?.length > 0 &&
            posts?.map((post, index) => (
              <BlogCard
                key={index}
                post={{
                  ...post,
                  mainImage: imageUrlBuilder.image(post?.mainImage).url(),
                }}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
