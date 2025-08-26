import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import { getPostsByTag } from "../../../sanity/utils";

const handler = async (req, res) => {
  try {
    const signature = req.headers[SIGNATURE_HEADER_NAME].toString();

    if (
      !isValidSignature(
        JSON.stringify(req.body),
        signature,
        process.env.SANITY_BLOG_WEBHOOK_SECRET
      )
    ) {
      console.log("Invalid request!", req.body);
      return res.status(401).json({ msg: "Invalid request!" });
    }

    console.log("revalidated url ==> ", req.body);

    const { slug, tags, _type } = req.body;

    if (_type === "blogPost") {
      const tagsSlug = tags?.map((tag) => tag?.title.toLowerCase());
      console.log("revalidated url ==> ", slug, tagsSlug);

      if (tagsSlug) {
        for (const tag of tagsSlug) {
          await res.revalidate(`/blog/tag/${tag}`);
        }
      }

      await res.revalidate("/");
      await res.revalidate(`/blog`);
      await res.revalidate(`/blog/${slug}`);
    }

    if (_type === "blogTags") {
      await res.revalidate(`/blog/tag/${slug}`);

      const posts = await getPostsByTag(slug);
      for (const post of posts) {
        await res.revalidate(`/blog/${post?.slug?.current}`);
      }
    }

    if (_type === "templatePost") {
      res.revalidate(`/templates`);
      res.revalidate(`/templates/${slug}`);
    }

    if (_type === "templateTags") {
      res.revalidate("/templates");
      // const posts = await getPostsByTag(slug);
      // for (const post of posts) {
      //   res.revalidate(`/templates/${post?.slug?.current}`);
      // }
    }

    return res.status(200).json({ msg: "Blog pages revalidated." });
  } catch (error) {
    console.log("error from sanity webhook", error);
    res.status(500).json({ err: "Something went Wrong!" });
  }
};

export default handler;
