import React from "react";
import ResourceLayout from "../components/ResourceLayout";

const RefundPolicy = () => {
  return (
    <ResourceLayout
      title="Refund & Return Policy"
      description="Information about our return process and refund conditions."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Return Window</h2>
          <p>
            We accept returns within <strong>7 days</strong> of the delivery
            date. Returns requested after this period may not be honored.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Return Conditions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Items must be unused and in their original condition.</li>
            <li>Product packaging must remain intact.</li>
            <li>
              Proof of purchase (e.g. order confirmation email) is required.
            </li>
            <li>Custom or made-to-order items are not eligible for return.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Return Process</h3>
          <p>To initiate a return:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Send an email to <strong>support@onyitrims.com</strong> with your
              order number and reason for return.
            </li>
            <li>
              We will review your request and send return instructions if
              eligible.
            </li>
            <li>Customers are responsible for the cost of return shipping.</li>
            <li>
              Once the item is received and inspected, a refund will be issued
              within <strong>5–7 business days</strong>.
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Refund Method</h3>
          <p>
            Refunds are issued to the original payment method. If the original
            method is unavailable, we may offer store credit as an alternative.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Damaged or Missing Items</h3>
          <p>
            Please inspect your package upon delivery. If your order is damaged,
            incomplete, or incorrect, contact us within{" "}
            <strong>48 hours</strong> of receipt. We’ll resolve the issue as
            quickly as possible.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Non-Returnable Items</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Custom-made or personalized items</li>
            <li>Sale items marked as “Final Sale”</li>
            <li>Used or altered products</li>
          </ul>
        </section>
      </div>
    </ResourceLayout>
  );
};

export default RefundPolicy;
