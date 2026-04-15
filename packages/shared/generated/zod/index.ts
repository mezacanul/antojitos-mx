import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.any(),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const BusinessScalarFieldEnumSchema = z.enum(['name','slug','rfc','id','createdAt','updatedAt']);

export const TenantScalarFieldEnumSchema = z.enum(['names','maternal_surname','paternal_surname','rfc','id','createdAt','updatedAt','businessId']);

export const BranchScalarFieldEnumSchema = z.enum(['name','address','id','createdAt','updatedAt','businessId']);

export const UserScalarFieldEnumSchema = z.enum(['id','role','createdAt','updatedAt','email','names','maternal_surname','paternal_surname','tenantId','branchId']);

export const ProductScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','price','imageUrl','productCategoryId','businessId','branchId','isDeleted']);

export const ReviewsScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','rating','comment','branchId','userId']);

export const FavoritesScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','productId','branchId','userId']);

export const BusinessCategoryScalarFieldEnumSchema = z.enum(['id','name','description']);

export const ProductCategoryScalarFieldEnumSchema = z.enum(['id','name','description','businessId']);

export const PriceScalarFieldEnumSchema = z.enum(['id','type','amount','quantity','productId']);

export const CurrencyScalarFieldEnumSchema = z.enum(['id','code','active']);

