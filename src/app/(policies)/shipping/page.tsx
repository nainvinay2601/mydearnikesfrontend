export default function ShippingPolicy() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-[64px] leading-none font-bold mb-4">Shipping Policy</h1>
      <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-[36px] leading-9 mb-3 mt-8">Order Processing Time</h2>
        <p className="text-gray-700 mb-4">
          Orders are processed within 7 business days.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[36px] leading-9 mb-3 mt-8">Delivery Times</h2>
        <p className="text-gray-700 mb-1">
          Delivery times may vary depending on your location and the selected courier.
        </p>
        <p className="text-gray-700 mb-4">
          We are not liable for delays caused by shipping carriers or unexpected events.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[36px] leading-9 mb-3 mt-8">Shipping Methods</h2>
        <p className="text-gray-700 mb-4">
          We offer standard and express shipping options. Shipping costs are calculated at checkout based on your location and selected method.
        </p>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}