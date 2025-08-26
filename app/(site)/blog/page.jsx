import BlogCard from "../../../components/Blogs/BlogCard";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { getPosts } from "../../../sanity/utils";
import { imageUrlBuilder, siteURL } from "../../../services/config";

export const metadata = {
  title: "Blog | FormBold",
  description: "",
  alternates: {
    canonical: `${siteURL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${siteURL}/blog`,
    title: "Blog | FormBold",
    description: "",
    images: [
      {
        url: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: `${siteURL}/blog`,
    title: "Blog | FormBold",
    description: "",
    images: [""],
  },
};

export default async function BlogPage() {
  const data = await getPosts();
  const blog_data = data ? data : [];
  return (
    <section className="pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
      <Breadcrumb withH1 pageTitle="Blog" />

      <div className="container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-11 md:grid-cols-2 xl:grid-cols-3">
          {blog_data?.length > 0 &&
            blog_data.map((post, index) => {
              return (
                <BlogCard
                  key={index}
                  post={{
                    ...post,
                    mainImage: imageUrlBuilder.image(post?.mainImage).url(),
                  }}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
