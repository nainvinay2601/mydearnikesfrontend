export default function Contact() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-[64px] leading-none font-bold mb-4">Contact Us</h1>
      
      <section className="mb-6">
        <h2 className="text-[36px] leading-9 mb-3 mt-8">Get in Touch</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1 font-inter tracking-tight">Email</h3>
            <a href="mailto:krishbarwa@gmail.com" className=" hover:underline">
              krishbarwa@gmail.com
            </a>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1 font-inter tracking-tight">Phone</h3>
            <a href="tel:+919166668224" className=" hover:underline">
              +91 91 6666 8224
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-1 font-inter tracking-tight">Business Hours</h3>
            <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
          </div>
        </div>
      </section>
    </div>
  );
}