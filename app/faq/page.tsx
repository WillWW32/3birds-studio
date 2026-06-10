import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | Portrait Sessions in Missoula, Montana",
  description:
    "Answers about booking a portrait session in Missoula: outdoor vs studio sessions, what to wear, gift certificates, the $100 reservation fee, and what happens after your session.",
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
};

// One source of truth: rendered visibly below AND fed into the FAQPage
// JSON-LD so the structured data always matches the published content.
const faqs = [
  {
    question: "Who does family portraits in Missoula, Montana?",
    answer:
      "3 Birds Studio is a husband-and-wife fine art portrait studio in Missoula run by Jesse and Nelli. We photograph families, couples, and individuals in two ways: outdoor sessions at Council Grove State Park along the river, or formal Legacy portrait sessions in our Missoula studio at 6850 Mullan Way. We hold a 4.9-star rating on Google.",
  },
  {
    question: "How do I book a portrait session?",
    answer:
      "Call or text 406-239-3442. Denise, our booking assistant, answers 24 hours a day and books you directly onto the studio calendar. You can also book online at 3birdsstudio.com/book. A $100 reservation fee holds your date and is fully refundable as long as you do not cancel the day of your session.",
  },
  {
    question: "What is the difference between an outdoor session and a Legacy studio session?",
    answer:
      "Outdoor sessions happen at Council Grove State Park, a wilderness park just outside Missoula surrounded by Ponderosa pines, and have a relaxed, natural feel. Legacy sessions are 2-hour formal portrait sessions in our studio with wardrobe consultation beforehand. Both end with an in-studio viewing and ordering appointment, typically within a week of your session.",
  },
  {
    question: "What happens if the weather is bad on my outdoor session day?",
    answer:
      "Sessions happen rain or shine, and overcast days actually make the best photos. If the weather is truly bad, we reschedule for free.",
  },
  {
    question: "How do the dealership gift certificates work?",
    answer:
      "Local partners, including Missoula car dealerships, give their best customers a $1,500 gift certificate that covers a full portrait session experience at 3 Birds Studio. Once validated, you have 6 months to schedule. The only cost to book is the $100 reservation fee, which is fully refundable as long as you do not cancel the day of your session.",
  },
  {
    question: "What should I wear to my portrait session?",
    answer:
      "For Legacy studio sessions we recommend more formal attire, and we provide a specific wardrobe consultation before your session. For outdoor sessions, comfortable coordinated outfits photograph beautifully against the natural Montana backdrop. We guide you either way.",
  },
  {
    question: "What happens after the session?",
    answer:
      "Your in-studio viewing and ordering appointment is scheduled the day of your session, typically within one week. We ask that all adults from the session attend, and we guide you through portrait selection, boutique products, gifts, and display options.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="font-display text-3xl font-bold text-black mb-3 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 text-center mb-12">
          Everything about booking a portrait session with 3 Birds Studio in
          Missoula, Montana.
        </p>

        <div className="space-y-10">
          {faqs.map((f) => (
            <section key={f.question}>
              <h2 className="text-lg font-bold text-black mb-2">{f.question}</h2>
              <p className="text-gray-600 leading-relaxed">{f.answer}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Still have a question? Denise answers 24/7.
          </p>
          <a
            href="tel:+14062393442"
            className="inline-block px-8 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            Call or Text 406-239-3442
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