export const ExchangeRateScalarFieldEnumSchema = z.enum(['id','rate','updatedAt','currencyId','businessId','branchId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['SYSTEM_ADMIN','TENANT_OWNER','BRANCH_MANAGER','GUEST']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const FavoriteTypeSchema = z.enum(['BRANCH','PRODUCT']);

export type FavoriteTypeType = `${z.infer<typeof FavoriteTypeSchema>}`

export const PriceTypeSchema = z.enum(['pza','gr','kg','ml','lt','lb','floz','oz']);

export type PriceTypeType = `${z.infer<typeof PriceTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BUSINESS SCHEMA
/////////////////////////////////////////

export const BusinessSchema = z.object({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().nullable(),
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Business = z.infer<typeof BusinessSchema>

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().nullable(),
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  businessId: z.string(),
})

export type Tenant = z.infer<typeof TenantSchema>

/////////////////////////////////////////
// BRANCH SCHEMA
/////////////////////////////////////////

export const BranchSchema = z.object({
  name: z.string(),
  address: z.string().nullable(),
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  businessId: z.string(),
})

export type Branch = z.infer<typeof BranchSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().nullable(),
  branchId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.instanceof(Prisma.Decimal, { message: "Field 'price' must be a Decimal. Location: ['Models', 'Product']"}),
  imageUrl: z.string().nullable(),
  productCategoryId: z.string().nullable(),
  businessId: z.string(),
  branchId: z.string().nullable(),
  isDeleted: z.boolean(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// REVIEWS SCHEMA
/////////////////////////////////////////

export const ReviewsSchema = z.object({
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  rating: z.number().int(),
  comment: z.string().nullable(),
  branchId: z.string(),
  userId: z.string(),
})

export type Reviews = z.infer<typeof ReviewsSchema>

/////////////////////////////////////////
// FAVORITES SCHEMA
/////////////////////////////////////////

export const FavoritesSchema = z.object({
  type: FavoriteTypeSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  productId: z.string().nullable(),
  branchId: z.string().nullable(),
  userId: z.string(),
})

export type Favorites = z.infer<typeof FavoritesSchema>

/////////////////////////////////////////
// BUSINESS CATEGORY SCHEMA
/////////////////////////////////////////

export const BusinessCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
})

export type BusinessCategory = z.infer<typeof BusinessCategorySchema>

/////////////////////////////////////////
// PRODUCT CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductCategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  businessId: z.string(),
})

export type ProductCategory = z.infer<typeof ProductCategorySchema>

/////////////////////////////////////////
// PRICE SCHEMA
/////////////////////////////////////////

export const PriceSchema = z.object({
  type: PriceTypeSchema,
  id: z.uuid(),
  amount: z.instanceof(Prisma.Decimal, { message: "Field 'amount' must be a Decimal. Location: ['Models', 'Price']"}),
  quantity: z.number(),
  productId: z.string(),
})

export type Price = z.infer<typeof PriceSchema>

/////////////////////////////////////////
// CURRENCY SCHEMA
/////////////////////////////////////////

export const CurrencySchema = z.object({
  id: z.uuid(),
  code: z.string(),
  active: z.boolean(),
})

export type Currency = z.infer<typeof CurrencySchema>

/////////////////////////////////////////
// EXCHANGE RATE SCHEMA
/////////////////////////////////////////

export const ExchangeRateSchema = z.object({
  id: z.uuid(),
  rate: z.instanceof(Prisma.Decimal, { message: "Field 'rate' must be a Decimal. Location: ['Models', 'ExchangeRate']"}),
  updatedAt: z.coerce.date(),
  currencyId: z.string(),
  businessId: z.string(),
  branchId: z.string().nullable(),
})

export type ExchangeRate = z.infer<typeof ExchangeRateSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BUSINESS
//------------------------------------------------------

export const BusinessIncludeSchema: z.ZodType<Prisma.BusinessInclude> = z.object({
  tenants: z.union([z.boolean(),z.lazy(() => TenantFindManyArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  productCategories: z.union([z.boolean(),z.lazy(() => ProductCategoryFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => BusinessCategoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusinessCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BusinessArgsSchema: z.ZodType<Prisma.BusinessDefaultArgs> = z.object({
  select: z.lazy(() => BusinessSelectSchema).optional(),
  include: z.lazy(() => BusinessIncludeSchema).optional(),
}).strict();

export const BusinessCountOutputTypeArgsSchema: z.ZodType<Prisma.BusinessCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BusinessCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BusinessCountOutputTypeSelectSchema: z.ZodType<Prisma.BusinessCountOutputTypeSelect> = z.object({
  tenants: z.boolean().optional(),
  branches: z.boolean().optional(),
  products: z.boolean().optional(),
  productCategories: z.boolean().optional(),
  exchangeRates: z.boolean().optional(),
  categories: z.boolean().optional(),
}).strict();

export const BusinessSelectSchema: z.ZodType<Prisma.BusinessSelect> = z.object({
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  rfc: z.boolean().optional(),
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tenants: z.union([z.boolean(),z.lazy(() => TenantFindManyArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  productCategories: z.union([z.boolean(),z.lazy(() => ProductCategoryFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => BusinessCategoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusinessCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TENANT
//------------------------------------------------------

export const TenantIncludeSchema: z.ZodType<Prisma.TenantInclude> = z.object({
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TenantCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const TenantArgsSchema: z.ZodType<Prisma.TenantDefaultArgs> = z.object({
  select: z.lazy(() => TenantSelectSchema).optional(),
  include: z.lazy(() => TenantIncludeSchema).optional(),
}).strict();

export const TenantCountOutputTypeArgsSchema: z.ZodType<Prisma.TenantCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TenantCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TenantCountOutputTypeSelectSchema: z.ZodType<Prisma.TenantCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const TenantSelectSchema: z.ZodType<Prisma.TenantSelect> = z.object({
  names: z.boolean().optional(),
  maternal_surname: z.boolean().optional(),
  paternal_surname: z.boolean().optional(),
  rfc: z.boolean().optional(),
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  businessId: z.boolean().optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TenantCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BRANCH
//------------------------------------------------------

export const BranchIncludeSchema: z.ZodType<Prisma.BranchInclude> = z.object({
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BranchCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BranchArgsSchema: z.ZodType<Prisma.BranchDefaultArgs> = z.object({
  select: z.lazy(() => BranchSelectSchema).optional(),
  include: z.lazy(() => BranchIncludeSchema).optional(),
}).strict();

export const BranchCountOutputTypeArgsSchema: z.ZodType<Prisma.BranchCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BranchCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BranchCountOutputTypeSelectSchema: z.ZodType<Prisma.BranchCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  products: z.boolean().optional(),
  reviews: z.boolean().optional(),
  favorites: z.boolean().optional(),
  exchangeRates: z.boolean().optional(),
}).strict();

export const BranchSelectSchema: z.ZodType<Prisma.BranchSelect> = z.object({
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  businessId: z.boolean().optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BranchCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  tenant: z.union([z.boolean(),z.lazy(() => TenantArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  reviews: z.boolean().optional(),
  favorites: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  email: z.boolean().optional(),
  names: z.boolean().optional(),
  maternal_surname: z.boolean().optional(),
  paternal_surname: z.boolean().optional(),
  tenantId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  tenant: z.union([z.boolean(),z.lazy(() => TenantArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  productCategory: z.union([z.boolean(),z.lazy(() => ProductCategoryArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  favorites: z.boolean().optional(),
  prices: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  productCategoryId: z.boolean().optional(),
  businessId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  productCategory: z.union([z.boolean(),z.lazy(() => ProductCategoryArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVIEWS
//------------------------------------------------------

export const ReviewsIncludeSchema: z.ZodType<Prisma.ReviewsInclude> = z.object({
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ReviewsArgsSchema: z.ZodType<Prisma.ReviewsDefaultArgs> = z.object({
  select: z.lazy(() => ReviewsSelectSchema).optional(),
  include: z.lazy(() => ReviewsIncludeSchema).optional(),
}).strict();

export const ReviewsSelectSchema: z.ZodType<Prisma.ReviewsSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  branchId: z.boolean().optional(),
  userId: z.boolean().optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// FAVORITES
//------------------------------------------------------

export const FavoritesIncludeSchema: z.ZodType<Prisma.FavoritesInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const FavoritesArgsSchema: z.ZodType<Prisma.FavoritesDefaultArgs> = z.object({
  select: z.lazy(() => FavoritesSelectSchema).optional(),
  include: z.lazy(() => FavoritesIncludeSchema).optional(),
}).strict();

export const FavoritesSelectSchema: z.ZodType<Prisma.FavoritesSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  productId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  userId: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// BUSINESS CATEGORY
//------------------------------------------------------

export const BusinessCategoryIncludeSchema: z.ZodType<Prisma.BusinessCategoryInclude> = z.object({
  businesses: z.union([z.boolean(),z.lazy(() => BusinessFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusinessCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const BusinessCategoryArgsSchema: z.ZodType<Prisma.BusinessCategoryDefaultArgs> = z.object({
  select: z.lazy(() => BusinessCategorySelectSchema).optional(),
  include: z.lazy(() => BusinessCategoryIncludeSchema).optional(),
}).strict();

export const BusinessCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.BusinessCategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BusinessCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BusinessCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.BusinessCategoryCountOutputTypeSelect> = z.object({
  businesses: z.boolean().optional(),
}).strict();

export const BusinessCategorySelectSchema: z.ZodType<Prisma.BusinessCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  businesses: z.union([z.boolean(),z.lazy(() => BusinessFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BusinessCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT CATEGORY
//------------------------------------------------------

export const ProductCategoryIncludeSchema: z.ZodType<Prisma.ProductCategoryInclude> = z.object({
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ProductCategoryArgsSchema: z.ZodType<Prisma.ProductCategoryDefaultArgs> = z.object({
  select: z.lazy(() => ProductCategorySelectSchema).optional(),
  include: z.lazy(() => ProductCategoryIncludeSchema).optional(),
}).strict();

export const ProductCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCategoryCountOutputTypeSelect> = z.object({
  products: z.boolean().optional(),
}).strict();

export const ProductCategorySelectSchema: z.ZodType<Prisma.ProductCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  businessId: z.boolean().optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRICE
//------------------------------------------------------

export const PriceIncludeSchema: z.ZodType<Prisma.PriceInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict();

export const PriceArgsSchema: z.ZodType<Prisma.PriceDefaultArgs> = z.object({
  select: z.lazy(() => PriceSelectSchema).optional(),
  include: z.lazy(() => PriceIncludeSchema).optional(),
}).strict();

export const PriceSelectSchema: z.ZodType<Prisma.PriceSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  amount: z.boolean().optional(),
  quantity: z.boolean().optional(),
  productId: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// CURRENCY
//------------------------------------------------------

export const CurrencyIncludeSchema: z.ZodType<Prisma.CurrencyInclude> = z.object({
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CurrencyArgsSchema: z.ZodType<Prisma.CurrencyDefaultArgs> = z.object({
  select: z.lazy(() => CurrencySelectSchema).optional(),
  include: z.lazy(() => CurrencyIncludeSchema).optional(),
}).strict();

export const CurrencyCountOutputTypeArgsSchema: z.ZodType<Prisma.CurrencyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CurrencyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CurrencyCountOutputTypeSelectSchema: z.ZodType<Prisma.CurrencyCountOutputTypeSelect> = z.object({
  exchangeRates: z.boolean().optional(),
}).strict();

export const CurrencySelectSchema: z.ZodType<Prisma.CurrencySelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  active: z.boolean().optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EXCHANGE RATE
//------------------------------------------------------

export const ExchangeRateIncludeSchema: z.ZodType<Prisma.ExchangeRateInclude> = z.object({
  currency: z.union([z.boolean(),z.lazy(() => CurrencyArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
}).strict();

export const ExchangeRateArgsSchema: z.ZodType<Prisma.ExchangeRateDefaultArgs> = z.object({
  select: z.lazy(() => ExchangeRateSelectSchema).optional(),
  include: z.lazy(() => ExchangeRateIncludeSchema).optional(),
}).strict();

export const ExchangeRateSelectSchema: z.ZodType<Prisma.ExchangeRateSelect> = z.object({
  id: z.boolean().optional(),
  rate: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  currencyId: z.boolean().optional(),
  businessId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  currency: z.union([z.boolean(),z.lazy(() => CurrencyArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BusinessWhereInputSchema: z.ZodType<Prisma.BusinessWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  tenants: z.lazy(() => TenantListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  categories: z.lazy(() => BusinessCategoryListRelationFilterSchema).optional(),
});

export const BusinessOrderByWithRelationInputSchema: z.ZodType<Prisma.BusinessOrderByWithRelationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tenants: z.lazy(() => TenantOrderByRelationAggregateInputSchema).optional(),
  branches: z.lazy(() => BranchOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryOrderByRelationAggregateInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateOrderByRelationAggregateInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryOrderByRelationAggregateInputSchema).optional(),
});

export const BusinessWhereUniqueInputSchema: z.ZodType<Prisma.BusinessWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    slug: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    slug: z.string(),
  }),
  z.object({
    id: z.cuid(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    slug: z.string(),
    rfc: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
  z.object({
    rfc: z.string(),
  }),
])
.and(z.strictObject({
  slug: z.string().optional(),
  rfc: z.string().optional(),
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  tenants: z.lazy(() => TenantListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  categories: z.lazy(() => BusinessCategoryListRelationFilterSchema).optional(),
}));

export const BusinessOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusinessOrderByWithAggregationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BusinessCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BusinessMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BusinessMinOrderByAggregateInputSchema).optional(),
});

export const BusinessScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BusinessScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const TenantWhereInputSchema: z.ZodType<Prisma.TenantWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TenantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
});

export const TenantOrderByWithRelationInputSchema: z.ZodType<Prisma.TenantOrderByWithRelationInput> = z.strictObject({
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
});

export const TenantWhereUniqueInputSchema: z.ZodType<Prisma.TenantWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    rfc: z.string(),
  }),
])
.and(z.strictObject({
  rfc: z.string().optional(),
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TenantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
}));

export const TenantOrderByWithAggregationInputSchema: z.ZodType<Prisma.TenantOrderByWithAggregationInput> = z.strictObject({
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TenantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TenantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TenantMinOrderByAggregateInputSchema).optional(),
});

export const TenantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TenantScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TenantScalarWhereWithAggregatesInputSchema), z.lazy(() => TenantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TenantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TenantScalarWhereWithAggregatesInputSchema), z.lazy(() => TenantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  names: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const BranchWhereInputSchema: z.ZodType<Prisma.BranchWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BranchWhereInputSchema), z.lazy(() => BranchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BranchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BranchWhereInputSchema), z.lazy(() => BranchWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
});

export const BranchOrderByWithRelationInputSchema: z.ZodType<Prisma.BranchOrderByWithRelationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewsOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateOrderByRelationAggregateInputSchema).optional(),
});

export const BranchWhereUniqueInputSchema: z.ZodType<Prisma.BranchWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.strictObject({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => BranchWhereInputSchema), z.lazy(() => BranchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BranchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BranchWhereInputSchema), z.lazy(() => BranchWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
}));

export const BranchOrderByWithAggregationInputSchema: z.ZodType<Prisma.BranchOrderByWithAggregationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BranchCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BranchMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BranchMinOrderByAggregateInputSchema).optional(),
});

export const BranchScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BranchScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BranchScalarWhereWithAggregatesInputSchema), z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BranchScalarWhereWithAggregatesInputSchema), z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenant: z.union([ z.lazy(() => TenantNullableScalarRelationFilterSchema), z.lazy(() => TenantWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  reviews: z.lazy(() => ReviewsOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenant: z.union([ z.lazy(() => TenantNullableScalarRelationFilterSchema), z.lazy(() => TenantWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  names: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  tenantId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productCategory: z.union([ z.lazy(() => ProductCategoryNullableScalarRelationFilterSchema), z.lazy(() => ProductCategoryWhereInputSchema) ]).optional().nullable(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
});

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  productCategoryId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  productCategory: z.lazy(() => ProductCategoryOrderByWithRelationInputSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
  prices: z.lazy(() => PriceOrderByRelationAggregateInputSchema).optional(),
});

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.strictObject({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productCategory: z.union([ z.lazy(() => ProductCategoryNullableScalarRelationFilterSchema), z.lazy(() => ProductCategoryWhereInputSchema) ]).optional().nullable(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
}));

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  productCategoryId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional(),
});

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
});

export const ReviewsWhereInputSchema: z.ZodType<Prisma.ReviewsWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReviewsWhereInputSchema), z.lazy(() => ReviewsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewsWhereInputSchema), z.lazy(() => ReviewsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branch: z.union([ z.lazy(() => BranchScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const ReviewsOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewsOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const ReviewsWhereUniqueInputSchema: z.ZodType<Prisma.ReviewsWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.strictObject({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => ReviewsWhereInputSchema), z.lazy(() => ReviewsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewsWhereInputSchema), z.lazy(() => ReviewsWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branch: z.union([ z.lazy(() => BranchScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const ReviewsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewsOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReviewsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReviewsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReviewsSumOrderByAggregateInputSchema).optional(),
});

export const ReviewsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewsScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReviewsScalarWhereWithAggregatesInputSchema), z.lazy(() => ReviewsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewsScalarWhereWithAggregatesInputSchema), z.lazy(() => ReviewsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  rating: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const FavoritesWhereInputSchema: z.ZodType<Prisma.FavoritesWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavoritesWhereInputSchema), z.lazy(() => FavoritesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoritesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoritesWhereInputSchema), z.lazy(() => FavoritesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumFavoriteTypeFilterSchema), z.lazy(() => FavoriteTypeSchema) ]).optional(),
  productId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductNullableScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const FavoritesOrderByWithRelationInputSchema: z.ZodType<Prisma.FavoritesOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  productId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const FavoritesWhereUniqueInputSchema: z.ZodType<Prisma.FavoritesWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.strictObject({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => FavoritesWhereInputSchema), z.lazy(() => FavoritesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoritesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoritesWhereInputSchema), z.lazy(() => FavoritesWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumFavoriteTypeFilterSchema), z.lazy(() => FavoriteTypeSchema) ]).optional(),
  productId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductNullableScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const FavoritesOrderByWithAggregationInputSchema: z.ZodType<Prisma.FavoritesOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  productId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FavoritesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FavoritesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FavoritesMinOrderByAggregateInputSchema).optional(),
});

export const FavoritesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FavoritesScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavoritesScalarWhereWithAggregatesInputSchema), z.lazy(() => FavoritesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoritesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoritesScalarWhereWithAggregatesInputSchema), z.lazy(() => FavoritesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumFavoriteTypeWithAggregatesFilterSchema), z.lazy(() => FavoriteTypeSchema) ]).optional(),
  productId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const BusinessCategoryWhereInputSchema: z.ZodType<Prisma.BusinessCategoryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessCategoryWhereInputSchema), z.lazy(() => BusinessCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessCategoryWhereInputSchema), z.lazy(() => BusinessCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businesses: z.lazy(() => BusinessListRelationFilterSchema).optional(),
});

export const BusinessCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.BusinessCategoryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businesses: z.lazy(() => BusinessOrderByRelationAggregateInputSchema).optional(),
});

export const BusinessCategoryWhereUniqueInputSchema: z.ZodType<Prisma.BusinessCategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => BusinessCategoryWhereInputSchema), z.lazy(() => BusinessCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessCategoryWhereInputSchema), z.lazy(() => BusinessCategoryWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businesses: z.lazy(() => BusinessListRelationFilterSchema).optional(),
}));

export const BusinessCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusinessCategoryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => BusinessCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BusinessCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BusinessCategoryMinOrderByAggregateInputSchema).optional(),
});

export const BusinessCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BusinessCategoryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const ProductCategoryWhereInputSchema: z.ZodType<Prisma.ProductCategoryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductCategoryWhereInputSchema), z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryWhereInputSchema), z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
});

export const ProductCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductCategoryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
});

export const ProductCategoryWhereUniqueInputSchema: z.ZodType<Prisma.ProductCategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    name_businessId: z.lazy(() => ProductCategoryNameBusinessIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    name_businessId: z.lazy(() => ProductCategoryNameBusinessIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  name_businessId: z.lazy(() => ProductCategoryNameBusinessIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProductCategoryWhereInputSchema), z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryWhereInputSchema), z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
}));

export const ProductCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductCategoryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductCategoryMinOrderByAggregateInputSchema).optional(),
});

export const ProductCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductCategoryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const PriceWhereInputSchema: z.ZodType<Prisma.PriceWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPriceTypeFilterSchema), z.lazy(() => PriceTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
});

export const PriceOrderByWithRelationInputSchema: z.ZodType<Prisma.PriceOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
});

export const PriceWhereUniqueInputSchema: z.ZodType<Prisma.PriceWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumPriceTypeFilterSchema), z.lazy(() => PriceTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
}));

export const PriceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriceOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PriceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PriceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PriceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PriceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PriceSumOrderByAggregateInputSchema).optional(),
});

export const PriceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PriceScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema), z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema), z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPriceTypeWithAggregatesFilterSchema), z.lazy(() => PriceTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CurrencyWhereInputSchema: z.ZodType<Prisma.CurrencyWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema), z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema), z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
});

export const CurrencyOrderByWithRelationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateOrderByRelationAggregateInputSchema).optional(),
});

export const CurrencyWhereUniqueInputSchema: z.ZodType<Prisma.CurrencyWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    code: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    code: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  code: z.string().optional(),
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema), z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema), z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
}));

export const CurrencyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CurrencyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CurrencyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CurrencyMinOrderByAggregateInputSchema).optional(),
});

export const CurrencyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CurrencyScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema), z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema), z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
});

export const ExchangeRateWhereInputSchema: z.ZodType<Prisma.ExchangeRateWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ExchangeRateWhereInputSchema), z.lazy(() => ExchangeRateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeRateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeRateWhereInputSchema), z.lazy(() => ExchangeRateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rate: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  currencyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => CurrencyScalarRelationFilterSchema), z.lazy(() => CurrencyWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
});

export const ExchangeRateOrderByWithRelationInputSchema: z.ZodType<Prisma.ExchangeRateOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  currency: z.lazy(() => CurrencyOrderByWithRelationInputSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
});

export const ExchangeRateWhereUniqueInputSchema: z.ZodType<Prisma.ExchangeRateWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    currencyId_businessId_branchId: z.lazy(() => ExchangeRateCurrencyIdBusinessIdBranchIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    currencyId_businessId_branchId: z.lazy(() => ExchangeRateCurrencyIdBusinessIdBranchIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  currencyId_businessId_branchId: z.lazy(() => ExchangeRateCurrencyIdBusinessIdBranchIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ExchangeRateWhereInputSchema), z.lazy(() => ExchangeRateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeRateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeRateWhereInputSchema), z.lazy(() => ExchangeRateWhereInputSchema).array() ]).optional(),
  rate: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  currencyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => CurrencyScalarRelationFilterSchema), z.lazy(() => CurrencyWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
}));

export const ExchangeRateOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExchangeRateOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ExchangeRateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExchangeRateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExchangeRateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExchangeRateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExchangeRateSumOrderByAggregateInputSchema).optional(),
});

export const ExchangeRateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExchangeRateScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ExchangeRateScalarWhereWithAggregatesInputSchema), z.lazy(() => ExchangeRateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeRateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeRateScalarWhereWithAggregatesInputSchema), z.lazy(() => ExchangeRateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  rate: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  currencyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const BusinessCreateInputSchema: z.ZodType<Prisma.BusinessCreateInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUpdateInputSchema: z.ZodType<Prisma.BusinessUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessCreateManyInputSchema: z.ZodType<Prisma.BusinessCreateManyInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BusinessUpdateManyMutationInputSchema: z.ZodType<Prisma.BusinessUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TenantCreateInputSchema: z.ZodType<Prisma.TenantCreateInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutTenantsInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutTenantInputSchema).optional(),
});

export const TenantUncheckedCreateInputSchema: z.ZodType<Prisma.TenantUncheckedCreateInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTenantInputSchema).optional(),
});

export const TenantUpdateInputSchema: z.ZodType<Prisma.TenantUpdateInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutTenantsNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTenantNestedInputSchema).optional(),
});

export const TenantUncheckedUpdateInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTenantNestedInputSchema).optional(),
});

export const TenantCreateManyInputSchema: z.ZodType<Prisma.TenantCreateManyInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
});

export const TenantUpdateManyMutationInputSchema: z.ZodType<Prisma.TenantUpdateManyMutationInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TenantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateManyInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchCreateInputSchema: z.ZodType<Prisma.BranchCreateInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateInputSchema: z.ZodType<Prisma.BranchUncheckedCreateInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUpdateInputSchema: z.ZodType<Prisma.BranchUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchCreateManyInputSchema: z.ZodType<Prisma.BranchCreateManyInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
});

export const BranchUpdateManyMutationInputSchema: z.ZodType<Prisma.BranchUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema).optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsCreateInputSchema: z.ZodType<Prisma.ReviewsCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutReviewsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
});

export const ReviewsUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewsUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branchId: z.string(),
  userId: z.string(),
});

export const ReviewsUpdateInputSchema: z.ZodType<Prisma.ReviewsUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branch: z.lazy(() => BranchUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
});

export const ReviewsUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsCreateManyInputSchema: z.ZodType<Prisma.ReviewsCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branchId: z.string(),
  userId: z.string(),
});

export const ReviewsUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewsUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ReviewsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesCreateInputSchema: z.ZodType<Prisma.FavoritesCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutFavoritesInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutFavoritesInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFavoritesInputSchema),
});

export const FavoritesUncheckedCreateInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  userId: z.string(),
});

export const FavoritesUpdateInputSchema: z.ZodType<Prisma.FavoritesUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutFavoritesNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutFavoritesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional(),
});

export const FavoritesUncheckedUpdateInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesCreateManyInputSchema: z.ZodType<Prisma.FavoritesCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  userId: z.string(),
});

export const FavoritesUpdateManyMutationInputSchema: z.ZodType<Prisma.FavoritesUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessCategoryCreateInputSchema: z.ZodType<Prisma.BusinessCategoryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  businesses: z.lazy(() => BusinessCreateNestedManyWithoutCategoriesInputSchema).optional(),
});

export const BusinessCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  businesses: z.lazy(() => BusinessUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
});

export const BusinessCategoryUpdateInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businesses: z.lazy(() => BusinessUpdateManyWithoutCategoriesNestedInputSchema).optional(),
});

export const BusinessCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businesses: z.lazy(() => BusinessUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
});

export const BusinessCategoryCreateManyInputSchema: z.ZodType<Prisma.BusinessCategoryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const BusinessCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ProductCategoryCreateInputSchema: z.ZodType<Prisma.ProductCategoryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductCategoriesInputSchema),
  products: z.lazy(() => ProductCreateNestedManyWithoutProductCategoryInputSchema).optional(),
});

export const ProductCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  businessId: z.string(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutProductCategoryInputSchema).optional(),
});

export const ProductCategoryUpdateInputSchema: z.ZodType<Prisma.ProductCategoryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductCategoriesNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutProductCategoryNestedInputSchema).optional(),
});

export const ProductCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutProductCategoryNestedInputSchema).optional(),
});

export const ProductCategoryCreateManyInputSchema: z.ZodType<Prisma.ProductCategoryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  businessId: z.string(),
});

export const ProductCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ProductCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceCreateInputSchema: z.ZodType<Prisma.PriceCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutPricesInputSchema),
});

export const PriceUncheckedCreateInputSchema: z.ZodType<Prisma.PriceUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
  productId: z.string(),
});

export const PriceUpdateInputSchema: z.ZodType<Prisma.PriceUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutPricesNestedInputSchema).optional(),
});

export const PriceUncheckedUpdateInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceCreateManyInputSchema: z.ZodType<Prisma.PriceCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
  productId: z.string(),
});

export const PriceUpdateManyMutationInputSchema: z.ZodType<Prisma.PriceUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CurrencyCreateInputSchema: z.ZodType<Prisma.CurrencyCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  active: z.boolean().optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutCurrencyInputSchema).optional(),
});

export const CurrencyUncheckedCreateInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  active: z.boolean().optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutCurrencyInputSchema).optional(),
});

export const CurrencyUpdateInputSchema: z.ZodType<Prisma.CurrencyUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutCurrencyNestedInputSchema).optional(),
});

export const CurrencyUncheckedUpdateInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutCurrencyNestedInputSchema).optional(),
});

export const CurrencyCreateManyInputSchema: z.ZodType<Prisma.CurrencyCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  active: z.boolean().optional(),
});

export const CurrencyUpdateManyMutationInputSchema: z.ZodType<Prisma.CurrencyUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CurrencyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ExchangeRateCreateInputSchema: z.ZodType<Prisma.ExchangeRateCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutExchangeRatesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutExchangeRatesInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutExchangeRatesInputSchema).optional(),
});

export const ExchangeRateUncheckedCreateInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const ExchangeRateUpdateInputSchema: z.ZodType<Prisma.ExchangeRateUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.lazy(() => CurrencyUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutExchangeRatesNestedInputSchema).optional(),
});

export const ExchangeRateUncheckedUpdateInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ExchangeRateCreateManyInputSchema: z.ZodType<Prisma.ExchangeRateCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const ExchangeRateUpdateManyMutationInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ExchangeRateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const TenantListRelationFilterSchema: z.ZodType<Prisma.TenantListRelationFilter> = z.strictObject({
  every: z.lazy(() => TenantWhereInputSchema).optional(),
  some: z.lazy(() => TenantWhereInputSchema).optional(),
  none: z.lazy(() => TenantWhereInputSchema).optional(),
});

export const BranchListRelationFilterSchema: z.ZodType<Prisma.BranchListRelationFilter> = z.strictObject({
  every: z.lazy(() => BranchWhereInputSchema).optional(),
  some: z.lazy(() => BranchWhereInputSchema).optional(),
  none: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.strictObject({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const ProductCategoryListRelationFilterSchema: z.ZodType<Prisma.ProductCategoryListRelationFilter> = z.strictObject({
  every: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  some: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  none: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
});

export const ExchangeRateListRelationFilterSchema: z.ZodType<Prisma.ExchangeRateListRelationFilter> = z.strictObject({
  every: z.lazy(() => ExchangeRateWhereInputSchema).optional(),
  some: z.lazy(() => ExchangeRateWhereInputSchema).optional(),
  none: z.lazy(() => ExchangeRateWhereInputSchema).optional(),
});

export const BusinessCategoryListRelationFilterSchema: z.ZodType<Prisma.BusinessCategoryListRelationFilter> = z.strictObject({
  every: z.lazy(() => BusinessCategoryWhereInputSchema).optional(),
  some: z.lazy(() => BusinessCategoryWhereInputSchema).optional(),
  none: z.lazy(() => BusinessCategoryWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const TenantOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TenantOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BranchOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductCategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductCategoryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ExchangeRateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExchangeRateOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessCategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BusinessCategoryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessCountOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessCountOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessMaxOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessMinOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const BusinessScalarRelationFilterSchema: z.ZodType<Prisma.BusinessScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => BusinessWhereInputSchema).optional(),
  isNot: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.strictObject({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const TenantCountOrderByAggregateInputSchema: z.ZodType<Prisma.TenantCountOrderByAggregateInput> = z.strictObject({
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const TenantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TenantMaxOrderByAggregateInput> = z.strictObject({
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const TenantMinOrderByAggregateInputSchema: z.ZodType<Prisma.TenantMinOrderByAggregateInput> = z.strictObject({
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const ReviewsListRelationFilterSchema: z.ZodType<Prisma.ReviewsListRelationFilter> = z.strictObject({
  every: z.lazy(() => ReviewsWhereInputSchema).optional(),
  some: z.lazy(() => ReviewsWhereInputSchema).optional(),
  none: z.lazy(() => ReviewsWhereInputSchema).optional(),
});

export const FavoritesListRelationFilterSchema: z.ZodType<Prisma.FavoritesListRelationFilter> = z.strictObject({
  every: z.lazy(() => FavoritesWhereInputSchema).optional(),
  some: z.lazy(() => FavoritesWhereInputSchema).optional(),
  none: z.lazy(() => FavoritesWhereInputSchema).optional(),
});

export const ReviewsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewsOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const FavoritesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FavoritesOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchCountOrderByAggregateInputSchema: z.ZodType<Prisma.BranchCountOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BranchMaxOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchMinOrderByAggregateInputSchema: z.ZodType<Prisma.BranchMinOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const TenantNullableScalarRelationFilterSchema: z.ZodType<Prisma.TenantNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => TenantWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TenantWhereInputSchema).optional().nullable(),
});

export const BranchNullableScalarRelationFilterSchema: z.ZodType<Prisma.BranchNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => BranchWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => BranchWhereInputSchema).optional().nullable(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const ProductCategoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProductCategoryNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProductCategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductCategoryWhereInputSchema).optional().nullable(),
});

export const PriceListRelationFilterSchema: z.ZodType<Prisma.PriceListRelationFilter> = z.strictObject({
  every: z.lazy(() => PriceWhereInputSchema).optional(),
  some: z.lazy(() => PriceWhereInputSchema).optional(),
  none: z.lazy(() => PriceWhereInputSchema).optional(),
});

export const PriceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PriceOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
});

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const BranchScalarRelationFilterSchema: z.ZodType<Prisma.BranchScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => BranchWhereInputSchema).optional(),
  isNot: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const ReviewsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewsCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ReviewsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewsAvgOrderByAggregateInput> = z.strictObject({
  rating: z.lazy(() => SortOrderSchema).optional(),
});

export const ReviewsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewsMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ReviewsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewsMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ReviewsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewsSumOrderByAggregateInput> = z.strictObject({
  rating: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const EnumFavoriteTypeFilterSchema: z.ZodType<Prisma.EnumFavoriteTypeFilter> = z.strictObject({
  equals: z.lazy(() => FavoriteTypeSchema).optional(),
  in: z.lazy(() => FavoriteTypeSchema).array().optional(),
  notIn: z.lazy(() => FavoriteTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => NestedEnumFavoriteTypeFilterSchema) ]).optional(),
});

export const ProductNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProductNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional().nullable(),
});

export const FavoritesCountOrderByAggregateInputSchema: z.ZodType<Prisma.FavoritesCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const FavoritesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FavoritesMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const FavoritesMinOrderByAggregateInputSchema: z.ZodType<Prisma.FavoritesMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumFavoriteTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFavoriteTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => FavoriteTypeSchema).optional(),
  in: z.lazy(() => FavoriteTypeSchema).array().optional(),
  notIn: z.lazy(() => FavoriteTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => NestedEnumFavoriteTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFavoriteTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFavoriteTypeFilterSchema).optional(),
});

export const BusinessListRelationFilterSchema: z.ZodType<Prisma.BusinessListRelationFilter> = z.strictObject({
  every: z.lazy(() => BusinessWhereInputSchema).optional(),
  some: z.lazy(() => BusinessWhereInputSchema).optional(),
  none: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BusinessOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessCategoryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessCategoryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessCategoryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductCategoryNameBusinessIdCompoundUniqueInputSchema: z.ZodType<Prisma.ProductCategoryNameBusinessIdCompoundUniqueInput> = z.strictObject({
  name: z.string(),
  businessId: z.string(),
});

export const ProductCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumPriceTypeFilterSchema: z.ZodType<Prisma.EnumPriceTypeFilter> = z.strictObject({
  equals: z.lazy(() => PriceTypeSchema).optional(),
  in: z.lazy(() => PriceTypeSchema).array().optional(),
  notIn: z.lazy(() => PriceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => NestedEnumPriceTypeFilterSchema) ]).optional(),
});

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const ProductScalarRelationFilterSchema: z.ZodType<Prisma.ProductScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const PriceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriceCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriceAvgOrderByAggregateInput> = z.strictObject({
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PriceSumOrderByAggregateInput> = z.strictObject({
  amount: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumPriceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPriceTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => PriceTypeSchema).optional(),
  in: z.lazy(() => PriceTypeSchema).array().optional(),
  notIn: z.lazy(() => PriceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => NestedEnumPriceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriceTypeFilterSchema).optional(),
});

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const CurrencyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
});

export const CurrencyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
});

export const CurrencyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
});

export const CurrencyScalarRelationFilterSchema: z.ZodType<Prisma.CurrencyScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CurrencyWhereInputSchema).optional(),
  isNot: z.lazy(() => CurrencyWhereInputSchema).optional(),
});

export const ExchangeRateCurrencyIdBusinessIdBranchIdCompoundUniqueInputSchema: z.ZodType<Prisma.ExchangeRateCurrencyIdBusinessIdBranchIdCompoundUniqueInput> = z.strictObject({
  currencyId: z.string(),
  businessId: z.string(),
  branchId: z.string(),
});

export const ExchangeRateCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeRateCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const ExchangeRateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeRateAvgOrderByAggregateInput> = z.strictObject({
  rate: z.lazy(() => SortOrderSchema).optional(),
});

export const ExchangeRateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeRateMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const ExchangeRateMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeRateMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currencyId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const ExchangeRateSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeRateSumOrderByAggregateInput> = z.strictObject({
  rate: z.lazy(() => SortOrderSchema).optional(),
});

export const TenantCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.TenantCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantCreateWithoutBusinessInputSchema).array(), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TenantCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
});

export const BranchCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.BranchCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchCreateWithoutBusinessInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductCategoryCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCategoryCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryCreateNestedManyWithoutBusinessesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema).array(), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
});

export const TenantUncheckedCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUncheckedCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantCreateWithoutBusinessInputSchema).array(), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TenantCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
});

export const BranchUncheckedCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchCreateWithoutBusinessInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductUncheckedCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCategoryCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateNestedManyWithoutBusinessInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBusinessInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema).array(), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const TenantUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.TenantUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantCreateWithoutBusinessInputSchema).array(), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TenantUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => TenantUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TenantCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TenantUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => TenantUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TenantUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => TenantUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TenantScalarWhereInputSchema), z.lazy(() => TenantScalarWhereInputSchema).array() ]).optional(),
});

export const BranchUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.BranchUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchCreateWithoutBusinessInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const ProductUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ProductCategoryUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCategoryCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema), z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
});

export const ExchangeRateUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateManyWithoutBusinessesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema).array(), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessCategoryUpdateManyWithWhereWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpdateManyWithWhereWithoutBusinessesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessCategoryScalarWhereInputSchema), z.lazy(() => BusinessCategoryScalarWhereInputSchema).array() ]).optional(),
});

export const TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantCreateWithoutBusinessInputSchema).array(), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => TenantCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TenantUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => TenantUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TenantCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TenantWhereUniqueInputSchema), z.lazy(() => TenantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TenantUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => TenantUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TenantUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => TenantUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TenantScalarWhereInputSchema), z.lazy(() => TenantScalarWhereInputSchema).array() ]).optional(),
});

export const BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchCreateWithoutBusinessInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => BranchCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema).array(), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ProductCategoryCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCategoryCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema), z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema), z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBusinessInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBusinessInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBusinessInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBusinessInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema).array(), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessCategoryWhereUniqueInputSchema), z.lazy(() => BusinessCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessCategoryUpdateManyWithWhereWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUpdateManyWithWhereWithoutBusinessesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessCategoryScalarWhereInputSchema), z.lazy(() => BusinessCategoryScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessCreateNestedOneWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessCreateNestedOneWithoutTenantsInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutTenantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutTenantsInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutTenantInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserCreateWithoutTenantInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema), z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTenantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutTenantInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserCreateWithoutTenantInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema), z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTenantInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUpdateOneRequiredWithoutTenantsNestedInputSchema: z.ZodType<Prisma.BusinessUpdateOneRequiredWithoutTenantsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutTenantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutTenantsInputSchema).optional(),
  upsert: z.lazy(() => BusinessUpsertWithoutTenantsInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateToOneWithWhereWithoutTenantsInputSchema), z.lazy(() => BusinessUpdateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutTenantsInputSchema) ]).optional(),
});

export const UserUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutTenantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserCreateWithoutTenantInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema), z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTenantInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutTenantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTenantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTenantInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutTenantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTenantInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutTenantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const UserUncheckedUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTenantNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserCreateWithoutTenantInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema), z.lazy(() => UserCreateOrConnectWithoutTenantInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTenantInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutTenantInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyTenantInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTenantInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutTenantInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTenantInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutTenantInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessCreateNestedOneWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessCreateNestedOneWithoutBranchesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserCreateWithoutBranchInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema), z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductCreateWithoutBranchInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const ReviewsCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsCreateWithoutBranchInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
});

export const FavoritesCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesCreateWithoutBranchInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserCreateWithoutBranchInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema), z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductCreateWithoutBranchInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsCreateWithoutBranchInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesCreateWithoutBranchInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema: z.ZodType<Prisma.BusinessUpdateOneRequiredWithoutBranchesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutBranchesInputSchema).optional(),
  upsert: z.lazy(() => BusinessUpsertWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateToOneWithWhereWithoutBranchesInputSchema), z.lazy(() => BusinessUpdateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutBranchesInputSchema) ]).optional(),
});

export const UserUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserCreateWithoutBranchInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema), z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const ProductUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductCreateWithoutBranchInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ReviewsUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ReviewsUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsCreateWithoutBranchInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewsUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ReviewsUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
});

export const FavoritesUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesCreateWithoutBranchInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const ExchangeRateUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const UserUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserCreateWithoutBranchInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema), z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const ProductUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductCreateWithoutBranchInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ProductCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsCreateWithoutBranchInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewsUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ReviewsUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesCreateWithoutBranchInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const TenantCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.TenantCreateNestedOneWithoutUsersInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => TenantWhereUniqueInputSchema).optional(),
});

export const BranchCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutUsersInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const ReviewsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewsCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsCreateWithoutUserInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
});

export const FavoritesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FavoritesCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesCreateWithoutUserInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const ReviewsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsCreateWithoutUserInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesCreateWithoutUserInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const TenantUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.TenantUpdateOneWithoutUsersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TenantCreateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => TenantUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TenantWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TenantWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TenantWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TenantUpdateToOneWithWhereWithoutUsersInputSchema), z.lazy(() => TenantUpdateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
});

export const BranchUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneWithoutUsersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutUsersInputSchema), z.lazy(() => BranchUpdateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
});

export const ReviewsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewsUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsCreateWithoutUserInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewsUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => ReviewsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
});

export const FavoritesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesCreateWithoutUserInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsCreateWithoutUserInputSchema).array(), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema), z.lazy(() => ReviewsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ReviewsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewsWhereUniqueInputSchema), z.lazy(() => ReviewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ReviewsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewsUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => ReviewsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesCreateWithoutUserInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const ProductCategoryCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryCreateNestedOneWithoutProductsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCategoryCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => ProductCategoryWhereUniqueInputSchema).optional(),
});

export const BusinessCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.BusinessCreateNestedOneWithoutProductsInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
});

export const BranchCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutProductsInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const FavoritesCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.FavoritesCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesCreateWithoutProductInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const PriceCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.PriceCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceCreateWithoutProductInputSchema).array(), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema), z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesCreateWithoutProductInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
});

export const PriceUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceCreateWithoutProductInputSchema).array(), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema), z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
});

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.strictObject({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const ProductCategoryUpdateOneWithoutProductsNestedInputSchema: z.ZodType<Prisma.ProductCategoryUpdateOneWithoutProductsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCategoryCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => ProductCategoryUpsertWithoutProductsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProductCategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProductCategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProductCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductCategoryUpdateToOneWithWhereWithoutProductsInputSchema), z.lazy(() => ProductCategoryUpdateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
});

export const BusinessUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.BusinessUpdateOneRequiredWithoutProductsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => BusinessUpsertWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateToOneWithWhereWithoutProductsInputSchema), z.lazy(() => BusinessUpdateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
});

export const BranchUpdateOneWithoutProductsNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneWithoutProductsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutProductsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutProductsInputSchema), z.lazy(() => BranchUpdateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
});

export const FavoritesUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesCreateWithoutProductInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const PriceUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.PriceUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceCreateWithoutProductInputSchema).array(), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema), z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => PriceUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => PriceUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => PriceUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema), z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
});

export const FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesCreateWithoutProductInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => FavoritesUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => FavoritesUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoritesUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => FavoritesUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
});

export const PriceUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceCreateWithoutProductInputSchema).array(), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema), z.lazy(() => PriceCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => PriceUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema), z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => PriceUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => PriceUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema), z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
});

export const BranchCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutReviewsInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const BranchUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneRequiredWithoutReviewsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutReviewsInputSchema), z.lazy(() => BranchUpdateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewsInputSchema), z.lazy(() => UserUpdateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
});

export const ProductCreateNestedOneWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutFavoritesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
});

export const BranchCreateNestedOneWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutFavoritesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const UserCreateNestedOneWithoutFavoritesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFavoritesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumFavoriteTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumFavoriteTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => FavoriteTypeSchema).optional(),
});

export const ProductUpdateOneWithoutFavoritesNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneWithoutFavoritesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutFavoritesInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutFavoritesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutFavoritesInputSchema), z.lazy(() => ProductUpdateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutFavoritesInputSchema) ]).optional(),
});

export const BranchUpdateOneWithoutFavoritesNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneWithoutFavoritesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutFavoritesInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutFavoritesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutFavoritesInputSchema), z.lazy(() => BranchUpdateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutFavoritesInputSchema) ]).optional(),
});

export const UserUpdateOneRequiredWithoutFavoritesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFavoritesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavoritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFavoritesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFavoritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFavoritesInputSchema), z.lazy(() => UserUpdateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavoritesInputSchema) ]).optional(),
});

export const BusinessCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateNestedManyWithoutCategoriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateWithoutCategoriesInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateNestedManyWithoutCategoriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateWithoutCategoriesInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.BusinessUpdateManyWithoutCategoriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateWithoutCategoriesInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCategoriesInputSchema), z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCategoriesInputSchema), z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessUpdateManyWithWhereWithoutCategoriesInputSchema), z.lazy(() => BusinessUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyWithoutCategoriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateWithoutCategoriesInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCategoriesInputSchema), z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCategoriesInputSchema), z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessUpdateManyWithWhereWithoutCategoriesInputSchema), z.lazy(() => BusinessUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessCreateNestedOneWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateNestedOneWithoutProductCategoriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductCategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutProductCategoriesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
});

export const ProductCreateNestedManyWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutProductCategoryInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateWithoutProductCategoryInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyProductCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const ProductUncheckedCreateNestedManyWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutProductCategoryInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateWithoutProductCategoryInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyProductCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUpdateOneRequiredWithoutProductCategoriesNestedInputSchema: z.ZodType<Prisma.BusinessUpdateOneRequiredWithoutProductCategoriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductCategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutProductCategoriesInputSchema).optional(),
  upsert: z.lazy(() => BusinessUpsertWithoutProductCategoriesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateToOneWithWhereWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUpdateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductCategoriesInputSchema) ]).optional(),
});

export const ProductUpdateManyWithoutProductCategoryNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutProductCategoryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateWithoutProductCategoryInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductCategoryInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyProductCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductCategoryInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutProductCategoryInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutProductCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ProductUncheckedUpdateManyWithoutProductCategoryNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductCategoryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateWithoutProductCategoryInputSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema), z.lazy(() => ProductCreateOrConnectWithoutProductCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductCategoryInputSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyProductCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductCategoryInputSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutProductCategoryInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutProductCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
});

export const ProductCreateNestedOneWithoutPricesInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutPricesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
});

export const EnumPriceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPriceTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => PriceTypeSchema).optional(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const ProductUpdateOneRequiredWithoutPricesNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutPricesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutPricesInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutPricesInputSchema), z.lazy(() => ProductUpdateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutPricesInputSchema) ]).optional(),
});

export const ExchangeRateCreateNestedManyWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateCreateNestedManyWithoutCurrencyInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyCurrencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedCreateNestedManyWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateNestedManyWithoutCurrencyInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyCurrencyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
});

export const ExchangeRateUpdateManyWithoutCurrencyNestedInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithoutCurrencyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyCurrencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutCurrencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const ExchangeRateUncheckedUpdateManyWithoutCurrencyNestedInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutCurrencyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema).array(), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateCreateOrConnectWithoutCurrencyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeRateCreateManyCurrencyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeRateWhereUniqueInputSchema), z.lazy(() => ExchangeRateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUpdateManyWithWhereWithoutCurrencyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
});

export const CurrencyCreateNestedOneWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyCreateNestedOneWithoutExchangeRatesInput> = z.strictObject({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CurrencyCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  connect: z.lazy(() => CurrencyWhereUniqueInputSchema).optional(),
});

export const BusinessCreateNestedOneWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessCreateNestedOneWithoutExchangeRatesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
});

export const BranchCreateNestedOneWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutExchangeRatesInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const CurrencyUpdateOneRequiredWithoutExchangeRatesNestedInputSchema: z.ZodType<Prisma.CurrencyUpdateOneRequiredWithoutExchangeRatesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CurrencyCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  upsert: z.lazy(() => CurrencyUpsertWithoutExchangeRatesInputSchema).optional(),
  connect: z.lazy(() => CurrencyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CurrencyUpdateToOneWithWhereWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUpdateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedUpdateWithoutExchangeRatesInputSchema) ]).optional(),
});

export const BusinessUpdateOneRequiredWithoutExchangeRatesNestedInputSchema: z.ZodType<Prisma.BusinessUpdateOneRequiredWithoutExchangeRatesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BusinessCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  upsert: z.lazy(() => BusinessUpsertWithoutExchangeRatesInputSchema).optional(),
  connect: z.lazy(() => BusinessWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateToOneWithWhereWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutExchangeRatesInputSchema) ]).optional(),
});

export const BranchUpdateOneWithoutExchangeRatesNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneWithoutExchangeRatesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutExchangeRatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutExchangeRatesInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutExchangeRatesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BranchWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutExchangeRatesInputSchema), z.lazy(() => BranchUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutExchangeRatesInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedEnumFavoriteTypeFilterSchema: z.ZodType<Prisma.NestedEnumFavoriteTypeFilter> = z.strictObject({
  equals: z.lazy(() => FavoriteTypeSchema).optional(),
  in: z.lazy(() => FavoriteTypeSchema).array().optional(),
  notIn: z.lazy(() => FavoriteTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => NestedEnumFavoriteTypeFilterSchema) ]).optional(),
});

export const NestedEnumFavoriteTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFavoriteTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => FavoriteTypeSchema).optional(),
  in: z.lazy(() => FavoriteTypeSchema).array().optional(),
  notIn: z.lazy(() => FavoriteTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => NestedEnumFavoriteTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFavoriteTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFavoriteTypeFilterSchema).optional(),
});

export const NestedEnumPriceTypeFilterSchema: z.ZodType<Prisma.NestedEnumPriceTypeFilter> = z.strictObject({
  equals: z.lazy(() => PriceTypeSchema).optional(),
  in: z.lazy(() => PriceTypeSchema).array().optional(),
  notIn: z.lazy(() => PriceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => NestedEnumPriceTypeFilterSchema) ]).optional(),
});

export const NestedEnumPriceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPriceTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => PriceTypeSchema).optional(),
  in: z.lazy(() => PriceTypeSchema).array().optional(),
  notIn: z.lazy(() => PriceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => NestedEnumPriceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriceTypeFilterSchema).optional(),
});

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const TenantCreateWithoutBusinessInputSchema: z.ZodType<Prisma.TenantCreateWithoutBusinessInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutTenantInputSchema).optional(),
});

export const TenantUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUncheckedCreateWithoutBusinessInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTenantInputSchema).optional(),
});

export const TenantCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.TenantCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => TenantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const TenantCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.TenantCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => TenantCreateManyBusinessInputSchema), z.lazy(() => TenantCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BranchCreateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchCreateWithoutBusinessInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutBusinessInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const BranchCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.BranchCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BranchCreateManyBusinessInputSchema), z.lazy(() => BranchCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProductCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCreateWithoutBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ProductCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductCreateManyBusinessInputSchema), z.lazy(() => ProductCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProductCategoryCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryCreateWithoutBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  products: z.lazy(() => ProductCreateNestedManyWithoutProductCategoryInputSchema).optional(),
});

export const ProductCategoryUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateWithoutBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutProductCategoryInputSchema).optional(),
});

export const ProductCategoryCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ProductCategoryCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.ProductCategoryCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductCategoryCreateManyBusinessInputSchema), z.lazy(() => ProductCategoryCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ExchangeRateCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateCreateWithoutBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutExchangeRatesInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutExchangeRatesInputSchema).optional(),
});

export const ExchangeRateUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateWithoutBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const ExchangeRateCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ExchangeRateCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.ExchangeRateCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ExchangeRateCreateManyBusinessInputSchema), z.lazy(() => ExchangeRateCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BusinessCategoryCreateWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryCreateWithoutBusinessesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedCreateWithoutBusinessesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const BusinessCategoryCreateOrConnectWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryCreateOrConnectWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => BusinessCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema) ]),
});

export const TenantUpsertWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUpsertWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => TenantWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TenantUpdateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedUpdateWithoutBusinessInputSchema) ]),
  create: z.union([ z.lazy(() => TenantCreateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const TenantUpdateWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUpdateWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => TenantWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TenantUpdateWithoutBusinessInputSchema), z.lazy(() => TenantUncheckedUpdateWithoutBusinessInputSchema) ]),
});

export const TenantUpdateManyWithWhereWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUpdateManyWithWhereWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => TenantScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TenantUpdateManyMutationInputSchema), z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessInputSchema) ]),
});

export const TenantScalarWhereInputSchema: z.ZodType<Prisma.TenantScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TenantScalarWhereInputSchema), z.lazy(() => TenantScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TenantScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TenantScalarWhereInputSchema), z.lazy(() => TenantScalarWhereInputSchema).array() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const BranchUpsertWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUpsertWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BranchUpdateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutBusinessInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const BranchUpdateWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUpdateWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateWithoutBusinessInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutBusinessInputSchema) ]),
});

export const BranchUpdateManyWithWhereWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUpdateManyWithWhereWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => BranchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateManyMutationInputSchema), z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessInputSchema) ]),
});

export const BranchScalarWhereInputSchema: z.ZodType<Prisma.BranchScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BranchScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ProductUpsertWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutBusinessInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ProductUpdateWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutBusinessInputSchema) ]),
});

export const ProductUpdateManyWithWhereWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessInputSchema) ]),
});

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
});

export const ProductCategoryUpsertWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUpsertWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateWithoutBusinessInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ProductCategoryUpdateWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUpdateWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductCategoryUpdateWithoutBusinessInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateWithoutBusinessInputSchema) ]),
});

export const ProductCategoryUpdateManyWithWhereWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyWithWhereWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductCategoryUpdateManyMutationInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessInputSchema) ]),
});

export const ProductCategoryScalarWhereInputSchema: z.ZodType<Prisma.ProductCategoryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema), z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema), z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ExchangeRateUpsertWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUpsertWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutBusinessInputSchema) ]),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ExchangeRateUpdateWithWhereUniqueWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithWhereUniqueWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateWithoutBusinessInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutBusinessInputSchema) ]),
});

export const ExchangeRateUpdateManyWithWhereWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithWhereWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateManyMutationInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessInputSchema) ]),
});

export const ExchangeRateScalarWhereInputSchema: z.ZodType<Prisma.ExchangeRateScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeRateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeRateScalarWhereInputSchema), z.lazy(() => ExchangeRateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rate: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  currencyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUpsertWithWhereUniqueWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => BusinessCategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BusinessCategoryUpdateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedUpdateWithoutBusinessesInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCategoryCreateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedCreateWithoutBusinessesInputSchema) ]),
});

export const BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateWithWhereUniqueWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => BusinessCategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BusinessCategoryUpdateWithoutBusinessesInputSchema), z.lazy(() => BusinessCategoryUncheckedUpdateWithoutBusinessesInputSchema) ]),
});

export const BusinessCategoryUpdateManyWithWhereWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateManyWithWhereWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => BusinessCategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BusinessCategoryUpdateManyMutationInputSchema), z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesInputSchema) ]),
});

export const BusinessCategoryScalarWhereInputSchema: z.ZodType<Prisma.BusinessCategoryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessCategoryScalarWhereInputSchema), z.lazy(() => BusinessCategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessCategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessCategoryScalarWhereInputSchema), z.lazy(() => BusinessCategoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const BusinessCreateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessCreateWithoutTenantsInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutTenantsInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutTenantsInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutTenantsInputSchema) ]),
});

export const UserCreateWithoutTenantInputSchema: z.ZodType<Prisma.UserCreateWithoutTenantInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTenantInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutTenantInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTenantInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema) ]),
});

export const UserCreateManyTenantInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyTenantInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManyTenantInputSchema), z.lazy(() => UserCreateManyTenantInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BusinessUpsertWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUpsertWithoutTenantsInput> = z.strictObject({
  update: z.union([ z.lazy(() => BusinessUpdateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutTenantsInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutTenantsInputSchema) ]),
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessUpdateToOneWithWhereWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUpdateToOneWithWhereWithoutTenantsInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutTenantsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutTenantsInputSchema) ]),
});

export const BusinessUpdateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutTenantsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutTenantsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const UserUpsertWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutTenantInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutTenantInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTenantInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTenantInputSchema), z.lazy(() => UserUncheckedCreateWithoutTenantInputSchema) ]),
});

export const UserUpdateWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutTenantInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutTenantInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTenantInputSchema) ]),
});

export const UserUpdateManyWithWhereWithoutTenantInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutTenantInput> = z.strictObject({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutTenantInputSchema) ]),
});

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const BusinessCreateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutBranchesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutBranchesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutBranchesInputSchema) ]),
});

export const UserCreateWithoutBranchInputSchema: z.ZodType<Prisma.UserCreateWithoutBranchInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema) ]),
});

export const UserCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManyBranchInputSchema), z.lazy(() => UserCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProductCreateWithoutBranchInputSchema: z.ZodType<Prisma.ProductCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema).optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ProductCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductCreateManyBranchInputSchema), z.lazy(() => ProductCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ReviewsCreateWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
});

export const ReviewsUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  userId: z.string(),
});

export const ReviewsCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ReviewsCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.ReviewsCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ReviewsCreateManyBranchInputSchema), z.lazy(() => ReviewsCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FavoritesCreateWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutFavoritesInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFavoritesInputSchema),
});

export const FavoritesUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  userId: z.string(),
});

export const FavoritesCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema) ]),
});

export const FavoritesCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.FavoritesCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => FavoritesCreateManyBranchInputSchema), z.lazy(() => FavoritesCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ExchangeRateCreateWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateCreateWithoutBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currency: z.lazy(() => CurrencyCreateNestedOneWithoutExchangeRatesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutExchangeRatesInputSchema),
});

export const ExchangeRateUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  businessId: z.string(),
});

export const ExchangeRateCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ExchangeRateCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.ExchangeRateCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ExchangeRateCreateManyBranchInputSchema), z.lazy(() => ExchangeRateCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BusinessUpsertWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUpsertWithoutBranchesInput> = z.strictObject({
  update: z.union([ z.lazy(() => BusinessUpdateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutBranchesInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutBranchesInputSchema) ]),
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessUpdateToOneWithWhereWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUpdateToOneWithWhereWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutBranchesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutBranchesInputSchema) ]),
});

export const BusinessUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutBranchesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutBranchesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const UserUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutBranchInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema) ]),
});

export const UserUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutBranchInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const UserUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const ProductUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ProductUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutBranchInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const ProductUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const ReviewsUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewsUpdateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewsCreateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ReviewsUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewsUpdateWithoutBranchInputSchema), z.lazy(() => ReviewsUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const ReviewsUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ReviewsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewsUpdateManyMutationInputSchema), z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const ReviewsScalarWhereInputSchema: z.ZodType<Prisma.ReviewsScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewsScalarWhereInputSchema), z.lazy(() => ReviewsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const FavoritesUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavoritesUpdateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutBranchInputSchema) ]),
});

export const FavoritesUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateWithoutBranchInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const FavoritesUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => FavoritesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateManyMutationInputSchema), z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const FavoritesScalarWhereInputSchema: z.ZodType<Prisma.FavoritesScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoritesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoritesScalarWhereInputSchema), z.lazy(() => FavoritesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumFavoriteTypeFilterSchema), z.lazy(() => FavoriteTypeSchema) ]).optional(),
  productId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ExchangeRateUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutBranchInputSchema) ]),
});

export const ExchangeRateUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateWithoutBranchInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const ExchangeRateUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateManyMutationInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const TenantCreateWithoutUsersInputSchema: z.ZodType<Prisma.TenantCreateWithoutUsersInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutTenantsInputSchema),
});

export const TenantUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.TenantUncheckedCreateWithoutUsersInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
});

export const TenantCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.TenantCreateOrConnectWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => TenantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TenantCreateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedCreateWithoutUsersInputSchema) ]),
});

export const BranchCreateWithoutUsersInputSchema: z.ZodType<Prisma.BranchCreateWithoutUsersInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutUsersInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedCreateWithoutUsersInputSchema) ]),
});

export const ReviewsCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewsCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutReviewsInputSchema),
});

export const ReviewsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branchId: z.string(),
});

export const ReviewsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewsCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema) ]),
});

export const ReviewsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewsCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ReviewsCreateManyUserInputSchema), z.lazy(() => ReviewsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FavoritesCreateWithoutUserInputSchema: z.ZodType<Prisma.FavoritesCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutFavoritesInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutFavoritesInputSchema).optional(),
});

export const FavoritesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
});

export const FavoritesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FavoritesCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema) ]),
});

export const FavoritesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FavoritesCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => FavoritesCreateManyUserInputSchema), z.lazy(() => FavoritesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const TenantUpsertWithoutUsersInputSchema: z.ZodType<Prisma.TenantUpsertWithoutUsersInput> = z.strictObject({
  update: z.union([ z.lazy(() => TenantUpdateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TenantCreateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => TenantWhereInputSchema).optional(),
});

export const TenantUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.TenantUpdateToOneWithWhereWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => TenantWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TenantUpdateWithoutUsersInputSchema), z.lazy(() => TenantUncheckedUpdateWithoutUsersInputSchema) ]),
});

export const TenantUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TenantUpdateWithoutUsersInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutTenantsNestedInputSchema).optional(),
});

export const TenantUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateWithoutUsersInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUpsertWithoutUsersInputSchema: z.ZodType<Prisma.BranchUpsertWithoutUsersInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutUsersInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutUsersInputSchema) ]),
});

export const BranchUpdateWithoutUsersInputSchema: z.ZodType<Prisma.BranchUpdateWithoutUsersInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutUsersInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const ReviewsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewsUpdateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewsCreateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedCreateWithoutUserInputSchema) ]),
});

export const ReviewsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ReviewsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewsUpdateWithoutUserInputSchema), z.lazy(() => ReviewsUncheckedUpdateWithoutUserInputSchema) ]),
});

export const ReviewsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ReviewsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewsUpdateManyMutationInputSchema), z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const FavoritesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavoritesUpdateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutUserInputSchema) ]),
});

export const FavoritesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateWithoutUserInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutUserInputSchema) ]),
});

export const FavoritesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavoritesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateManyMutationInputSchema), z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const ProductCategoryCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryCreateWithoutProductsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductCategoriesInputSchema),
});

export const ProductCategoryUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateWithoutProductsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  businessId: z.string(),
});

export const ProductCategoryCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryCreateOrConnectWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutProductsInputSchema) ]),
});

export const BusinessCreateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductsInputSchema) ]),
});

export const BranchCreateWithoutProductsInputSchema: z.ZodType<Prisma.BranchCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutProductsInputSchema) ]),
});

export const FavoritesCreateWithoutProductInputSchema: z.ZodType<Prisma.FavoritesCreateWithoutProductInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutFavoritesInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFavoritesInputSchema),
});

export const FavoritesUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateWithoutProductInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  branchId: z.string().optional().nullable(),
  userId: z.string(),
});

export const FavoritesCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.FavoritesCreateOrConnectWithoutProductInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema) ]),
});

export const FavoritesCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.FavoritesCreateManyProductInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => FavoritesCreateManyProductInputSchema), z.lazy(() => FavoritesCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const PriceCreateWithoutProductInputSchema: z.ZodType<Prisma.PriceCreateWithoutProductInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
});

export const PriceUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutProductInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
});

export const PriceCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutProductInput> = z.strictObject({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema) ]),
});

export const PriceCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.PriceCreateManyProductInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PriceCreateManyProductInputSchema), z.lazy(() => PriceCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProductCategoryUpsertWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryUpsertWithoutProductsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
});

export const ProductCategoryUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryUpdateToOneWithWhereWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductCategoryUpdateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedUpdateWithoutProductsInputSchema) ]),
});

export const ProductCategoryUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryUpdateWithoutProductsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductCategoriesNestedInputSchema).optional(),
});

export const ProductCategoryUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateWithoutProductsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUpsertWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUpsertWithoutProductsInput> = z.strictObject({
  update: z.union([ z.lazy(() => BusinessUpdateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUpdateToOneWithWhereWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutProductsInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductsInputSchema) ]),
});

export const BusinessUpdateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutProductsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutProductsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BranchUpsertWithoutProductsInputSchema: z.ZodType<Prisma.BranchUpsertWithoutProductsInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutProductsInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutProductsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutProductsInputSchema) ]),
});

export const BranchUpdateWithoutProductsInputSchema: z.ZodType<Prisma.BranchUpdateWithoutProductsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutProductsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const FavoritesUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUpsertWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavoritesUpdateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema) ]),
});

export const FavoritesUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUpdateWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => FavoritesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedUpdateWithoutProductInputSchema) ]),
});

export const FavoritesUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUpdateManyWithWhereWithoutProductInput> = z.strictObject({
  where: z.lazy(() => FavoritesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavoritesUpdateManyMutationInputSchema), z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductInputSchema) ]),
});

export const PriceUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.PriceUpsertWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PriceUpdateWithoutProductInputSchema), z.lazy(() => PriceUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema) ]),
});

export const PriceUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.PriceUpdateWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateWithoutProductInputSchema), z.lazy(() => PriceUncheckedUpdateWithoutProductInputSchema) ]),
});

export const PriceUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.PriceUpdateManyWithWhereWithoutProductInput> = z.strictObject({
  where: z.lazy(() => PriceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateManyMutationInputSchema), z.lazy(() => PriceUncheckedUpdateManyWithoutProductInputSchema) ]),
});

export const PriceScalarWhereInputSchema: z.ZodType<Prisma.PriceScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PriceScalarWhereInputSchema), z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereInputSchema), z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPriceTypeFilterSchema), z.lazy(() => PriceTypeSchema) ]).optional(),
  amount: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const BranchCreateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchCreateWithoutReviewsInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutReviewsInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutReviewsInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutReviewsInputSchema) ]),
});

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
});

export const BranchUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUpsertWithoutReviewsInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutReviewsInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutReviewsInputSchema) ]),
});

export const BranchUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUpdateWithoutReviewsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutReviewsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const UserUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
});

export const UserUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const ProductCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductCreateWithoutFavoritesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema).optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutFavoritesInputSchema) ]),
});

export const BranchCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchCreateWithoutFavoritesInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutFavoritesInputSchema) ]),
});

export const UserCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserCreateWithoutFavoritesInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavoritesInputSchema) ]),
});

export const ProductUpsertWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUpsertWithoutFavoritesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ProductUpdateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutFavoritesInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const ProductUpdateToOneWithWhereWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutFavoritesInputSchema) ]),
});

export const ProductUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const BranchUpsertWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUpsertWithoutFavoritesInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutFavoritesInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutFavoritesInputSchema) ]),
});

export const BranchUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUpdateWithoutFavoritesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const UserUpsertWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUpsertWithoutFavoritesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavoritesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavoritesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFavoritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavoritesInputSchema) ]),
});

export const UserUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const BusinessCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutCategoriesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutCategoriesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema) ]),
});

export const BusinessUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUpsertWithWhereUniqueWithoutCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BusinessUpdateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCategoriesInputSchema) ]),
});

export const BusinessUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateWithWhereUniqueWithoutCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutCategoriesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutCategoriesInputSchema) ]),
});

export const BusinessUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateManyWithWhereWithoutCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BusinessUpdateManyMutationInputSchema), z.lazy(() => BusinessUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
});

export const BusinessScalarWhereInputSchema: z.ZodType<Prisma.BusinessScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const BusinessCreateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutProductCategoriesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutProductCategoriesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutProductCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductCategoriesInputSchema) ]),
});

export const ProductCreateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductCreateWithoutProductCategoryInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutProductCategoryInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutProductCategoryInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema) ]),
});

export const ProductCreateManyProductCategoryInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyProductCategoryInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductCreateManyProductCategoryInputSchema), z.lazy(() => ProductCreateManyProductCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BusinessUpsertWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUpsertWithoutProductCategoriesInput> = z.strictObject({
  update: z.union([ z.lazy(() => BusinessUpdateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutProductCategoriesInputSchema) ]),
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessUpdateToOneWithWhereWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateToOneWithWhereWithoutProductCategoriesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutProductCategoriesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutProductCategoriesInputSchema) ]),
});

export const BusinessUpdateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutProductCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutProductCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const ProductUpsertWithWhereUniqueWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutProductCategoryInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductCategoryInputSchema) ]),
});

export const ProductUpdateWithWhereUniqueWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutProductCategoryInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutProductCategoryInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductCategoryInputSchema) ]),
});

export const ProductUpdateManyWithWhereWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutProductCategoryInput> = z.strictObject({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutProductCategoryInputSchema) ]),
});

export const ProductCreateWithoutPricesInputSchema: z.ZodType<Prisma.ProductCreateWithoutPricesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema).optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutPricesInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutPricesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutPricesInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutPricesInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutPricesInputSchema) ]),
});

export const ProductUpsertWithoutPricesInputSchema: z.ZodType<Prisma.ProductUpsertWithoutPricesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ProductUpdateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutPricesInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutPricesInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const ProductUpdateToOneWithWhereWithoutPricesInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutPricesInput> = z.strictObject({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutPricesInputSchema) ]),
});

export const ProductUpdateWithoutPricesInputSchema: z.ZodType<Prisma.ProductUpdateWithoutPricesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutPricesInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutPricesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ExchangeRateCreateWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateCreateWithoutCurrencyInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutExchangeRatesInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutExchangeRatesInputSchema).optional(),
});

export const ExchangeRateUncheckedCreateWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedCreateWithoutCurrencyInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const ExchangeRateCreateOrConnectWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateCreateOrConnectWithoutCurrencyInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema) ]),
});

export const ExchangeRateCreateManyCurrencyInputEnvelopeSchema: z.ZodType<Prisma.ExchangeRateCreateManyCurrencyInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ExchangeRateCreateManyCurrencyInputSchema), z.lazy(() => ExchangeRateCreateManyCurrencyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUpsertWithWhereUniqueWithoutCurrencyInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExchangeRateUpdateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutCurrencyInputSchema) ]),
  create: z.union([ z.lazy(() => ExchangeRateCreateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedCreateWithoutCurrencyInputSchema) ]),
});

export const ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithWhereUniqueWithoutCurrencyInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateWithoutCurrencyInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateWithoutCurrencyInputSchema) ]),
});

export const ExchangeRateUpdateManyWithWhereWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUpdateManyWithWhereWithoutCurrencyInput> = z.strictObject({
  where: z.lazy(() => ExchangeRateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExchangeRateUpdateManyMutationInputSchema), z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutCurrencyInputSchema) ]),
});

export const CurrencyCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyCreateWithoutExchangeRatesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  active: z.boolean().optional(),
});

export const CurrencyUncheckedCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateWithoutExchangeRatesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  active: z.boolean().optional(),
});

export const CurrencyCreateOrConnectWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyCreateOrConnectWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => CurrencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedCreateWithoutExchangeRatesInputSchema) ]),
});

export const BusinessCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessCreateOrConnectWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutExchangeRatesInputSchema) ]),
});

export const BranchCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutExchangeRatesInputSchema) ]),
});

export const CurrencyUpsertWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyUpsertWithoutExchangeRatesInput> = z.strictObject({
  update: z.union([ z.lazy(() => CurrencyUpdateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedCreateWithoutExchangeRatesInputSchema) ]),
  where: z.lazy(() => CurrencyWhereInputSchema).optional(),
});

export const CurrencyUpdateToOneWithWhereWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyUpdateToOneWithWhereWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => CurrencyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CurrencyUpdateWithoutExchangeRatesInputSchema), z.lazy(() => CurrencyUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
});

export const CurrencyUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyUpdateWithoutExchangeRatesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CurrencyUncheckedUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateWithoutExchangeRatesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUpsertWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUpsertWithoutExchangeRatesInput> = z.strictObject({
  update: z.union([ z.lazy(() => BusinessUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutExchangeRatesInputSchema) ]),
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
});

export const BusinessUpdateToOneWithWhereWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUpdateToOneWithWhereWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
});

export const BusinessUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BranchUpsertWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUpsertWithoutExchangeRatesInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutExchangeRatesInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutExchangeRatesInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutExchangeRatesInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutExchangeRatesInputSchema) ]),
});

export const BranchUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const TenantCreateManyBusinessInputSchema: z.ZodType<Prisma.TenantCreateManyBusinessInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BranchCreateManyBusinessInputSchema: z.ZodType<Prisma.BranchCreateManyBusinessInput> = z.strictObject({
  name: z.string(),
  address: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProductCreateManyBusinessInputSchema: z.ZodType<Prisma.ProductCreateManyBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const ProductCategoryCreateManyBusinessInputSchema: z.ZodType<Prisma.ProductCategoryCreateManyBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const ExchangeRateCreateManyBusinessInputSchema: z.ZodType<Prisma.ExchangeRateCreateManyBusinessInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const TenantUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUpdateWithoutBusinessInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTenantNestedInputSchema).optional(),
});

export const TenantUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTenantNestedInputSchema).optional(),
});

export const TenantUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUpdateWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductCategoryUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  products: z.lazy(() => ProductUpdateManyWithoutProductCategoryNestedInputSchema).optional(),
});

export const ProductCategoryUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutProductCategoryNestedInputSchema).optional(),
});

export const ProductCategoryUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ExchangeRateUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.lazy(() => CurrencyUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutExchangeRatesNestedInputSchema).optional(),
});

export const ExchangeRateUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ExchangeRateUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessCategoryUpdateWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUpdateWithoutBusinessesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessCategoryUncheckedUpdateWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedUpdateWithoutBusinessesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessCategoryUncheckedUpdateManyWithoutBusinessesInputSchema: z.ZodType<Prisma.BusinessCategoryUncheckedUpdateManyWithoutBusinessesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserCreateManyTenantInputSchema: z.ZodType<Prisma.UserCreateManyTenantInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  branchId: z.string().optional().nullable(),
});

export const UserUpdateWithoutTenantInputSchema: z.ZodType<Prisma.UserUpdateWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserCreateManyBranchInputSchema: z.ZodType<Prisma.UserCreateManyBranchInput> = z.strictObject({
  id: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  tenantId: z.string().optional().nullable(),
});

export const ProductCreateManyBranchInputSchema: z.ZodType<Prisma.ProductCreateManyBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  productCategoryId: z.string().optional().nullable(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
});

export const ReviewsCreateManyBranchInputSchema: z.ZodType<Prisma.ReviewsCreateManyBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  userId: z.string(),
});

export const FavoritesCreateManyBranchInputSchema: z.ZodType<Prisma.FavoritesCreateManyBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  userId: z.string(),
});

export const ExchangeRateCreateManyBranchInputSchema: z.ZodType<Prisma.ExchangeRateCreateManyBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  currencyId: z.string(),
  businessId: z.string(),
});

export const UserUpdateWithoutBranchInputSchema: z.ZodType<Prisma.UserUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ProductUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ProductUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
});

export const ReviewsUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesUpdateWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutFavoritesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional(),
});

export const FavoritesUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ExchangeRateUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.lazy(() => CurrencyUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
});

export const ExchangeRateUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ExchangeRateUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currencyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsCreateManyUserInputSchema: z.ZodType<Prisma.ReviewsCreateManyUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  rating: z.number().int(),
  comment: z.string().optional().nullable(),
  branchId: z.string(),
});

export const FavoritesCreateManyUserInputSchema: z.ZodType<Prisma.FavoritesCreateManyUserInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  productId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
});

export const ReviewsUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branch: z.lazy(() => BranchUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
});

export const ReviewsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ReviewsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewsUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesUpdateWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneWithoutFavoritesNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutFavoritesNestedInputSchema).optional(),
});

export const FavoritesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const FavoritesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const FavoritesCreateManyProductInputSchema: z.ZodType<Prisma.FavoritesCreateManyProductInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => FavoriteTypeSchema).optional(),
  branchId: z.string().optional().nullable(),
  userId: z.string(),
});

export const PriceCreateManyProductInputSchema: z.ZodType<Prisma.PriceCreateManyProductInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => PriceTypeSchema).optional(),
  amount: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.number().optional(),
});

export const FavoritesUpdateWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutFavoritesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFavoritesNestedInputSchema).optional(),
});

export const FavoritesUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavoritesUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUncheckedUpdateManyWithoutProductInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => FavoriteTypeSchema), z.lazy(() => EnumFavoriteTypeFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUpdateWithoutProductInputSchema: z.ZodType<Prisma.PriceUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PriceTypeSchema), z.lazy(() => EnumPriceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyWithoutCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductCreateManyProductCategoryInputSchema: z.ZodType<Prisma.ProductCreateManyProductCategoryInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
});

export const ProductUpdateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ExchangeRateCreateManyCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateCreateManyCurrencyInput> = z.strictObject({
  id: z.uuid().optional(),
  rate: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  updatedAt: z.coerce.date().optional(),
  businessId: z.string(),
  branchId: z.string().optional().nullable(),
});

export const ExchangeRateUpdateWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUpdateWithoutCurrencyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutExchangeRatesNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutExchangeRatesNestedInputSchema).optional(),
});

export const ExchangeRateUncheckedUpdateWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateWithoutCurrencyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ExchangeRateUncheckedUpdateManyWithoutCurrencyInputSchema: z.ZodType<Prisma.ExchangeRateUncheckedUpdateManyWithoutCurrencyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BusinessFindFirstArgsSchema: z.ZodType<Prisma.BusinessFindFirstArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessOrderByWithRelationInputSchema.array(), BusinessOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessScalarFieldEnumSchema, BusinessScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BusinessFindFirstOrThrowArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessOrderByWithRelationInputSchema.array(), BusinessOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessScalarFieldEnumSchema, BusinessScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessFindManyArgsSchema: z.ZodType<Prisma.BusinessFindManyArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessOrderByWithRelationInputSchema.array(), BusinessOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessScalarFieldEnumSchema, BusinessScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessAggregateArgsSchema: z.ZodType<Prisma.BusinessAggregateArgs> = z.object({
  where: BusinessWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessOrderByWithRelationInputSchema.array(), BusinessOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessGroupByArgsSchema: z.ZodType<Prisma.BusinessGroupByArgs> = z.object({
  where: BusinessWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessOrderByWithAggregationInputSchema.array(), BusinessOrderByWithAggregationInputSchema ]).optional(),
  by: BusinessScalarFieldEnumSchema.array(), 
  having: BusinessScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessFindUniqueArgsSchema: z.ZodType<Prisma.BusinessFindUniqueArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereUniqueInputSchema, 
}).strict();

export const BusinessFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BusinessFindUniqueOrThrowArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereUniqueInputSchema, 
}).strict();

export const TenantFindFirstArgsSchema: z.ZodType<Prisma.TenantFindFirstArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereInputSchema.optional(), 
  orderBy: z.union([ TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema ]).optional(),
  cursor: TenantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TenantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TenantFindFirstOrThrowArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereInputSchema.optional(), 
  orderBy: z.union([ TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema ]).optional(),
  cursor: TenantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TenantFindManyArgsSchema: z.ZodType<Prisma.TenantFindManyArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereInputSchema.optional(), 
  orderBy: z.union([ TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema ]).optional(),
  cursor: TenantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TenantAggregateArgsSchema: z.ZodType<Prisma.TenantAggregateArgs> = z.object({
  where: TenantWhereInputSchema.optional(), 
  orderBy: z.union([ TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema ]).optional(),
  cursor: TenantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TenantGroupByArgsSchema: z.ZodType<Prisma.TenantGroupByArgs> = z.object({
  where: TenantWhereInputSchema.optional(), 
  orderBy: z.union([ TenantOrderByWithAggregationInputSchema.array(), TenantOrderByWithAggregationInputSchema ]).optional(),
  by: TenantScalarFieldEnumSchema.array(), 
  having: TenantScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TenantFindUniqueArgsSchema: z.ZodType<Prisma.TenantFindUniqueArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereUniqueInputSchema, 
}).strict();

export const TenantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TenantFindUniqueOrThrowArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereUniqueInputSchema, 
}).strict();

export const BranchFindFirstArgsSchema: z.ZodType<Prisma.BranchFindFirstArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereInputSchema.optional(), 
  orderBy: z.union([ BranchOrderByWithRelationInputSchema.array(), BranchOrderByWithRelationInputSchema ]).optional(),
  cursor: BranchWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BranchScalarFieldEnumSchema, BranchScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BranchFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BranchFindFirstOrThrowArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereInputSchema.optional(), 
  orderBy: z.union([ BranchOrderByWithRelationInputSchema.array(), BranchOrderByWithRelationInputSchema ]).optional(),
  cursor: BranchWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BranchScalarFieldEnumSchema, BranchScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BranchFindManyArgsSchema: z.ZodType<Prisma.BranchFindManyArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereInputSchema.optional(), 
  orderBy: z.union([ BranchOrderByWithRelationInputSchema.array(), BranchOrderByWithRelationInputSchema ]).optional(),
  cursor: BranchWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BranchScalarFieldEnumSchema, BranchScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BranchAggregateArgsSchema: z.ZodType<Prisma.BranchAggregateArgs> = z.object({
  where: BranchWhereInputSchema.optional(), 
  orderBy: z.union([ BranchOrderByWithRelationInputSchema.array(), BranchOrderByWithRelationInputSchema ]).optional(),
  cursor: BranchWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BranchGroupByArgsSchema: z.ZodType<Prisma.BranchGroupByArgs> = z.object({
  where: BranchWhereInputSchema.optional(), 
  orderBy: z.union([ BranchOrderByWithAggregationInputSchema.array(), BranchOrderByWithAggregationInputSchema ]).optional(),
  by: BranchScalarFieldEnumSchema.array(), 
  having: BranchScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BranchFindUniqueArgsSchema: z.ZodType<Prisma.BranchFindUniqueArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereUniqueInputSchema, 
}).strict();

export const BranchFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BranchFindUniqueOrThrowArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereUniqueInputSchema, 
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(), 
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(), 
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(), 
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(), 
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(), 
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(), ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(), 
  having: ProductScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema, 
}).strict();

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema, 
}).strict();

export const ReviewsFindFirstArgsSchema: z.ZodType<Prisma.ReviewsFindFirstArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereInputSchema.optional(), 
  orderBy: z.union([ ReviewsOrderByWithRelationInputSchema.array(), ReviewsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewsScalarFieldEnumSchema, ReviewsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReviewsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewsFindFirstOrThrowArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereInputSchema.optional(), 
  orderBy: z.union([ ReviewsOrderByWithRelationInputSchema.array(), ReviewsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewsScalarFieldEnumSchema, ReviewsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReviewsFindManyArgsSchema: z.ZodType<Prisma.ReviewsFindManyArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereInputSchema.optional(), 
  orderBy: z.union([ ReviewsOrderByWithRelationInputSchema.array(), ReviewsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewsScalarFieldEnumSchema, ReviewsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ReviewsAggregateArgsSchema: z.ZodType<Prisma.ReviewsAggregateArgs> = z.object({
  where: ReviewsWhereInputSchema.optional(), 
  orderBy: z.union([ ReviewsOrderByWithRelationInputSchema.array(), ReviewsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ReviewsGroupByArgsSchema: z.ZodType<Prisma.ReviewsGroupByArgs> = z.object({
  where: ReviewsWhereInputSchema.optional(), 
  orderBy: z.union([ ReviewsOrderByWithAggregationInputSchema.array(), ReviewsOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewsScalarFieldEnumSchema.array(), 
  having: ReviewsScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ReviewsFindUniqueArgsSchema: z.ZodType<Prisma.ReviewsFindUniqueArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereUniqueInputSchema, 
}).strict();

export const ReviewsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewsFindUniqueOrThrowArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereUniqueInputSchema, 
}).strict();

export const FavoritesFindFirstArgsSchema: z.ZodType<Prisma.FavoritesFindFirstArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereInputSchema.optional(), 
  orderBy: z.union([ FavoritesOrderByWithRelationInputSchema.array(), FavoritesOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoritesWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavoritesScalarFieldEnumSchema, FavoritesScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavoritesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FavoritesFindFirstOrThrowArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereInputSchema.optional(), 
  orderBy: z.union([ FavoritesOrderByWithRelationInputSchema.array(), FavoritesOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoritesWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavoritesScalarFieldEnumSchema, FavoritesScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavoritesFindManyArgsSchema: z.ZodType<Prisma.FavoritesFindManyArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereInputSchema.optional(), 
  orderBy: z.union([ FavoritesOrderByWithRelationInputSchema.array(), FavoritesOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoritesWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavoritesScalarFieldEnumSchema, FavoritesScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavoritesAggregateArgsSchema: z.ZodType<Prisma.FavoritesAggregateArgs> = z.object({
  where: FavoritesWhereInputSchema.optional(), 
  orderBy: z.union([ FavoritesOrderByWithRelationInputSchema.array(), FavoritesOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoritesWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FavoritesGroupByArgsSchema: z.ZodType<Prisma.FavoritesGroupByArgs> = z.object({
  where: FavoritesWhereInputSchema.optional(), 
  orderBy: z.union([ FavoritesOrderByWithAggregationInputSchema.array(), FavoritesOrderByWithAggregationInputSchema ]).optional(),
  by: FavoritesScalarFieldEnumSchema.array(), 
  having: FavoritesScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FavoritesFindUniqueArgsSchema: z.ZodType<Prisma.FavoritesFindUniqueArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereUniqueInputSchema, 
}).strict();

export const FavoritesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FavoritesFindUniqueOrThrowArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereUniqueInputSchema, 
}).strict();

export const BusinessCategoryFindFirstArgsSchema: z.ZodType<Prisma.BusinessCategoryFindFirstArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessCategoryOrderByWithRelationInputSchema.array(), BusinessCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessCategoryScalarFieldEnumSchema, BusinessCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BusinessCategoryFindFirstOrThrowArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessCategoryOrderByWithRelationInputSchema.array(), BusinessCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessCategoryScalarFieldEnumSchema, BusinessCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessCategoryFindManyArgsSchema: z.ZodType<Prisma.BusinessCategoryFindManyArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessCategoryOrderByWithRelationInputSchema.array(), BusinessCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessCategoryScalarFieldEnumSchema, BusinessCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessCategoryAggregateArgsSchema: z.ZodType<Prisma.BusinessCategoryAggregateArgs> = z.object({
  where: BusinessCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessCategoryOrderByWithRelationInputSchema.array(), BusinessCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessCategoryGroupByArgsSchema: z.ZodType<Prisma.BusinessCategoryGroupByArgs> = z.object({
  where: BusinessCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessCategoryOrderByWithAggregationInputSchema.array(), BusinessCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: BusinessCategoryScalarFieldEnumSchema.array(), 
  having: BusinessCategoryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessCategoryFindUniqueArgsSchema: z.ZodType<Prisma.BusinessCategoryFindUniqueArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereUniqueInputSchema, 
}).strict();

export const BusinessCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BusinessCategoryFindUniqueOrThrowArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereUniqueInputSchema, 
}).strict();

export const ProductCategoryFindFirstArgsSchema: z.ZodType<Prisma.ProductCategoryFindFirstArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(), ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema, ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductCategoryFindFirstOrThrowArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(), ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema, ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductCategoryFindManyArgsSchema: z.ZodType<Prisma.ProductCategoryFindManyArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(), ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema, ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductCategoryAggregateArgsSchema: z.ZodType<Prisma.ProductCategoryAggregateArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(), ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductCategoryGroupByArgsSchema: z.ZodType<Prisma.ProductCategoryGroupByArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(), 
  orderBy: z.union([ ProductCategoryOrderByWithAggregationInputSchema.array(), ProductCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: ProductCategoryScalarFieldEnumSchema.array(), 
  having: ProductCategoryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductCategoryFindUniqueArgsSchema: z.ZodType<Prisma.ProductCategoryFindUniqueArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema, 
}).strict();

export const ProductCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductCategoryFindUniqueOrThrowArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema, 
}).strict();

export const PriceFindFirstArgsSchema: z.ZodType<Prisma.PriceFindFirstArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(), 
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(), PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema, PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PriceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PriceFindFirstOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(), 
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(), PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema, PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PriceFindManyArgsSchema: z.ZodType<Prisma.PriceFindManyArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(), 
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(), PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema, PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PriceAggregateArgsSchema: z.ZodType<Prisma.PriceAggregateArgs> = z.object({
  where: PriceWhereInputSchema.optional(), 
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(), PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PriceGroupByArgsSchema: z.ZodType<Prisma.PriceGroupByArgs> = z.object({
  where: PriceWhereInputSchema.optional(), 
  orderBy: z.union([ PriceOrderByWithAggregationInputSchema.array(), PriceOrderByWithAggregationInputSchema ]).optional(),
  by: PriceScalarFieldEnumSchema.array(), 
  having: PriceScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PriceFindUniqueArgsSchema: z.ZodType<Prisma.PriceFindUniqueArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema, 
}).strict();

export const PriceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PriceFindUniqueOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema, 
}).strict();

export const CurrencyFindFirstArgsSchema: z.ZodType<Prisma.CurrencyFindFirstArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(), 
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(), CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema, CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CurrencyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindFirstOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(), 
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(), CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema, CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CurrencyFindManyArgsSchema: z.ZodType<Prisma.CurrencyFindManyArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(), 
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(), CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema, CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CurrencyAggregateArgsSchema: z.ZodType<Prisma.CurrencyAggregateArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(), 
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(), CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CurrencyGroupByArgsSchema: z.ZodType<Prisma.CurrencyGroupByArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(), 
  orderBy: z.union([ CurrencyOrderByWithAggregationInputSchema.array(), CurrencyOrderByWithAggregationInputSchema ]).optional(),
  by: CurrencyScalarFieldEnumSchema.array(), 
  having: CurrencyScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CurrencyFindUniqueArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema, 
}).strict();

export const CurrencyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema, 
}).strict();

export const ExchangeRateFindFirstArgsSchema: z.ZodType<Prisma.ExchangeRateFindFirstArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereInputSchema.optional(), 
  orderBy: z.union([ ExchangeRateOrderByWithRelationInputSchema.array(), ExchangeRateOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeRateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExchangeRateScalarFieldEnumSchema, ExchangeRateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ExchangeRateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExchangeRateFindFirstOrThrowArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereInputSchema.optional(), 
  orderBy: z.union([ ExchangeRateOrderByWithRelationInputSchema.array(), ExchangeRateOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeRateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExchangeRateScalarFieldEnumSchema, ExchangeRateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ExchangeRateFindManyArgsSchema: z.ZodType<Prisma.ExchangeRateFindManyArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereInputSchema.optional(), 
  orderBy: z.union([ ExchangeRateOrderByWithRelationInputSchema.array(), ExchangeRateOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeRateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExchangeRateScalarFieldEnumSchema, ExchangeRateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ExchangeRateAggregateArgsSchema: z.ZodType<Prisma.ExchangeRateAggregateArgs> = z.object({
  where: ExchangeRateWhereInputSchema.optional(), 
  orderBy: z.union([ ExchangeRateOrderByWithRelationInputSchema.array(), ExchangeRateOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeRateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ExchangeRateGroupByArgsSchema: z.ZodType<Prisma.ExchangeRateGroupByArgs> = z.object({
  where: ExchangeRateWhereInputSchema.optional(), 
  orderBy: z.union([ ExchangeRateOrderByWithAggregationInputSchema.array(), ExchangeRateOrderByWithAggregationInputSchema ]).optional(),
  by: ExchangeRateScalarFieldEnumSchema.array(), 
  having: ExchangeRateScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ExchangeRateFindUniqueArgsSchema: z.ZodType<Prisma.ExchangeRateFindUniqueArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereUniqueInputSchema, 
}).strict();

export const ExchangeRateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExchangeRateFindUniqueOrThrowArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereUniqueInputSchema, 
}).strict();

export const BusinessCreateArgsSchema: z.ZodType<Prisma.BusinessCreateArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  data: z.union([ BusinessCreateInputSchema, BusinessUncheckedCreateInputSchema ]),
}).strict();

export const BusinessUpsertArgsSchema: z.ZodType<Prisma.BusinessUpsertArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereUniqueInputSchema, 
  create: z.union([ BusinessCreateInputSchema, BusinessUncheckedCreateInputSchema ]),
  update: z.union([ BusinessUpdateInputSchema, BusinessUncheckedUpdateInputSchema ]),
}).strict();

export const BusinessCreateManyArgsSchema: z.ZodType<Prisma.BusinessCreateManyArgs> = z.object({
  data: z.union([ BusinessCreateManyInputSchema, BusinessCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessCreateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessCreateManyInputSchema, BusinessCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessDeleteArgsSchema: z.ZodType<Prisma.BusinessDeleteArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  where: BusinessWhereUniqueInputSchema, 
}).strict();

export const BusinessUpdateArgsSchema: z.ZodType<Prisma.BusinessUpdateArgs> = z.object({
  select: BusinessSelectSchema.optional(),
  include: BusinessIncludeSchema.optional(),
  data: z.union([ BusinessUpdateInputSchema, BusinessUncheckedUpdateInputSchema ]),
  where: BusinessWhereUniqueInputSchema, 
}).strict();

export const BusinessUpdateManyArgsSchema: z.ZodType<Prisma.BusinessUpdateManyArgs> = z.object({
  data: z.union([ BusinessUpdateManyMutationInputSchema, BusinessUncheckedUpdateManyInputSchema ]),
  where: BusinessWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessUpdateManyMutationInputSchema, BusinessUncheckedUpdateManyInputSchema ]),
  where: BusinessWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessDeleteManyArgsSchema: z.ZodType<Prisma.BusinessDeleteManyArgs> = z.object({
  where: BusinessWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TenantCreateArgsSchema: z.ZodType<Prisma.TenantCreateArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  data: z.union([ TenantCreateInputSchema, TenantUncheckedCreateInputSchema ]),
}).strict();

export const TenantUpsertArgsSchema: z.ZodType<Prisma.TenantUpsertArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereUniqueInputSchema, 
  create: z.union([ TenantCreateInputSchema, TenantUncheckedCreateInputSchema ]),
  update: z.union([ TenantUpdateInputSchema, TenantUncheckedUpdateInputSchema ]),
}).strict();

export const TenantCreateManyArgsSchema: z.ZodType<Prisma.TenantCreateManyArgs> = z.object({
  data: z.union([ TenantCreateManyInputSchema, TenantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TenantCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TenantCreateManyAndReturnArgs> = z.object({
  data: z.union([ TenantCreateManyInputSchema, TenantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TenantDeleteArgsSchema: z.ZodType<Prisma.TenantDeleteArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  where: TenantWhereUniqueInputSchema, 
}).strict();

export const TenantUpdateArgsSchema: z.ZodType<Prisma.TenantUpdateArgs> = z.object({
  select: TenantSelectSchema.optional(),
  include: TenantIncludeSchema.optional(),
  data: z.union([ TenantUpdateInputSchema, TenantUncheckedUpdateInputSchema ]),
  where: TenantWhereUniqueInputSchema, 
}).strict();

export const TenantUpdateManyArgsSchema: z.ZodType<Prisma.TenantUpdateManyArgs> = z.object({
  data: z.union([ TenantUpdateManyMutationInputSchema, TenantUncheckedUpdateManyInputSchema ]),
  where: TenantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TenantUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TenantUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TenantUpdateManyMutationInputSchema, TenantUncheckedUpdateManyInputSchema ]),
  where: TenantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TenantDeleteManyArgsSchema: z.ZodType<Prisma.TenantDeleteManyArgs> = z.object({
  where: TenantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BranchCreateArgsSchema: z.ZodType<Prisma.BranchCreateArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  data: z.union([ BranchCreateInputSchema, BranchUncheckedCreateInputSchema ]),
}).strict();

export const BranchUpsertArgsSchema: z.ZodType<Prisma.BranchUpsertArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereUniqueInputSchema, 
  create: z.union([ BranchCreateInputSchema, BranchUncheckedCreateInputSchema ]),
  update: z.union([ BranchUpdateInputSchema, BranchUncheckedUpdateInputSchema ]),
}).strict();

export const BranchCreateManyArgsSchema: z.ZodType<Prisma.BranchCreateManyArgs> = z.object({
  data: z.union([ BranchCreateManyInputSchema, BranchCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BranchCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BranchCreateManyAndReturnArgs> = z.object({
  data: z.union([ BranchCreateManyInputSchema, BranchCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BranchDeleteArgsSchema: z.ZodType<Prisma.BranchDeleteArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  where: BranchWhereUniqueInputSchema, 
}).strict();

export const BranchUpdateArgsSchema: z.ZodType<Prisma.BranchUpdateArgs> = z.object({
  select: BranchSelectSchema.optional(),
  include: BranchIncludeSchema.optional(),
  data: z.union([ BranchUpdateInputSchema, BranchUncheckedUpdateInputSchema ]),
  where: BranchWhereUniqueInputSchema, 
}).strict();

export const BranchUpdateManyArgsSchema: z.ZodType<Prisma.BranchUpdateManyArgs> = z.object({
  data: z.union([ BranchUpdateManyMutationInputSchema, BranchUncheckedUpdateManyInputSchema ]),
  where: BranchWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BranchUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BranchUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BranchUpdateManyMutationInputSchema, BranchUncheckedUpdateManyInputSchema ]),
  where: BranchWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BranchDeleteManyArgsSchema: z.ZodType<Prisma.BranchDeleteManyArgs> = z.object({
  where: BranchWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema, ProductUncheckedCreateInputSchema ]),
}).strict();

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema, 
  create: z.union([ ProductCreateInputSchema, ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema ]),
}).strict();

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema, ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema, ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema, 
}).strict();

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema, 
}).strict();

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema, ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema, ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReviewsCreateArgsSchema: z.ZodType<Prisma.ReviewsCreateArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  data: z.union([ ReviewsCreateInputSchema, ReviewsUncheckedCreateInputSchema ]),
}).strict();

export const ReviewsUpsertArgsSchema: z.ZodType<Prisma.ReviewsUpsertArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereUniqueInputSchema, 
  create: z.union([ ReviewsCreateInputSchema, ReviewsUncheckedCreateInputSchema ]),
  update: z.union([ ReviewsUpdateInputSchema, ReviewsUncheckedUpdateInputSchema ]),
}).strict();

export const ReviewsCreateManyArgsSchema: z.ZodType<Prisma.ReviewsCreateManyArgs> = z.object({
  data: z.union([ ReviewsCreateManyInputSchema, ReviewsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ReviewsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewsCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewsCreateManyInputSchema, ReviewsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ReviewsDeleteArgsSchema: z.ZodType<Prisma.ReviewsDeleteArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  where: ReviewsWhereUniqueInputSchema, 
}).strict();

export const ReviewsUpdateArgsSchema: z.ZodType<Prisma.ReviewsUpdateArgs> = z.object({
  select: ReviewsSelectSchema.optional(),
  include: ReviewsIncludeSchema.optional(),
  data: z.union([ ReviewsUpdateInputSchema, ReviewsUncheckedUpdateInputSchema ]),
  where: ReviewsWhereUniqueInputSchema, 
}).strict();

export const ReviewsUpdateManyArgsSchema: z.ZodType<Prisma.ReviewsUpdateManyArgs> = z.object({
  data: z.union([ ReviewsUpdateManyMutationInputSchema, ReviewsUncheckedUpdateManyInputSchema ]),
  where: ReviewsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReviewsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReviewsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReviewsUpdateManyMutationInputSchema, ReviewsUncheckedUpdateManyInputSchema ]),
  where: ReviewsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ReviewsDeleteManyArgsSchema: z.ZodType<Prisma.ReviewsDeleteManyArgs> = z.object({
  where: ReviewsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavoritesCreateArgsSchema: z.ZodType<Prisma.FavoritesCreateArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  data: z.union([ FavoritesCreateInputSchema, FavoritesUncheckedCreateInputSchema ]),
}).strict();

export const FavoritesUpsertArgsSchema: z.ZodType<Prisma.FavoritesUpsertArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereUniqueInputSchema, 
  create: z.union([ FavoritesCreateInputSchema, FavoritesUncheckedCreateInputSchema ]),
  update: z.union([ FavoritesUpdateInputSchema, FavoritesUncheckedUpdateInputSchema ]),
}).strict();

export const FavoritesCreateManyArgsSchema: z.ZodType<Prisma.FavoritesCreateManyArgs> = z.object({
  data: z.union([ FavoritesCreateManyInputSchema, FavoritesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FavoritesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FavoritesCreateManyAndReturnArgs> = z.object({
  data: z.union([ FavoritesCreateManyInputSchema, FavoritesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FavoritesDeleteArgsSchema: z.ZodType<Prisma.FavoritesDeleteArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  where: FavoritesWhereUniqueInputSchema, 
}).strict();

export const FavoritesUpdateArgsSchema: z.ZodType<Prisma.FavoritesUpdateArgs> = z.object({
  select: FavoritesSelectSchema.optional(),
  include: FavoritesIncludeSchema.optional(),
  data: z.union([ FavoritesUpdateInputSchema, FavoritesUncheckedUpdateInputSchema ]),
  where: FavoritesWhereUniqueInputSchema, 
}).strict();

export const FavoritesUpdateManyArgsSchema: z.ZodType<Prisma.FavoritesUpdateManyArgs> = z.object({
  data: z.union([ FavoritesUpdateManyMutationInputSchema, FavoritesUncheckedUpdateManyInputSchema ]),
  where: FavoritesWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavoritesUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FavoritesUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FavoritesUpdateManyMutationInputSchema, FavoritesUncheckedUpdateManyInputSchema ]),
  where: FavoritesWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavoritesDeleteManyArgsSchema: z.ZodType<Prisma.FavoritesDeleteManyArgs> = z.object({
  where: FavoritesWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessCategoryCreateArgsSchema: z.ZodType<Prisma.BusinessCategoryCreateArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  data: z.union([ BusinessCategoryCreateInputSchema, BusinessCategoryUncheckedCreateInputSchema ]),
}).strict();

export const BusinessCategoryUpsertArgsSchema: z.ZodType<Prisma.BusinessCategoryUpsertArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereUniqueInputSchema, 
  create: z.union([ BusinessCategoryCreateInputSchema, BusinessCategoryUncheckedCreateInputSchema ]),
  update: z.union([ BusinessCategoryUpdateInputSchema, BusinessCategoryUncheckedUpdateInputSchema ]),
}).strict();

export const BusinessCategoryCreateManyArgsSchema: z.ZodType<Prisma.BusinessCategoryCreateManyArgs> = z.object({
  data: z.union([ BusinessCategoryCreateManyInputSchema, BusinessCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessCategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessCategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessCategoryCreateManyInputSchema, BusinessCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessCategoryDeleteArgsSchema: z.ZodType<Prisma.BusinessCategoryDeleteArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  where: BusinessCategoryWhereUniqueInputSchema, 
}).strict();

export const BusinessCategoryUpdateArgsSchema: z.ZodType<Prisma.BusinessCategoryUpdateArgs> = z.object({
  select: BusinessCategorySelectSchema.optional(),
  include: BusinessCategoryIncludeSchema.optional(),
  data: z.union([ BusinessCategoryUpdateInputSchema, BusinessCategoryUncheckedUpdateInputSchema ]),
  where: BusinessCategoryWhereUniqueInputSchema, 
}).strict();

export const BusinessCategoryUpdateManyArgsSchema: z.ZodType<Prisma.BusinessCategoryUpdateManyArgs> = z.object({
  data: z.union([ BusinessCategoryUpdateManyMutationInputSchema, BusinessCategoryUncheckedUpdateManyInputSchema ]),
  where: BusinessCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessCategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessCategoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessCategoryUpdateManyMutationInputSchema, BusinessCategoryUncheckedUpdateManyInputSchema ]),
  where: BusinessCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessCategoryDeleteManyArgsSchema: z.ZodType<Prisma.BusinessCategoryDeleteManyArgs> = z.object({
  where: BusinessCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductCategoryCreateArgsSchema: z.ZodType<Prisma.ProductCategoryCreateArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  data: z.union([ ProductCategoryCreateInputSchema, ProductCategoryUncheckedCreateInputSchema ]),
}).strict();

export const ProductCategoryUpsertArgsSchema: z.ZodType<Prisma.ProductCategoryUpsertArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema, 
  create: z.union([ ProductCategoryCreateInputSchema, ProductCategoryUncheckedCreateInputSchema ]),
  update: z.union([ ProductCategoryUpdateInputSchema, ProductCategoryUncheckedUpdateInputSchema ]),
}).strict();

export const ProductCategoryCreateManyArgsSchema: z.ZodType<Prisma.ProductCategoryCreateManyArgs> = z.object({
  data: z.union([ ProductCategoryCreateManyInputSchema, ProductCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductCategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductCategoryCreateManyInputSchema, ProductCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductCategoryDeleteArgsSchema: z.ZodType<Prisma.ProductCategoryDeleteArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema, 
}).strict();

export const ProductCategoryUpdateArgsSchema: z.ZodType<Prisma.ProductCategoryUpdateArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  data: z.union([ ProductCategoryUpdateInputSchema, ProductCategoryUncheckedUpdateInputSchema ]),
  where: ProductCategoryWhereUniqueInputSchema, 
}).strict();

export const ProductCategoryUpdateManyArgsSchema: z.ZodType<Prisma.ProductCategoryUpdateManyArgs> = z.object({
  data: z.union([ ProductCategoryUpdateManyMutationInputSchema, ProductCategoryUncheckedUpdateManyInputSchema ]),
  where: ProductCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductCategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCategoryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProductCategoryUpdateManyMutationInputSchema, ProductCategoryUncheckedUpdateManyInputSchema ]),
  where: ProductCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductCategoryDeleteManyArgsSchema: z.ZodType<Prisma.ProductCategoryDeleteManyArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PriceCreateArgsSchema: z.ZodType<Prisma.PriceCreateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceCreateInputSchema, PriceUncheckedCreateInputSchema ]),
}).strict();

export const PriceUpsertArgsSchema: z.ZodType<Prisma.PriceUpsertArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema, 
  create: z.union([ PriceCreateInputSchema, PriceUncheckedCreateInputSchema ]),
  update: z.union([ PriceUpdateInputSchema, PriceUncheckedUpdateInputSchema ]),
}).strict();

export const PriceCreateManyArgsSchema: z.ZodType<Prisma.PriceCreateManyArgs> = z.object({
  data: z.union([ PriceCreateManyInputSchema, PriceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PriceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PriceCreateManyAndReturnArgs> = z.object({
  data: z.union([ PriceCreateManyInputSchema, PriceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PriceDeleteArgsSchema: z.ZodType<Prisma.PriceDeleteArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema, 
}).strict();

export const PriceUpdateArgsSchema: z.ZodType<Prisma.PriceUpdateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceUpdateInputSchema, PriceUncheckedUpdateInputSchema ]),
  where: PriceWhereUniqueInputSchema, 
}).strict();

export const PriceUpdateManyArgsSchema: z.ZodType<Prisma.PriceUpdateManyArgs> = z.object({
  data: z.union([ PriceUpdateManyMutationInputSchema, PriceUncheckedUpdateManyInputSchema ]),
  where: PriceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PriceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PriceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PriceUpdateManyMutationInputSchema, PriceUncheckedUpdateManyInputSchema ]),
  where: PriceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PriceDeleteManyArgsSchema: z.ZodType<Prisma.PriceDeleteManyArgs> = z.object({
  where: PriceWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CurrencyCreateArgsSchema: z.ZodType<Prisma.CurrencyCreateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyCreateInputSchema, CurrencyUncheckedCreateInputSchema ]),
}).strict();

export const CurrencyUpsertArgsSchema: z.ZodType<Prisma.CurrencyUpsertArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema, 
  create: z.union([ CurrencyCreateInputSchema, CurrencyUncheckedCreateInputSchema ]),
  update: z.union([ CurrencyUpdateInputSchema, CurrencyUncheckedUpdateInputSchema ]),
}).strict();

export const CurrencyCreateManyArgsSchema: z.ZodType<Prisma.CurrencyCreateManyArgs> = z.object({
  data: z.union([ CurrencyCreateManyInputSchema, CurrencyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CurrencyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CurrencyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CurrencyCreateManyInputSchema, CurrencyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CurrencyDeleteArgsSchema: z.ZodType<Prisma.CurrencyDeleteArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema, 
}).strict();

export const CurrencyUpdateArgsSchema: z.ZodType<Prisma.CurrencyUpdateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyUpdateInputSchema, CurrencyUncheckedUpdateInputSchema ]),
  where: CurrencyWhereUniqueInputSchema, 
}).strict();

export const CurrencyUpdateManyArgsSchema: z.ZodType<Prisma.CurrencyUpdateManyArgs> = z.object({
  data: z.union([ CurrencyUpdateManyMutationInputSchema, CurrencyUncheckedUpdateManyInputSchema ]),
  where: CurrencyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CurrencyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CurrencyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CurrencyUpdateManyMutationInputSchema, CurrencyUncheckedUpdateManyInputSchema ]),
  where: CurrencyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CurrencyDeleteManyArgsSchema: z.ZodType<Prisma.CurrencyDeleteManyArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ExchangeRateCreateArgsSchema: z.ZodType<Prisma.ExchangeRateCreateArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  data: z.union([ ExchangeRateCreateInputSchema, ExchangeRateUncheckedCreateInputSchema ]),
}).strict();

export const ExchangeRateUpsertArgsSchema: z.ZodType<Prisma.ExchangeRateUpsertArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereUniqueInputSchema, 
  create: z.union([ ExchangeRateCreateInputSchema, ExchangeRateUncheckedCreateInputSchema ]),
  update: z.union([ ExchangeRateUpdateInputSchema, ExchangeRateUncheckedUpdateInputSchema ]),
}).strict();

export const ExchangeRateCreateManyArgsSchema: z.ZodType<Prisma.ExchangeRateCreateManyArgs> = z.object({
  data: z.union([ ExchangeRateCreateManyInputSchema, ExchangeRateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ExchangeRateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExchangeRateCreateManyAndReturnArgs> = z.object({
  data: z.union([ ExchangeRateCreateManyInputSchema, ExchangeRateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ExchangeRateDeleteArgsSchema: z.ZodType<Prisma.ExchangeRateDeleteArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  where: ExchangeRateWhereUniqueInputSchema, 
}).strict();

export const ExchangeRateUpdateArgsSchema: z.ZodType<Prisma.ExchangeRateUpdateArgs> = z.object({
  select: ExchangeRateSelectSchema.optional(),
  include: ExchangeRateIncludeSchema.optional(),
  data: z.union([ ExchangeRateUpdateInputSchema, ExchangeRateUncheckedUpdateInputSchema ]),
  where: ExchangeRateWhereUniqueInputSchema, 
}).strict();

export const ExchangeRateUpdateManyArgsSchema: z.ZodType<Prisma.ExchangeRateUpdateManyArgs> = z.object({
  data: z.union([ ExchangeRateUpdateManyMutationInputSchema, ExchangeRateUncheckedUpdateManyInputSchema ]),
  where: ExchangeRateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ExchangeRateUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ExchangeRateUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ExchangeRateUpdateManyMutationInputSchema, ExchangeRateUncheckedUpdateManyInputSchema ]),
  where: ExchangeRateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ExchangeRateDeleteManyArgsSchema: z.ZodType<Prisma.ExchangeRateDeleteManyArgs> = z.object({
  where: ExchangeRateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();