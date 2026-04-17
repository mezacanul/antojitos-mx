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

// type BusinessForm = {
//   name: string;
//   description: string;
//   image: string;
// };

type TenantUserForm = {
  names: string;
  paternal_surname: string;
  maternal_surname: string;
  email: string;
  phone: string;
  password: string;
};

type BranchForm = {
  name: string;
  address: string;
  image: string;
};

export type {
  Business,
  Branch,
  Product,
  TenantUserForm,
  BranchForm,
};
