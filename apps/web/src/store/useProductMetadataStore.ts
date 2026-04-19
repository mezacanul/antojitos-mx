import { create } from "zustand";

export type ProductMetadata = {
  id: string;
  name: string;
  baseUnit?: string;
  description?: string;
  imageUrl?: string;
  variants: ProductVariantItem[];
  prices: ProductPriceItem[];
};

export type ProductVariantItem = {
  id: string;
  value: string;
};

export type ProductPriceItem = {
  id: string;
  price: number;
  amount: number;
};

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

type ProductMetadataState = {
  variants: ProductVariantItem[];
  prices: ProductPriceItem[];
  image: File | null;
  setImage: (image: File | null) => void;
  addVariant: () => void;
  updateVariant: (id: string, value: string) => void;
  removeVariant: (id: string) => void;
  addPrice: () => void;
  updatePrice: (
    id: string,
    patch: Partial<
      Pick<ProductPriceItem, "price" | "amount">
    >
  ) => void;
  removePrice: (id: string) => void;
  resetProductMetadata: () => void;
};

export const useProductMetadataStore =
  create<ProductMetadataState>((set) => ({
    variants: [],
    prices: [],
    image: null,
    setImage: (image) => set({ image }),
    addVariant: () =>
      set((s) => ({
        variants: [
          ...s.variants,
          { id: newId(), value: "" },
        ],
      })),
    updateVariant: (id, value) =>
      set((s) => ({
        variants: s.variants.map((v) =>
          v.id === id ? { ...v, value } : v
        ),
      })),
    removeVariant: (id) =>
      set((s) => ({
        variants: s.variants.filter((v) => v.id !== id),
      })),
    addPrice: () =>
      set((s) => ({
        prices: [
          ...s.prices,
          { id: newId(), price: 0, amount: 1 },
        ],
      })),
    updatePrice: (id, patch) =>
      set((s) => ({
        prices: s.prices.map((p) =>
          p.id === id ? { ...p, ...patch } : p
        ),
      })),
    removePrice: (id) =>
      set((s) => ({
        prices: s.prices.filter((p) => p.id !== id),
      })),
    resetProductMetadata: () =>
      set({ variants: [], prices: [], image: null }),
  }));
