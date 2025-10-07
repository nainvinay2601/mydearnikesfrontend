export default function RefundPolicy() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-[64px] leading-none font-bold mb-4">Refund Policy</h1>
      <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-[36px] leading-9 mb-3 mt-8">Refund Policy</h2>
        <p className="text-gray-700 mb-4">
          All sales are final. Please double-check your order before placing it, as we do not accept returns, exchanges, or issue refunds unless the item arrives damaged or there was an error on our end.
        </p>
        <p className="text-gray-700 mb-4">
          If your order is damaged or incorrect, contact us within 48 hours of delivery at <a href="mailto:mydearnikes@gmail.com" className="text-blue-500">mydearnikes@gmail.com</a>, and we’ll do our best to make it right.
        </p>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}