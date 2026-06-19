import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Crisp Cleaning",
  description: "Read the latest tips, guides, and news from Crisp Cleaning.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen pt-40 pb-20 container mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Blog Post Placeholder",
            "author": {
              "@type": "Organization",
              "name": "Crisp Cleaning"
            },
            "publisher": {
              "@id": "https://crispcleaning.com.au/#localbusiness"
            },
            "datePublished": new Date().toISOString()
          })
        }}
      />
      <h1 className="text-4xl font-bold mb-6 text-center">Blog Post</h1>
      <p className="text-center text-muted-foreground">
        Article content for: {params.slug}
      </p>
    </div>
  );
}
