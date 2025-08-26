import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-fb-stroke bg-white p-4 pb-5 duration-300 hover:shadow-[0px_20px_60px_-32px_rgba(107,110,148,0.05)]">
      <div className="relative mb-6 block aspect-blog w-full overflow-hidden rounded-lg border-[.5px] border-fb-stroke">
        {post?.mainImage?.length > 0 && (
          <Link href={`/blog/${post?.slug?.current}`} className="block w-full">
              <Image
                src={post?.mainImage}
                alt="blog image"
                className="aspect-blog transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110"
                fill
                quality={100}
              />
          </Link>
        )}
      </div>

      <div className="px-4">
        {/* <div className="flex items-center">
            {tags?.length > 0 &&
              tags?.map((tag, index) => (
                <Link key={index} href={`/blog/tag/${tag?.slug?.current}`}>
                  <a className="inline-block px-4 py-1 mb-5 mr-5 text-xs font-semibold leading-loose text-center capitalize rounded bg-primary bg-opacity-5 text-primary hover:shadow-lg">
                    {tag?.title}
                  </a>
                </Link>
              ))}
          </div> */}
        <h3 className="mb-3 font-heading text-lg font-bold text-black duration-300 hover:text-primary sm:text-xl 2xl:text-lg">
          <Link href={`/blog/${post?.slug?.current}`} className="block capitalize" title={post?.title}>
              {post?.title?.length > 45
                ? `${post?.title?.slice(0, 45)}...`
                : post?.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-body-color">
          {post?.metaDescription?.slice(0, 135)}...
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
