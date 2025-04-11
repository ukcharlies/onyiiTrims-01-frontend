import React from "react";
import ResourceLayout from "../components/ResourceLayout";

const ShippingPolicy = () => {
  return (
    <ResourceLayout
      title="Shipping Policy"
      description="Learn about our shipping methods, delivery times, and coverage areas."
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Shipping Coverage</h2>
          <p>We currently ship only within Lagos, Nigeria.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Delivery Timeline</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Standard Delivery: 1–3 business days within Lagos</li>
            <li>
              Express Delivery: Same-day delivery if your order is placed before
              12 PM
            </li>
          </ul>
          <p className="mt-2">
            Deliveries are made Monday to Saturday, excluding public holidays.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Delivery Methods</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>GIG Logistics – reliable and trackable.</li>
            <li>Onyi Trims personal dispatch for select areas.</li>
            <li>
              Customer’s preferred dispatch rider (must be communicated at
              checkout).
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Shipping Costs</h3>
          <p>
            Standard delivery within Lagos is <strong>free</strong>. If you
            request express delivery or a specific dispatch rider, additional
            charges may apply and will be communicated before dispatch.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Order Processing</h3>
          <p>
            Orders placed before 12 PM are processed the same day. Orders placed
            after 12 PM may be processed the next business day. You’ll receive a
            confirmation message once your order is out for delivery.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-3">Failed Deliveries</h3>
          <p>
            If delivery fails due to an incorrect address or unavailability of
            the recipient, we’ll contact you to reschedule. Additional fees may
            apply for redelivery.
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
};

export default ShippingPolicy;
