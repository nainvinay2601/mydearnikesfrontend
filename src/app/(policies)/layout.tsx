"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const menuItems = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Contact", href: "/contact" },
];

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-15 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <motion.aside
        key={`sidebar-${pathname}`}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full lg:w-64 bg-white border-b lg:border-r border-gray-200 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <nav className="lg:p-[8px]">
          {/* <h2 className="text-lg font-semibold mb-4 hidden lg:block">Information</h2> */}
          <ul className="lg:space-y-1 hidden lg:block">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    className={`block px-[8px] py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        key={`content-${pathname}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex-1 p-6 lg:p-8"
      >
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
}