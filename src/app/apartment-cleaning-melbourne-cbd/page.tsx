import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MelbourneCBDClient from '@/components/lp/MelbourneCBDClient';

export const metadata: Metadata = {
  title: 'Apartment Cleaning Melbourne CBD | Same Cleaner Every Visit | Crisp Cleaning',
  description: 'Apartment cleaning across Melbourne CBD, Southbank and Docklands. Building access coordinated, same cleaner every visit, fixed pricing. Instant quote.',
  robots: { index: true, follow: true },
};

export default function ApartmentCleaningMelbourneCBDPage() {
  return (
    <>
      <Navbar />
      <MelbourneCBDClient />
      <Footer />
    </>
  );
}
