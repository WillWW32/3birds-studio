import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for 3 Birds Studio, including SMS messaging terms.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-4 flex justify-center">
        <Image
          src="/images/logo-black.png"
          alt="3 Birds Studio"
          width={80}
          height={94}
          className="h-20 w-auto"
          priority
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-16">
        <h1 className="font-display text-3xl font-bold text-navy mb-8 text-center">
          Privacy Policy
        </h1>

        <div className="prose prose-sm text-gray-600 space-y-6">
          <p className="text-xs text-gray-400">
            Last updated: April 16, 2026
          </p>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Who We Are
            </h2>
            <p>
              3 Birds Studio is a portrait photography studio located in Missoula,
              Montana. This privacy policy describes how we collect, use, and protect
              your personal information when you interact with our website, forms, and
              communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Information We Collect
            </h2>
            <p>When you register through our website, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Session preferences (outdoor/indoor, number of people)</li>
            </ul>
            <p>
              We collect this information solely to book and manage your portrait
              session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              SMS/Text Messaging Terms
            </h2>
            <p>
              By providing your phone number and checking the consent box on our
              registration form, you agree to receive automated text messages from
              3 Birds Studio related to your portrait session booking, scheduling,
              and reminders.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Message frequency:</strong> Message frequency varies.
                Typically 1 to 5 messages per booking.
              </li>
              <li>
                <strong>Message and data rates may apply.</strong> Check with your
                carrier for details.
              </li>
              <li>
                <strong>Opt out:</strong> Reply STOP to any message to stop
                receiving texts. You will receive a confirmation message.
              </li>
              <li>
                <strong>Help:</strong> Reply HELP to any message for assistance,
                or contact us at 406-239-3442.
              </li>
            </ul>
            <p className="font-semibold text-navy">
              We will never sell, rent, or share your mobile phone number or SMS
              opt-in data with third parties for marketing purposes. Your mobile
              information will not be shared with or sold to third parties or
              affiliates for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              How We Use Your Information
            </h2>
            <p>We use your personal information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contact you to book and confirm your portrait session</li>
              <li>Send scheduling links and session reminders</li>
              <li>Communicate about your portrait collection</li>
              <li>Respond to your questions</li>
            </ul>
            <p>
              We do not use your information for unrelated marketing or advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share limited information with service providers who
              assist us in operating our business (such as scheduling platforms and
              communication tools), but only as necessary to provide our services
              to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your personal
              information. However, no method of electronic transmission or storage
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Your Rights
            </h2>
            <p>You may at any time:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction or deletion of your information</li>
              <li>Opt out of text messages by replying STOP</li>
              <li>Opt out of email communications by clicking unsubscribe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mt-8 mb-3">
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or your personal
              information, contact us:
            </p>
            <ul className="list-none space-y-1">
              <li>3 Birds Studio</li>
              <li>6850 Mullan Way, Missoula, MT</li>
              <li>Phone: 406-239-3442</li>
              <li>Email: hello@3birdsstudio.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
