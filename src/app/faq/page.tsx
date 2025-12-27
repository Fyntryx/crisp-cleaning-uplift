import { client } from "@/sanity/lib/client";
import FAQsClient from "@/components/FAQsClient";

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

  return <FAQsClient data={data} />;
}
