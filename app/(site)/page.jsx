import { getPosts } from '../../sanity/utils';
import HomeMain from './_components/HomeMain';

export const metadata = {
    title: 'Free Form API, Builder and Backend - Complete Web Form Solution | FormBold',
    description: 'Free web form solution that includes form API, backend, and form builder. You can effortlessly receive website form submissions directly to inbox, Slack, Sheet, Notion, Telegram and more.',
    openGraph: {
      type: 'website',
      url: 'https://formbold.com/',
      title: 'Free Form API, Builder and Backend - Complete Web Form Solution | FormBold',
      description: 'Free web form solution that includes form API, backend, and form builder. You can effortlessly receive website form submissions directly to inbox, Slack, Sheet, Notion, Telegram and more.',
      images: [
        {
          url: 'https://cdn.formbold.com/formbold.jpg',
          width: 1200, // Optional: add dimensions if known
          height: 630, // Optional: add dimensions if known
          alt: 'FormBold Web Form Solution', // Optional: descriptive alt text
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      url: 'https://formbold.com/',
      title: 'Free Form API, Builder and Backend - Complete Web Form Solution | FormBold',
      description: 'Free web form solution that includes form API, backend, and form builder. You can effortlessly receive website form submissions directly to inbox, Slack, Sheet, Notion, Telegram and more.',
      images: ['https://cdn.formbold.com/formbold.jpg'],
    },
    alternates: {
      canonical: 'https://formbold.com',
    },
  };

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <HomeMain blogPosts={posts} />
  )
}
