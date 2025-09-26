// import { NextResponse } from 'next/server';
// // import { queryShopify } from '@/lib/shopify/client';

// export async function GET() {
//   try {
//     const products = await queryShopify(`
//       query {
//         products(first: 10) {
//           edges {
//             node {
//               id
//               title
//             }
//           }
//         }
//       }
//     `);
//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
