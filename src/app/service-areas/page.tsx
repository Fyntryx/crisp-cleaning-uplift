import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceAreas from "@/components/lp/ServiceAreas";

export const metadata: Metadata = {
  title: "Service Areas | Crisp Cleaning",
  description: "Explore the service areas covered by Crisp Cleaning in Melbourne.",
  alternates: {
    canonical: "/service-areas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <ServiceAreas />
      </div>
      <Footer />
    </>
  );
}
