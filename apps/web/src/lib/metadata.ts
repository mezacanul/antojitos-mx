import { getImagesBaseURL } from "@/lib/image";

function getMetadataObject(metadata: any) {
  const cdn = process.env.NEXT_PUBLIC_CDN_URL;
  const imagesBaseURL = getImagesBaseURL();
  const fullImageURL = `${imagesBaseURL}/${metadata.image_path}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: metadata.title,
    description: metadata.excerpt,
    // Keywords are "low weight" but good for internal site search/small engines
    keywords: metadata.tags,

    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      url: baseUrl,
      siteName: metadata.title,
      images: [
        { url: fullImageURL, width: 1200, height: 630 },
      ],
      type: "website", // Use 'article' for blog/projects, 'website' for home
      publishedTime: metadata.publishedAt,
      authors: ["Eduardo Meza"],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.excerpt,
      images: [fullImageURL],
      creator: "@eduardomeza",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${baseUrl}/en`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
  };
}

export { getMetadataObject };
