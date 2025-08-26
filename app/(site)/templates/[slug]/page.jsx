import { notFound } from "next/navigation";
import {
  getAllTemplates,
  getTemplatesBySlug,
} from "../../../../adapter/templetes";
import { imageUrlBuilder, siteURL } from "../../../../services/config";
import TemplateDetailsMain from "../_components/TemplateDetailsMain";

async function fetchTemplate(slug) {
  const data = await getTemplatesBySlug(slug);
  if (!data?.isError && data?.result?.length) {
    return data?.result[0];
  } else {
    return notFound();
  }
}

export const generateStaticParams = async () => {
  const res = await getAllTemplates();
  const allSlug = res?.result?.map((post) => {
    return { slug: post?.slug?.current };
  });
  return allSlug;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchTemplate(slug); // Fetch post data

  const asPath = `/templates/${slug}`;

  // Generate image URL
  const imageUrl = post?.PreviewImage
    ? imageUrlBuilder.image(post.PreviewImage).url()
    : "https://cdn.formbold.com/formbold.jpg";

  return {
    title: `${post?.title || "Template"} | FormBold`,
    description: `${post?.description?.slice(0, 136) || ""}...`,
    alternates: {
      canonical: `${siteURL}${asPath}`,
    },
    openGraph: {
      type: "website",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Template"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""}...`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post?.title || "Template"} Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Template"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""}...`,
      images: [imageUrl],
    },
  };
}

export default async function TemplateDetails({ params }) {
  const { slug } = await params;
  const post = await fetchTemplate(slug);
  
  return <TemplateDetailsMain post={post} />;
}
