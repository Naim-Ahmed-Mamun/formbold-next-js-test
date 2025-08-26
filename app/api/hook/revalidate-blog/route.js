import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getPostsByTag } from "../../../../sanity/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    
    if (!signature) {
      return NextResponse.json({ msg: "Signature missing!" }, { status: 401 });
    }

    if (
      !isValidSignature(
        JSON.stringify(body),
        signature,
        process.env.SANITY_BLOG_WEBHOOK_SECRET
      )
    ) {
      return NextResponse.json({ msg: "Invalid request!" }, { status: 401 });
    }

    const { slug, tags, _type } = body;

    if (_type === "blogPost") {
      const tagsSlug = tags?.map((tag) => tag?.title.toLowerCase());
      console.log("revalidated url ==> ", slug, tagsSlug);

      if (tagsSlug) {
        for (const tag of tagsSlug) {
          revalidatePath(`/blog/tag/${tag}`);
        }
      }

      revalidatePath("/");
      revalidatePath(`/blog`);
      revalidatePath(`/blog/${slug}`);
    }

    if (_type === "blogTags") {
      revalidatePath(`/blog/tag/${slug}`);

      const posts = await getPostsByTag(slug);
      for (const post of posts) {
        revalidatePath(`/blog/${post?.slug?.current}`);
      }
    }

    if (_type === "templatePost") {
      revalidatePath(`/templates`);
      revalidatePath(`/templates/${slug}`);
    }

    if (_type === "templateTags") {
      revalidatePath("/templates");
      // const posts = await getPostsByTag(slug);
      // for (const post of posts) {
      //   revalidatePath(`/templates/${post?.slug?.current}`);
      // }
    }

    return NextResponse.json({ msg: "Blog pages revalidated." }, { status: 200 });
  } catch (error) {
    console.log("error from sanity webhook", error);
    return NextResponse.json({ err: "Something went Wrong!" }, { status: 500 });
  }
}
