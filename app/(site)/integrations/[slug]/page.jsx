import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "../../../../data/helper";
import { siteURL } from "../../../../services/config";
import IntegrationDetailMain from "./_components/IntegrationDetailsMain";

// Mock fetchPost function (replace with your actual data fetching logic)
async function fetchPost(slug) {
  const data = await getPostBySlug(
    slug,
    ["title", "description", "icon", "slug", "author", "content", "ogImage"],
    "integrations"
  );
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug); // Fetch post data

  // Derive asPath equivalent (e.g., /integrations/some-post)
  const asPath = `/integrations/${slug}`;

  return {
    title: `${post?.title || "Post"} | FormBold`,
    description: `${post?.description?.slice(0, 136) || ""} ...`,
    alternates: {
      canonical: `${siteURL}${asPath}`,
    },
    openGraph: {
      type: "website",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Post"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""} ...`,
      images: [
        {
          url: post?.ogImage || "https://cdn.formbold.com/formbold.jpg",
          width: 1200, 
          height: 630,
          alt: `${post?.title || "Post"} Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: `${siteURL}${asPath}`,
      title: `${post?.title || "Post"} | FormBold`,
      description: `${post?.description?.slice(0, 136) || ""} ...`,
      images: [post?.ogImage || "https://cdn.formbold.com/formbold.jpg"],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"], "integrations");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export default async function IntegrationPage({ params }) {
  const { slug } = await params;
  const data = await getPostBySlug(
    slug,
    ["title", "description", "icon", "slug", "author", "content", "ogImage"],
    "integrations"
  );
  const content = await markdownToHtml(data?.content || "");
  const post = {
    ...data,
    content,
  };
  return <IntegrationDetailMain post={post} />;
}
