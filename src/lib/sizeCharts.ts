// // export const SIZE_CHARTS = {
// //   // Map your specific product types to size charts

// //   // Default fallback
// //   default: {
// //     image:
// //       "https://mydearnikes.com/cdn/shop/files/1745035590sizechart_3ee6ea36-5b5f-4bea-95d1-20021bc032ae.png?v=1760004552&width=3840",
// //     title: "Size Guide",
// //   },
// // } as const;

// // export type ProductCategory = keyof typeof SIZE_CHARTS;

// // export const getSizeChartByProductType = (productType: string) => {
// //   if (!productType) return SIZE_CHARTS.default;

// //   // Normalize the product type string
// //   const normalizedType = productType
// //     .toLowerCase()
// //     .replace(/\s+/g, "") as ProductCategory;
// //   return SIZE_CHARTS[normalizedType] || SIZE_CHARTS.default;
// // };

// export const SIZE_CHARTS = {
//   "oversized": {
//     image:
//       "/images/overChart.webp",


//     title: "Oversized Tees Size Guide",
//   },
//   "fitted-tees": {
//     image:
//       "/images/fitChart.webp",
//     title: "Fitted Tees Size Guide",
//   },
//   "baby-tees": {
//     image:
//       "/images/bTChart.webp",
//     title: "Baby Tees Size Guide",
//   },
//   hoodies: {
//     image:
//       "/images/hoodChart.webp",
//     title: "Hoodies Size Guide",
//   },
//   bottoms: {
//     image:
//       "https://mydearnikes.com/cdn/shop/files/1745035590sizechart_3ee6ea36-5b5f-4bea-95d1-20021bc032ae.png?v=1760004552&width=3840",
//     title: "Bottoms Size Guide",
//   },
//   default: {
//     image:
//       "/images/fitChart.webp",
//     title: "Size Guide",
//   },
// } as const;

// export type ProductCategory = keyof typeof SIZE_CHARTS;

// export const getSizeChartByProductType = (productType: string): { image: string; title: string } => {
//   if (!productType) return SIZE_CHARTS.default;

//   // Normalize and match product type
//   const normalized = productType.toLowerCase();
  
//   if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
//   if (normalized.includes("fitted") || normalized.includes("regular")) return SIZE_CHARTS["fitted-tees"];
//   if (normalized.includes("baby")) return SIZE_CHARTS["baby-tees"];
//   if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
//   if (normalized.includes("bottom") || normalized.includes("pant") || normalized.includes("short")) return SIZE_CHARTS.bottoms;
  
//   return SIZE_CHARTS.default;
// };


export const SIZE_CHARTS = {
  "oversized": {
    image: "/images/overChart.webp",
    title: "Oversized Tees Size Guide",
  },
  "fitted-tees": {
    image: "/images/fitChart.webp",
    title: "Fitted Tees Size Guide",
  },
  "baby-tees": {
    image: "/images/bTChart.webp",
    title: "Baby Tees Size Guide",
  },
  "hoodies": {
    image: "/images/hoodChart.webp",
    title: "Hoodies Size Guide",
  },
  "sweatshirts": {
    image: "/images/sweatSize.webp",
    title: "Sweatshirts Size Guide",
  },
  "sweatpants": {
    image: "/images/sweatpantSize.webp",
    title: "Sweatpants Size Guide",
  },
  "default": {
    image: "/images/fitChart.webp",
    title: "Size Guide",
  },
} as const;

export type ProductCategory = keyof typeof SIZE_CHARTS;

export const getSizeChartByProductType = (productType: string): { image: string; title: string } => {
  if (!productType) return SIZE_CHARTS.default;

  const normalized = productType.toLowerCase();
  
  if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
  if (normalized.includes("fitted") || normalized.includes("regular")) return SIZE_CHARTS["fitted-tees"];
  if (normalized.includes("baby")) return SIZE_CHARTS["baby-tees"];
  if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
  if (normalized.includes("sweatshirt")) return SIZE_CHARTS.sweatshirts;
  if (normalized.includes("sweatpant") || normalized.includes("sweatpant")) return SIZE_CHARTS.sweatpants;
  
  return SIZE_CHARTS.default;
};