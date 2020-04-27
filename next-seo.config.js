const title = 'Ahmed Rizwan – Android Engineer';
const description = 'Android Engineer, Writer and Speaker.';

const SEO = {
  title,
  description,
  canonical: 'https://ahmedrizwan.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://ahmedrizwan.com',
    title,
    description,
    images: [
      {
        url: 'https://ahmedrizwan.com/static/images/og.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    handle: '@sudo_rizwan',
    site: '@sudo_rizwan',
    cardType: 'summary_large_image'
  }
};

export default SEO;
