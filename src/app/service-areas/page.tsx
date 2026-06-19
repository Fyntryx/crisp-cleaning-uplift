import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas | Crisp Cleaning",
  description: "Explore the service areas covered by Crisp Cleaning in Melbourne.",
  alternates: {
    canonical: "/service-areas",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Service Areas</h1>
      <p className="text-center text-muted-foreground">
        We provide exceptional cleaning services across Melbourne. 
        More details about specific suburbs coming soon!
      </p>
    </div>
  );
}
