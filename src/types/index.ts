export type StockStatus = "IN_STOCK" | "MADE_TO_ORDER" | "OUT_OF_STOCK";
export type EnquiryStatus = "NEW" | "CONTACTED" | "CLOSED";

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  images: string[];
  stockStatus: StockStatus;
  featured: boolean;
  specs: Record<string, string> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnquiryWithProduct {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  productId: string | null;
  product: { id: string; name: string; slug: string } | null;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}
