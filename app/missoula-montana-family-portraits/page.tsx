import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Missoula Montana Family Portraits | 3 Birds Studio",
  description:
    "Outdoor family portraits in Missoula, Montana. Council Grove State Park sessions and Legacy studio portraits by Jesse and Nelli at 3 Birds Studio.",
  alternates: { canonical: "/missoula-montana-family-portraits" },
  openGraph: {
    url: "/missoula-montana-family-portraits",
    images: [
      {
        url: "/images/summer-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Outdoor family portrait session at Council Grove State Park in Missoula, Montana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/summer-banner.jpg"],
  },
};

export default function MissoulaMontanaFamilyPortraitsPage() {
  return (
    <HomeContent
      intro={{
        heading: "Missoula Family Portrait Sessions at Council Grove State Park",
        body:
          "Jesse and Nelli have photographed families along the Clark Fork River and under the Ponderosa pines at Council Grove State Park for more than thirteen years. Whether you want a relaxed outdoor family portrait in the Montana wilderness or a timeless Legacy portrait in our Missoula studio, we will guide you through the entire session so everyone can just be themselves.",
      }}
    />
  );
}
