import { getAllPostSlugs, getPostBySlug } from "../../../../sanity/utils";
import { imageUrlBuilder, siteURL } from "../../../../services/config";
import BlogDetailsMain from "./_components/BlogDetailsMain";

export const generateStaticParams = async () => {
  const res = await getAllPostSlugs();
  const allSlug = res?.map(({ slug }) => {
    return { params: { slug: slug } };
  });

  return allSlug;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug); // Fetch post data

  const desc = post?.metaDescription || post?.description?.split('"').join("'");
  const metaDescription = desc?.slice(0, 136);
  const title = `${post?.title || "Post"} | FormBold`; // Fixed typo: FromBold -> FormBold
  const ogTitle = `${post?.ogTitle || post?.title || "Post"} | FormBold`;
  const ogImage = post?.mainImage
    ? imageUrlBuilder.image(post.mainImage).url()
    : "";
  const ogUrl = `${siteURL}/blog/${post?.slug?.current || slug}`;

  return {
    title,
    description: `${metaDescription || ""} ...`,
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      type: "website",
      url: ogUrl,
      title: ogTitle,
      description: `${metaDescription || ""} ...`,
      images: [
        {
          url: ogImage || "https://cdn.formbold.com/formbold.jpg",
          width: 1700,
          height: 860,
          alt: `${post?.title || "Post"} Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: ogUrl,
      title: ogTitle,
      description: `${metaDescription || ""} ...`,
      images: [ogImage || "https://cdn.formbold.com/formbold.jpg"],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return <BlogDetailsMain post={post} />;
}
