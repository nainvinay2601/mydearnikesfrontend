import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-[64px] leading-none font-bold mb-4">Contact Us</h1>
      
      <section className="mb-6">
        {/* <h2 className="text-[36px] leading-9 mb-6 mt-8">Get in Touch</h2> */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 font-inter tracking-tight">Email</h3>
            <Button variant="outline" asChild>
              <a href="mailto:krishbarwa@gmail.com" className="w-full sm:w-auto">
                krishbarwa@gmail.com
              </a>
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 font-inter tracking-tight">Phone</h3>
            <Button variant="outline" asChild>
              <a href="tel:+919166668224" className="w-full sm:w-auto">
                +91 91 6666 8224
              </a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2 font-inter tracking-tight">DM us on Instagram</h3>
            <Button variant="outline" asChild>
              <a 
                href="https://instagram.com/shop.mydearnikes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                @shop.mydearnikes
              </a>
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2 font-inter tracking-tight">Business Hours</h3>
            <div className="px-4 py-2 border border-input bg-background rounded-md text-sm">
              Monday - Friday: 9:00 AM - 6:00 PM IST
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}