import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import FAQsClient from "@/components/FAQsClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: '/faq',
  },
};


const query = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export default async function FAQsPage() {
  const data = await client.fetch(query, {}, { cache: "no-store" });

  return (
    <main>
      <FAQsClient data={data} />
      <Footer />
    </main>
  );
}
