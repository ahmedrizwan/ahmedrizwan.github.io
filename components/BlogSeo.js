import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, summary, publishedAt, slug, image }) => {
  const date = new Date(publishedAt).toISOString();
  const url = `https://ahmedrizwan.com/blog/${slug}`;
  const featuredImage = {
    url: `https://ahmedrizwan.com${image}`,
    alt: title
  };

  return (
    <>
      <NextSeo
        title={`${title} - Ahmed Rizwan`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date
          },
          url,
          title,
          description: summary,
          images: [featuredImage]
        }}
      />
      <ArticleJsonLd
        authorName="Ahmed Rizwan"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Ahmed Rizwan"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
