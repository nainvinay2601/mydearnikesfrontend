// lib/shopify/client.ts
const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing Shopify environment variables');
}

export async function queryShopify<T = any>(query: string, variables?: any): Promise<T> {
  console.log("====================================");
  console.log("URL:", SHOPIFY_STORE_URL);
  console.log("TOKEN:", SHOPIFY_ACCESS_TOKEN.substring(0, 10) + "...");
  console.log("====================================");

  const response = await fetch(SHOPIFY_STORE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  console.log("RESPONSE STATUS:", response.status);
  const text = await response.text();
  console.log("Response Text", text);

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.status} - ${text}`);
  }

  const data = JSON.parse(text);
  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
  }

  return data;
}
