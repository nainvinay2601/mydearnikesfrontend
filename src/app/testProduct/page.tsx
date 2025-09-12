// app/test-products/page.tsx
import ProductGrid from "@/components/major/ProductGrid";
import { getCollections, getProductsByCollection } from "@/lib/shopify/client";


export default async function TestProductsPage() {
  try {
    // Test 1: Fetch collections
    console.log("🔍 Fetching collections...");
    const collections = await getCollections();
    console.log("✅ Collections fetched:", collections.length);

    // Test 2: Get first collection's products
    if (collections.length > 0) {
      const firstCollection = collections[1];
      console.log("🔍 Fetching products for:", firstCollection.handle);
      
      const products = await getProductsByCollection(firstCollection.handle);
      console.log("✅ Products fetched:", products.length);

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              ✅ API Test Results
            </h2>
            <p className="text-green-700">
              Collections: {collections.length} | Products: {products.length}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Testing collection:{firstCollection.title}
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid
              products={products}
              title={`Testing: ${firstCollection.title}`}
              itemsPerPage={6}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this collection</p>
            </div>
          )}

          {/* Debug info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(
                {
                  collectionsCount: collections.length,
                  firstCollectionHandle: collections[0]?.handle,
                  firstProductTitle: products[0]?.title,
                  firstProductPrice: products[0]?.price,
                  firstProductImage: products[0]?.images[0]?.url
                }, 
                null, 
                2
              )}
            </pre>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="p-4 bg-yellow-100 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ No Collections Found
            </h2>
            <p className="text-yellow-700">
              Check your Shopify setup and environment variables.
            </p>
          </div>
        </div>
      );
    }

  } catch (error) {
    console.error("❌ Test failed:", error);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-100 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            ❌ API Test Failed
          </h2>
          <p className="text-red-700 mb-2">Error: {error.message}</p>
          <div className="text-sm text-red-600">
            <p>Check:</p>
            <ul className="list-disc ml-5 mt-1">
              <li>Environment variables in .env.local</li>
              <li>Shopify Storefront Access Token permissions</li>
              <li>Store domain format (without https://)</li>
              <li>Network connection</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}