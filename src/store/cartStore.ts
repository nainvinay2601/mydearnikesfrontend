

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductVariant, ShopifyMoney } from "@/types/shopify";

export interface CartItem {
  id: string; // Unique cart item ID (for local cart management)
  variantId: string; // Clean Shopify variant ID (for API calls)
  productId: string;
  productTitle: string;
  variantTitle: string;
  price: ShopifyMoney;
  quantity: number;
  image?: {
    url: string;
    altText: string | null;
  };
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (
    variant: ProductVariant,
    quantity: number,
    productTitle: string,
    productId: string
  ) => Promise<void>;

  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  clearError: () => void;
}

// Helper function to generate a unique ID for cart management
const generateCartItemId = (variant: ProductVariant): string => {
  const optionsKey = variant.selectedOptions
    .map(opt => `${opt.name}:${opt.value}`)
    .sort()
    .join('|');
  
  return `${variant.id}-${optionsKey}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      isLoading: false,
      error: null,

      addToCart: async (
        variant: ProductVariant,
        quantity: number,
        productTitle: string,
        productId: string
      ) => {
        try {
          set({ isLoading: true, error: null });
          const state = get();
          
          // Generate a unique ID for cart management
          const cartItemId = generateCartItemId(variant);
          
          const existingItem = state.items.find((item) => item.id === cartItemId);
          
          if (existingItem) {
            // Update existing item
            set({
              items: state.items.map((item) =>
                item.id === cartItemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              totalItems: state.totalItems + quantity,
              isLoading: false,
            });
          } else {
            // Add new item with separate IDs
            const newItem: CartItem = {
              id: cartItemId,                    // For cart management
              variantId: variant.id,             // Clean Shopify variant ID
              productId: productId,
              productTitle,
              variantTitle: variant.title,
              price: variant.price,
              quantity,
              image: variant.image,
              selectedOptions: variant.selectedOptions,
            };
            
            set({
              items: [...state.items, newItem],
              totalItems: state.totalItems + quantity,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to add to cart",
            isLoading: false,
          });
          throw error;
        }
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const state = get();
        if (quantity <= 0) {
          const removeItem = state.items.find((item) => item.id === itemId);
          set({
            items: state.items.filter((item) => item.id !== itemId),
            totalItems: state.totalItems - (removeItem?.quantity || 0),
          });
          return;
        }

        const oldItem = state.items.find((item) => item.id === itemId);
        const quantityDiff = quantity - (oldItem?.quantity || 0);

        set({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
          totalItems: state.totalItems + quantityDiff,
        });
      },

      removeItem: (itemId: string) => {
        get().updateQuantity(itemId, 0);
      },

      clearCart: () => {
        set({ items: [], totalItems: 0 });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + parseFloat(item.price.amount) * item.quantity;
        }, 0);
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);