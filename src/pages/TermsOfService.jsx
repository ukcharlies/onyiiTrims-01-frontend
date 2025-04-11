import React from "react";
import ResourceLayout from "../components/ResourceLayout";

const TermsOfService = () => {
  return (
    <ResourceLayout
      title="Terms of Service"
      description="Please read these terms and conditions carefully before using our service."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Welcome to Onyi Trims</h2>
          <p>
            By accessing or using our services, you agree to comply with and be
            bound by the following terms:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Eligibility</h3>
          <p>You must be at least 18 years old to purchase from our site.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Products</h3>
          <p>
            All items are described as accurately as possible. Colors may vary
            slightly due to lighting.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Orders</h3>
          <p>
            Once an order is placed, you'll receive a confirmation email. All
            sales are subject to product availability.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Custom Orders</h3>
          <p>
            These are made-to-request and must be submitted via the Contact
            Page.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Use of Site</h3>
          <p>
            Any misuse of the website for fraud, spam, or violation of rights
            will result in restriction of access.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Third-Party Services</h3>
          <p>
            We may use third-party services (like GIG Logistics) to fulfill
            deliveries. We are not responsible for their policies.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Legal Disclaimer</h3>
          <p>
            Onyi Trims is not liable for any indirect, incidental, or
            consequential damages arising out of product use or service. All
            products are sold "as-is" without warranties unless otherwise
            stated.
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
};

export default TermsOfService;
