"use client";
import dynamic from 'next/dynamic';

function MarkdownContainer({ content }) {
  return (
    <div
      className="markdown_container integration [&_h2]:!font-[800] [&_h2]:mt-6 [&_h2]:!mb-4 [&_h3]:!text-black [&_h3]:!font-bold [&_strong]:text-black/90 [&_ul_li]:list-disc [&_ol_li]:list-decimal [&_li]:ml-4 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ol]:mb-4 [&_ol]:space-y-1.5"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

export default dynamic(() => Promise.resolve(MarkdownContainer), {
  ssr: false,
});
