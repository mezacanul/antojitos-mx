type Business = {
  id: string;
  name: string;
  description: string;
  // image: string;
  created_at: string;
  updated_at: string;
};

type Branch = {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
};

type Product = {
  id: string;
  name: string;
  // price: number;
  created_at: string;
  updated_at: string;
};

export type { Business, Branch, Product };
