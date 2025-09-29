"use client";

import { Ellipsis, Instagram, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative bg-black text-white flex justify-between items-center px-2 py-2 text-xs">
        {/* Left */}
        <div>©{new Date().getFullYear()} MYDEARNIKES</div>

        <div className="socials flex items-center justify-between gap-2 ">
          <div className="instagram">
            <Instagram size={16} />
          </div>
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="p-1"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X className="w-4 h-4" />
              ) : (
                <Ellipsis className="w-4 h-4" />
              )}
            </button>

            {open && (
              <nav
                className="
                absolute bottom-full mb-1 left-0 right-0 mx-auto
                w-full bg-white text-black rounded shadow-lg z-20
                text-xs pt-4 rounded-t-3xl
              "
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 text-xl font-semibold tracking-tight hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
