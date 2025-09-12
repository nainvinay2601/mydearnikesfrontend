// app/simple-test/page.tsx
import { getCollections } from "@/lib/shopify/client";

export default async function SimpleTestPage() {
  console.log("🚀 Page component starting...");
  
  try {
    console.log("🔍 About to fetch collections...");
    const collections = await getCollections();
    console.log("✅ Collections received:", collections);

    return (
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-black mb-4">Simple Test Page</h1>
        
        <div className="bg-green-100 p-4 rounded mb-4">
          <h2 className="text-green-800 font-semibold">Success!</h2>
          <p className="text-green-700">Found {collections.length} collections</p>
        </div>

        <div className="space-y-2">
          {collections.map((collection, index) => (
            <div key={collection.id} className="bg-gray-100 p-3 rounded">
              <p className="text-black">
                {index + 1}. {collection.title} (Handle: {collection.handle})
              </p>
            </div>
          ))}
        </div>
      </div>
    );
    
  } catch (error) {
    console.error("❌ Error in component:", error);
    
    return (
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Error Page</h1>
        <div className="bg-red-100 p-4 rounded mt-4">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      </div>
    );
  }
}