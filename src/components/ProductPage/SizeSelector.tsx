"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RulerDimensionLine, X } from "lucide-react";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import { getSizeChartByProductType } from "@/lib/sizeCharts";
import Image from "next/image";
import measuringTapeIcon from "/public/images/measuring.png";
interface SizeSelectorProps {
  product: SimpleProduct;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({
  product,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) => {
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Extract sizes from variants and track availability
  const extractSizes = () => {
    // Fallback to default sizes if no variants
    if (!product.variants || product.variants.length === 0) {
      return { sizes: ["XS", "S", "M", "L", "XL", "XXL"], availability: {} };
    }

    const sizeData: {
      [key: string]: { available: boolean; variant: ProductVariant };
    } = {};

    // Process each variant to extract size options
    product.variants.forEach((variant) => {
      const sizeOption = variant.selectedOptions?.find((option) =>
        option.name.toLowerCase().includes("size")
      );

      if (sizeOption) {
        const size = sizeOption.value;
        if (!sizeData[size]) {
          sizeData[size] = { available: false, variant };
        }
        // Mark as available if any variant with this size is in stock
        if (variant.availableForSale) {
          sizeData[size].available = true;
        }
      }
    });

    const sizes = Object.keys(sizeData);
    const availability = Object.fromEntries(
      Object.entries(sizeData).map(([size, data]) => [size, data.available])
    );

    return sizes.length > 0
      ? { sizes, availability }
      : { sizes: ["XS", "S", "M", "L", "XL", "XXL"], availability: {} };
  };

  const { sizes, availability } = extractSizes();
  const sizeChart = getSizeChartByProductType(product.productType);

  const handleSizeClick = (size: string) => {
    // Don't allow selection of unavailable sizes
    if (availability[size] === false) return;
    onSizeChange(size);
  };

  return (
    <>
      <div className="flex items-center mt-3 px-[8px] w-full justify-between ">
        <div className="container flex items-center gap-3">
          <div className="heading text-[12px] mt-2 font-regular">Size</div>
          <div className="sizeContainer">
            {sizes.map((size) => {
              const isAvailable = availability[size] !== false;
              const isSelected = selectedSize === size;

              return (
                <Button
                  variant={"outline"}
                  key={size}
                  className={`rounded-sm text-[10px] px-3 py-2 mr-3 transition-all mt-2 ${
                    isSelected
                      ? "bg-black text-white"
                      : isAvailable
                      ? "bg-white text-black border-[0.25px] border-[#aeadad] border-opacity-25 hover:border-gray-400"
                      : "bg-gray-100 text-gray-400 border-[0.25px] border-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => handleSizeClick(size)}
                  disabled={!isAvailable}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
        {/* Size chart icon - click to show size guide modal */}
        <button
          onClick={() => setShowSizeChart(true)}
          className="sizeChart text-xs mt-2  hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Open size chart"
        >
          {/* <RulerDimensionLine size={18} strokeWidth={1} />  */}
          <Image
            src={measuringTapeIcon}
            alt="Size Guide"
            width={24}
            height={24}
            className="text-black" // Optional: if you want to apply color
          />
        </button>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setShowSizeChart(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-4">
            <div className="bg-white rounded-t-3xl md:rounded-lg w-full md:max-w-6xl max-h-[95vh] md:max-h-[90vh] flex flex-col pointer-events-auto shadow-2xl">
              {/* Modal Header - FIXED at top */}
              <div className="flex justify-between items-center border-b border-gray-200 p-4 md:p-6 flex-shrink-0">
                <h2 className="text-lg md:text-3xl font-bold text-gray-900">
                  {sizeChart.title}
                </h2>
                <button
                  onClick={() => setShowSizeChart(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close size chart"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - SCROLLABLE area */}
              <div className="overflow-y-auto flex-1 p-4 md:p-6">
                {/* Mobile: Single column, Tablet & Desktop: 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN - Size Chart Image */}
                  <div className="flex flex-col space-y-4">
                    <div className="relative w-full bg-red-100 rounded-lg">
                      {/* Mobile: Full screen width, large height */}
                      <div className="relative w-full min-h-[400px] md:min-h-[500px] md:aspect-auto object-cover">
                        <Image
                          src={sizeChart.image}
                          alt={sizeChart.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                          quality={100}
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Info sections */}
                  <div className="flex flex-col justify-between ">
                    {/* Current Product Sizes */}
                    <div className="w-full bg-gray-50 rounded-lg p-4 md:p-6">
                      <h3 className="text-base  font-semibold mb-3 font-inter tracking-tight">
                        Available Sizes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => {
                          const isAvailable = availability[size] !== false;
                          return (
                            <span
                              key={size}
                              className={`px-3 py-2 rounded border text-sm ${
                                isAvailable
                                  ? "bg-green-50 border-green-200 text-green-800"
                                  : "bg-gray-100 border-gray-300 text-gray-500"
                              }`}
                            >
                              {size}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    {/* Size Guide Tips */}
                    <div className="w-full bg-gray-50 rounded-lg p-4 md:p-6">
                      <h3 className="text-base font-inter tracking-tight  font-semibold mb-3">
                        How to Measure
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                          • Use a soft measuring tape for accurate measurements
                        </li>
                        <li>• Measure over light clothing for best results</li>
                        <li>• Keep the tape snug but not tight</li>
                        <li>• Refer to the chart for specific measurements</li>
                      </ul>
                    </div>

                    {/* Additional sizing info */}
                    <div className="w-full bg-blue-50 rounded-lg p-4 md:p-6">
                      <h3 className="text-base  font-semibold mb-2 text-blue-900 tracking-tight font-inter">
                        Need Help?
                      </h3>
                      <p className="text-sm text-blue-800">
                        If you&apos;re between sizes, we recommend sizing up for
                        a more comfortable fit.{" "}
                        <a
                          href="https://wa.me/919166668224"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-blue-600 font-medium transition-colors"
                        >
                          Contact Us
                        </a>{" "}
                        if you need personalized sizing advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer - FIXED at bottom */}
              <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50 flex-shrink-0">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowSizeChart(false)}
                    className="px-6 py-2 w-full md:w-auto"
                  >
                    Close Size Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SizeSelector;
