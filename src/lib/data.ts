import categoriesRaw from "@/data/categories.json";
import productsRaw from "@/data/products.json";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string | null;
  categoryId: string;
  images: string[];
  stockStatus: "IN_STOCK" | "MADE_TO_ORDER" | "OUT_OF_STOCK";
  featured: boolean;
  specs: Record<string, string> | null;
  category: { id: string; name: string; slug: string };
}

const categories: Category[] = categoriesRaw as Category[];

type RawProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price?: string | null;
  categoryId: string;
  images: string[];
  stockStatus: string;
  featured: boolean;
  specs?: Record<string, string | undefined> | null;
};

const products: Product[] = (productsRaw as unknown as RawProduct[]).map((p) => {
  const cat = categories.find((c) => c.id === p.categoryId)!;
  const specs: Record<string, string> | null = p.specs
    ? Object.fromEntries(
        Object.entries(p.specs).filter(([, v]) => v !== undefined) as [string, string][]
      )
    : null;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price ?? null,
    categoryId: p.categoryId,
    images: p.images,
    stockStatus: p.stockStatus as Product["stockStatus"],
    featured: p.featured,
    specs,
    category: { id: cat.id, name: cat.name, slug: cat.slug },
  };
});

// Categories
export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Products
export function getProducts(opts?: {
  categorySlug?: string;
  search?: string;
  sort?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Product[] {
  let result = [...products];

  if (opts?.featuredOnly) {
    result = result.filter((p) => p.featured);
  }
  if (opts?.categorySlug) {
    result = result.filter((p) => p.category.slug === opts.categorySlug);
  }
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  if (opts?.sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (opts?.sort === "price-asc") {
    result.sort((a, b) => {
      const pa = parseFloat((a.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      const pb = parseFloat((b.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      return pa - pb;
    });
  } else if (opts?.sort === "price-desc") {
    result.sort((a, b) => {
      const pa = parseFloat((a.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      const pb = parseFloat((b.price ?? "0").replace(/[^0-9.]/g, "")) || 0;
      return pb - pa;
    });
  }

  if (opts?.limit) {
    result = result.slice(0, opts.limit);
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.categoryId === categoryId && p.id !== productId)
    .slice(0, limit);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
