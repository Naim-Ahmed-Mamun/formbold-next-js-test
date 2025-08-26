import { siteURL } from "../../../services/config";
import IntegrationsMain from "./_components/IntegrationMain";

export const metadata = {
    title: 'Apps and Integrations | FormBold',
    description: 'FormBold offers tons of third-party apps and integrations with your form end-point so that you can connect with your forms as notification channels',
    alternates: {
      canonical: `${siteURL}/integrations`,
    },
    openGraph: {
      type: 'website',
      url: `${siteURL}/integrations`,
      title: 'Apps and Integrations | FormBold',
      description: 'FormBold offers tons of third-party apps and integrations with your form end-point so that you can connect with your forms as notification channels',
      images: [
        {
          url: 'https://cdn.formbold.com/formbold-integrations.jpg',
          width: 1200,
          height: 630,
          alt: 'FormBold Integrations',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      url: `${siteURL}/integrations`,
      title: 'Apps and Integrations | FormBold',
      description: 'FormBold offers tons of third-party apps and integrations with your form end-point so that you can connect with your forms as notification channels',
      images: ['https://cdn.formbold.com/formbold-integrations.jpg'],
    },
  };

export default function IntegrationsPage() {
  return (
    <IntegrationsMain/>
  )
}
