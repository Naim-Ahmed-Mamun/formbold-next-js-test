"use client";
import BlogCard from "../../../components/Blogs/BlogCard";
import CallToAction from "../../../components/CallToAction";
import Clients from "../../../components/Home/Clients";
import ConnectApps from "../../../components/Home/ConnectApps";
import Features from "../../../components/Home/Features";
import Features2 from "../../../components/Home/Features2";
import Hero from "../../../components/Home/Hero";
import Integration from "../../../components/Home/Integration";
import IntegrationApps from "../../../components/Home/IntegrationApps";
import Platforms from "../../../components/Home/Platforms";
import PreMadeTemplate from "../../../components/Home/PreMadeTemplate";
// import ProductsFeature from "../../../components/Home/ProductsFeature";
import Steps from "../../../components/Home/Steps";
import SectionTitle from "../../../components/SectionTitle";
import { imageUrlBuilder } from "../../../services/config";

export default function HomeMain({ blogPosts }) {
  return (
    <>
      <Hero />

      <Clients />

      <Features />

      <Features2 />

      <ConnectApps />

      <Steps />

      {/* <ProductsFeature /> */}

      <Platforms />

      <Integration />

      <IntegrationApps />

      <PreMadeTemplate />

      <CallToAction />

      {/* <Testimonials/> */}

      <section className="py-14 md:py-[120px]">
        <div className="container">
          <SectionTitle
            title="From Our Blog"
            paragraph="Latest updates, news and resources from the blog"
            center
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts?.length > 0 &&
              blogPosts.slice(0, 3).map((post, index) => {
                return (
                  <BlogCard
                    key={index}
                    post={{
                      ...post,
                      tags: post?.tags?.map((item) => item?._ref),
                      mainImage: imageUrlBuilder.image(post?.mainImage).url(),
                    }}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
