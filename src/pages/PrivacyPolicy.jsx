import React from "react";
import ResourceLayout from "../components/ResourceLayout";

const PrivacyPolicy = () => {
  return (
    <ResourceLayout
      title="Privacy Policy"
      description="Learn about how we collect, use, and protect your personal information."
    >
      <div className="space-y-6">
        <p>Your privacy matters. Here's what you should know:</p>

        <section>
          <h3 className="text-xl font-bold mb-2">Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Your email address for order communication and promotional
              updates.
            </li>
            <li>
              Optional contact details submitted through the Contact page for
              custom orders or inquiries.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">
            How We Use Your Information
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>To fulfill and deliver your orders efficiently.</li>
            <li>
              To send updates about your order or exclusive offers, if
              subscribed.
            </li>
            <li>To respond to your questions or custom order requests.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Data Protection</h3>
          <p>
            All personal information is stored securely. We implement measures
            to prevent unauthorized access, disclosure, or misuse.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Third Parties</h3>
          <p>
            We do not sell or share your personal data with third parties.
            Delivery services may access your delivery details solely to fulfill
            your order.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Your Rights</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You can opt out of our newsletter anytime using the unsubscribe
              link.
            </li>
            <li>
              You may contact us to request access or deletion of your data.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p>
            If you have any privacy-related questions or requests, please email
            us at:{" "}
            <a
              href="mailto:info@onyitrims.com"
              className="text-blue-600 underline"
            >
              info@onyitrims.com
            </a>
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
};

export default PrivacyPolicy;
