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

export const BusinessScalarFieldEnumSchema = z.enum(['name','imageUrl','address','zip','phone','email','website','timezone','rfc','countryCode','id','createdAt','updatedAt']);

export const TenantScalarFieldEnumSchema = z.enum(['names','maternal_surname','paternal_surname','email','phone','rfc','id','createdAt','updatedAt','businessId']);

export const BranchScalarFieldEnumSchema = z.enum(['name','address','zip','latitude','longitude','id','createdAt','updatedAt','cityId','stateId','businessId']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','names','maternal_surname','paternal_surname','email','role','phone','tenantId','branchId']);

export const ProductScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','baseUnit','imageUrl','imageId','productCategoryId','businessId','isDeleted','isActive']);

export const ReviewsScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','rating','comment','branchId','userId']);

export const FavoritesScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','productId','branchId','userId']);

export const BusinessCategoryScalarFieldEnumSchema = z.enum(['id','name','description']);

export const ProductCategoryScalarFieldEnumSchema = z.enum(['id','name','description','businessId']);

export const PriceScalarFieldEnumSchema = z.enum(['id','price','quantity','sizeLabel','isActive','productId']);

export const ProductVariantScalarFieldEnumSchema = z.enum(['id','name','isActive','productId']);

export const CurrencyScalarFieldEnumSchema = z.enum(['id','code','active']);

export const ExchangeRateScalarFieldEnumSchema = z.enum(['id','rate','updatedAt','currencyId','businessId','branchId']);

export const CountryScalarFieldEnumSchema = z.enum(['code','name','phoneCode','id']);

export const StateScalarFieldEnumSchema = z.enum(['id','code','name','countryCode']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','stateId']);

export const BusinessHoursScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','dayOfWeek','isOpen','openTime','closeTime','branchId']);

export const VerificationCodeScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','code','expiresAt','type','status','userId']);

export const AccountStatusScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isVerified','type','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['SYSTEM_ADMIN','TENANT_OWNER','BRANCH_MANAGER','GUEST']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const FavoriteTypeSchema = z.enum(['BRANCH','PRODUCT']);

export type FavoriteTypeType = `${z.infer<typeof FavoriteTypeSchema>}`

export const BaseUnitSchema = z.enum(['label','size','piece','gr','kg','ml','lt','lb','oz','floz']);

export type BaseUnitType = `${z.infer<typeof BaseUnitSchema>}`

export const DayOfWeekSchema = z.enum(['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']);

export type DayOfWeekType = `${z.infer<typeof DayOfWeekSchema>}`

export const CodeStatusSchema = z.enum(['PENDING','VERIFIED','EXPIRED']);

export type CodeStatusType = `${z.infer<typeof CodeStatusSchema>}`

export const VerificationTypeSchema = z.enum(['EMAIL','PHONE']);

export type VerificationTypeType = `${z.infer<typeof VerificationTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BUSINESS SCHEMA
/////////////////////////////////////////

export const BusinessSchema = z.object({
  name: z.string(),
  imageUrl: z.string().nullable(),
  address: z.string().nullable(),
  zip: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  timezone: z.string().nullable(),
  rfc: z.string().nullable(),
  countryCode: z.string(),
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
  email: z.string(),
  phone: z.string().nullable(),
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
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cityId: z.string(),
  stateId: z.string(),
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
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  tenantId: z.string().nullable(),
  branchId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  baseUnit: BaseUnitSchema,
  id: z.cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  imageId: z.string().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean(),
  isActive: z.boolean(),
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
  id: z.uuid(),
  price: z.instanceof(Prisma.Decimal, { message: "Field 'price' must be a Decimal. Location: ['Models', 'Price']"}),
  quantity: z.instanceof(Prisma.Decimal, { message: "Field 'quantity' must be a Decimal. Location: ['Models', 'Price']"}).nullable(),
  sizeLabel: z.string().nullable(),
  isActive: z.boolean(),
  productId: z.string(),
})

export type Price = z.infer<typeof PriceSchema>

/////////////////////////////////////////
// PRODUCT VARIANT SCHEMA
/////////////////////////////////////////

export const ProductVariantSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  isActive: z.boolean(),
  productId: z.string(),
})

export type ProductVariant = z.infer<typeof ProductVariantSchema>

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
// COUNTRY SCHEMA
/////////////////////////////////////////

export const CountrySchema = z.object({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().nullable(),
  id: z.uuid(),
})

export type Country = z.infer<typeof CountrySchema>

/////////////////////////////////////////
// STATE SCHEMA
/////////////////////////////////////////

export const StateSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
})

export type State = z.infer<typeof StateSchema>

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  stateId: z.string(),
})

export type City = z.infer<typeof CitySchema>

/////////////////////////////////////////
// BUSINESS HOURS SCHEMA
/////////////////////////////////////////

export const BusinessHoursSchema = z.object({
  dayOfWeek: DayOfWeekSchema,
  id: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isOpen: z.boolean(),
  openTime: z.string().nullable(),
  closeTime: z.string().nullable(),
  branchId: z.string(),
})

export type BusinessHours = z.infer<typeof BusinessHoursSchema>

/////////////////////////////////////////
// VERIFICATION CODE SCHEMA
/////////////////////////////////////////

export const VerificationCodeSchema = z.object({
  type: VerificationTypeSchema,
  status: CodeStatusSchema,
  id: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  userId: z.string(),
})

export type VerificationCode = z.infer<typeof VerificationCodeSchema>

/////////////////////////////////////////
// ACCOUNT STATUS SCHEMA
/////////////////////////////////////////

export const AccountStatusSchema = z.object({
  type: VerificationTypeSchema,
  id: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isVerified: z.boolean(),
  userId: z.string(),
})

export type AccountStatus = z.infer<typeof AccountStatusSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BUSINESS
//------------------------------------------------------

export const BusinessIncludeSchema: z.ZodType<Prisma.BusinessInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
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
  imageUrl: z.boolean().optional(),
  address: z.boolean().optional(),
  zip: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  website: z.boolean().optional(),
  timezone: z.boolean().optional(),
  rfc: z.boolean().optional(),
  countryCode: z.boolean().optional(),
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
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
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
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
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  businessHours: z.union([z.boolean(),z.lazy(() => BusinessHoursFindManyArgsSchema)]).optional(),
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
  reviews: z.boolean().optional(),
  favorites: z.boolean().optional(),
  exchangeRates: z.boolean().optional(),
  businessHours: z.boolean().optional(),
}).strict();

export const BranchSelectSchema: z.ZodType<Prisma.BranchSelect> = z.object({
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  zip: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cityId: z.boolean().optional(),
  stateId: z.boolean().optional(),
  businessId: z.boolean().optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  exchangeRates: z.union([z.boolean(),z.lazy(() => ExchangeRateFindManyArgsSchema)]).optional(),
  businessHours: z.union([z.boolean(),z.lazy(() => BusinessHoursFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BranchCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  tenant: z.union([z.boolean(),z.lazy(() => TenantArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  verificationCodes: z.union([z.boolean(),z.lazy(() => VerificationCodeFindManyArgsSchema)]).optional(),
  accountStatus: z.union([z.boolean(),z.lazy(() => AccountStatusFindManyArgsSchema)]).optional(),
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
  verificationCodes: z.boolean().optional(),
  accountStatus: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  names: z.boolean().optional(),
  maternal_surname: z.boolean().optional(),
  paternal_surname: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  phone: z.boolean().optional(),
  tenantId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  tenant: z.union([z.boolean(),z.lazy(() => TenantArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewsFindManyArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  verificationCodes: z.union([z.boolean(),z.lazy(() => VerificationCodeFindManyArgsSchema)]).optional(),
  accountStatus: z.union([z.boolean(),z.lazy(() => AccountStatusFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  productCategory: z.union([z.boolean(),z.lazy(() => ProductCategoryArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  productVariants: z.union([z.boolean(),z.lazy(() => ProductVariantFindManyArgsSchema)]).optional(),
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
  productVariants: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  baseUnit: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  imageId: z.boolean().optional(),
  productCategoryId: z.boolean().optional(),
  businessId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.union([z.boolean(),z.lazy(() => ProductCategoryArgsSchema)]).optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  productVariants: z.union([z.boolean(),z.lazy(() => ProductVariantFindManyArgsSchema)]).optional(),
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
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  sizeLabel: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productId: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// PRODUCT VARIANT
//------------------------------------------------------

export const ProductVariantIncludeSchema: z.ZodType<Prisma.ProductVariantInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict();

export const ProductVariantArgsSchema: z.ZodType<Prisma.ProductVariantDefaultArgs> = z.object({
  select: z.lazy(() => ProductVariantSelectSchema).optional(),
  include: z.lazy(() => ProductVariantIncludeSchema).optional(),
}).strict();

export const ProductVariantSelectSchema: z.ZodType<Prisma.ProductVariantSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  isActive: z.boolean().optional(),
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

// COUNTRY
//------------------------------------------------------

export const CountryIncludeSchema: z.ZodType<Prisma.CountryInclude> = z.object({
  states: z.union([z.boolean(),z.lazy(() => StateFindManyArgsSchema)]).optional(),
  businesses: z.union([z.boolean(),z.lazy(() => BusinessFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CountryArgsSchema: z.ZodType<Prisma.CountryDefaultArgs> = z.object({
  select: z.lazy(() => CountrySelectSchema).optional(),
  include: z.lazy(() => CountryIncludeSchema).optional(),
}).strict();

export const CountryCountOutputTypeArgsSchema: z.ZodType<Prisma.CountryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CountryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CountryCountOutputTypeSelectSchema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z.object({
  states: z.boolean().optional(),
  businesses: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  phoneCode: z.boolean().optional(),
  id: z.boolean().optional(),
  states: z.union([z.boolean(),z.lazy(() => StateFindManyArgsSchema)]).optional(),
  businesses: z.union([z.boolean(),z.lazy(() => BusinessFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STATE
//------------------------------------------------------

export const StateIncludeSchema: z.ZodType<Prisma.StateInclude> = z.object({
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const StateArgsSchema: z.ZodType<Prisma.StateDefaultArgs> = z.object({
  select: z.lazy(() => StateSelectSchema).optional(),
  include: z.lazy(() => StateIncludeSchema).optional(),
}).strict();

export const StateCountOutputTypeArgsSchema: z.ZodType<Prisma.StateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StateCountOutputTypeSelectSchema: z.ZodType<Prisma.StateCountOutputTypeSelect> = z.object({
  cities: z.boolean().optional(),
  branches: z.boolean().optional(),
}).strict();

export const StateSelectSchema: z.ZodType<Prisma.StateSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  countryCode: z.boolean().optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CITY
//------------------------------------------------------

export const CityIncludeSchema: z.ZodType<Prisma.CityInclude> = z.object({
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CityArgsSchema: z.ZodType<Prisma.CityDefaultArgs> = z.object({
  select: z.lazy(() => CitySelectSchema).optional(),
  include: z.lazy(() => CityIncludeSchema).optional(),
}).strict();

export const CityCountOutputTypeArgsSchema: z.ZodType<Prisma.CityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CityCountOutputTypeSelectSchema: z.ZodType<Prisma.CityCountOutputTypeSelect> = z.object({
  branches: z.boolean().optional(),
}).strict();

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  stateId: z.boolean().optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BUSINESS HOURS
//------------------------------------------------------

export const BusinessHoursIncludeSchema: z.ZodType<Prisma.BusinessHoursInclude> = z.object({
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
}).strict();

export const BusinessHoursArgsSchema: z.ZodType<Prisma.BusinessHoursDefaultArgs> = z.object({
  select: z.lazy(() => BusinessHoursSelectSchema).optional(),
  include: z.lazy(() => BusinessHoursIncludeSchema).optional(),
}).strict();

export const BusinessHoursSelectSchema: z.ZodType<Prisma.BusinessHoursSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  dayOfWeek: z.boolean().optional(),
  isOpen: z.boolean().optional(),
  openTime: z.boolean().optional(),
  closeTime: z.boolean().optional(),
  branchId: z.boolean().optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
}).strict()

// VERIFICATION CODE
//------------------------------------------------------

export const VerificationCodeIncludeSchema: z.ZodType<Prisma.VerificationCodeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const VerificationCodeArgsSchema: z.ZodType<Prisma.VerificationCodeDefaultArgs> = z.object({
  select: z.lazy(() => VerificationCodeSelectSchema).optional(),
  include: z.lazy(() => VerificationCodeIncludeSchema).optional(),
}).strict();

export const VerificationCodeSelectSchema: z.ZodType<Prisma.VerificationCodeSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  code: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  type: z.boolean().optional(),
  status: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT STATUS
//------------------------------------------------------

export const AccountStatusIncludeSchema: z.ZodType<Prisma.AccountStatusInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AccountStatusArgsSchema: z.ZodType<Prisma.AccountStatusDefaultArgs> = z.object({
  select: z.lazy(() => AccountStatusSelectSchema).optional(),
  include: z.lazy(() => AccountStatusIncludeSchema).optional(),
}).strict();

export const AccountStatusSelectSchema: z.ZodType<Prisma.AccountStatusSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  type: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BusinessWhereInputSchema: z.ZodType<Prisma.BusinessWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  timezone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema), z.lazy(() => CountryWhereInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  categories: z.lazy(() => BusinessCategoryListRelationFilterSchema).optional(),
});

export const BusinessOrderByWithRelationInputSchema: z.ZodType<Prisma.BusinessOrderByWithRelationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  zip: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  timezone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
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
    name: z.string(),
    email: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    email: z.string(),
    website: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    website: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.cuid(),
    email: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    email: z.string(),
    website: z.string(),
  }),
  z.object({
    id: z.cuid(),
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.cuid(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    website: z.string(),
  }),
  z.object({
    id: z.cuid(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    name: z.string(),
    email: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    name: z.string(),
    email: z.string(),
    website: z.string(),
  }),
  z.object({
    name: z.string(),
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    name: z.string(),
    email: z.string(),
  }),
  z.object({
    name: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    name: z.string(),
    website: z.string(),
  }),
  z.object({
    name: z.string(),
    rfc: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    email: z.string(),
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    email: z.string(),
    website: z.string(),
  }),
  z.object({
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    website: z.string(),
    rfc: z.string(),
  }),
  z.object({
    website: z.string(),
  }),
  z.object({
    rfc: z.string(),
  }),
])
.and(z.strictObject({
  name: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  rfc: z.string().optional(),
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessWhereInputSchema), z.lazy(() => BusinessWhereInputSchema).array() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  timezone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema), z.lazy(() => CountryWhereInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  categories: z.lazy(() => BusinessCategoryListRelationFilterSchema).optional(),
}));

export const BusinessOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusinessOrderByWithAggregationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  zip: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  timezone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  rfc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
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
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  timezone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  rfc: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
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
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
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
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
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
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.cuid(),
    rfc: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    email: z.string(),
    rfc: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    rfc: z.string(),
  }),
])
.and(z.strictObject({
  email: z.string().optional(),
  rfc: z.string().optional(),
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TenantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
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
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
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
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => CityScalarRelationFilterSchema), z.lazy(() => CityWhereInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema), z.lazy(() => StateWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursListRelationFilterSchema).optional(),
});

export const BranchOrderByWithRelationInputSchema: z.ZodType<Prisma.BranchOrderByWithRelationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => CityOrderByWithRelationInputSchema).optional(),
  state: z.lazy(() => StateOrderByWithRelationInputSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewsOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateOrderByRelationAggregateInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursOrderByRelationAggregateInputSchema).optional(),
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
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => CityScalarRelationFilterSchema), z.lazy(() => CityWhereInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema), z.lazy(() => StateWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateListRelationFilterSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursListRelationFilterSchema).optional(),
}));

export const BranchOrderByWithAggregationInputSchema: z.ZodType<Prisma.BranchOrderByWithAggregationInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BranchCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BranchAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BranchMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BranchMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BranchSumOrderByAggregateInputSchema).optional(),
});

export const BranchScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BranchScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BranchScalarWhereWithAggregatesInputSchema), z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BranchScalarWhereWithAggregatesInputSchema), z.lazy(() => BranchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  cityId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenant: z.union([ z.lazy(() => TenantNullableScalarRelationFilterSchema), z.lazy(() => TenantWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeListRelationFilterSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tenantId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tenant: z.lazy(() => TenantOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  reviews: z.lazy(() => ReviewsOrderByRelationAggregateInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeOrderByRelationAggregateInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusOrderByRelationAggregateInputSchema).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenant: z.union([ z.lazy(() => TenantNullableScalarRelationFilterSchema), z.lazy(() => TenantWhereInputSchema) ]).optional().nullable(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsListRelationFilterSchema).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeListRelationFilterSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  names: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
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
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  baseUnit: z.union([ z.lazy(() => EnumBaseUnitFilterSchema), z.lazy(() => BaseUnitSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  imageId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productCategory: z.union([ z.lazy(() => ProductCategoryScalarRelationFilterSchema), z.lazy(() => ProductCategoryWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  productVariants: z.lazy(() => ProductVariantListRelationFilterSchema).optional(),
});

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  baseUnit: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productCategory: z.lazy(() => ProductCategoryOrderByWithRelationInputSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
  prices: z.lazy(() => PriceOrderByRelationAggregateInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantOrderByRelationAggregateInputSchema).optional(),
});

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    businessId_name: z.lazy(() => ProductBusinessIdNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    businessId_name: z.lazy(() => ProductBusinessIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.cuid().optional(),
  businessId_name: z.lazy(() => ProductBusinessIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  baseUnit: z.union([ z.lazy(() => EnumBaseUnitFilterSchema), z.lazy(() => BaseUnitSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  imageId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productCategory: z.union([ z.lazy(() => ProductCategoryScalarRelationFilterSchema), z.lazy(() => ProductCategoryWhereInputSchema) ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  productVariants: z.lazy(() => ProductVariantListRelationFilterSchema).optional(),
}));

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  baseUnit: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
});

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  baseUnit: z.union([ z.lazy(() => EnumBaseUnitWithAggregatesFilterSchema), z.lazy(() => BaseUnitSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  imageId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
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
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  sizeLabel: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
});

export const PriceOrderByWithRelationInputSchema: z.ZodType<Prisma.PriceOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sizeLabel: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
});

export const PriceWhereUniqueInputSchema: z.ZodType<Prisma.PriceWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    productId_sizeLabel_quantity: z.lazy(() => PriceProductIdSizeLabelQuantityCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    productId_sizeLabel_quantity: z.lazy(() => PriceProductIdSizeLabelQuantityCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  productId_sizeLabel_quantity: z.lazy(() => PriceProductIdSizeLabelQuantityCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema), z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  sizeLabel: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
}));

export const PriceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriceOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  sizeLabel: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
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
  price: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  sizeLabel: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const ProductVariantWhereInputSchema: z.ZodType<Prisma.ProductVariantWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductVariantWhereInputSchema), z.lazy(() => ProductVariantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductVariantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductVariantWhereInputSchema), z.lazy(() => ProductVariantWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
});

export const ProductVariantOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductVariantOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
});

export const ProductVariantWhereUniqueInputSchema: z.ZodType<Prisma.ProductVariantWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    productId_name: z.lazy(() => ProductVariantProductIdNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    productId_name: z.lazy(() => ProductVariantProductIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  productId_name: z.lazy(() => ProductVariantProductIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ProductVariantWhereInputSchema), z.lazy(() => ProductVariantWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductVariantWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductVariantWhereInputSchema), z.lazy(() => ProductVariantWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductScalarRelationFilterSchema), z.lazy(() => ProductWhereInputSchema) ]).optional(),
}));

export const ProductVariantOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductVariantOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductVariantCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductVariantMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductVariantMinOrderByAggregateInputSchema).optional(),
});

export const ProductVariantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductVariantScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductVariantScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductVariantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductVariantScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductVariantScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductVariantScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
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

export const CountryWhereInputSchema: z.ZodType<Prisma.CountryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CountryWhereInputSchema), z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema), z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneCode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  states: z.lazy(() => StateListRelationFilterSchema).optional(),
  businesses: z.lazy(() => BusinessListRelationFilterSchema).optional(),
});

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.strictObject({
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneCode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  states: z.lazy(() => StateOrderByRelationAggregateInputSchema).optional(),
  businesses: z.lazy(() => BusinessOrderByRelationAggregateInputSchema).optional(),
});

export const CountryWhereUniqueInputSchema: z.ZodType<Prisma.CountryWhereUniqueInput> = z.union([
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
  code: z.string().optional(),
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => CountryWhereInputSchema), z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema), z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phoneCode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  states: z.lazy(() => StateListRelationFilterSchema).optional(),
  businesses: z.lazy(() => BusinessListRelationFilterSchema).optional(),
}));

export const CountryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z.strictObject({
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneCode: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CountryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CountryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CountryMinOrderByAggregateInputSchema).optional(),
});

export const CountryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CountryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema), z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema), z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phoneCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const StateWhereInputSchema: z.ZodType<Prisma.StateWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StateWhereInputSchema), z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema), z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema), z.lazy(() => CountryWhereInputSchema) ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
});

export const StateOrderByWithRelationInputSchema: z.ZodType<Prisma.StateOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
  cities: z.lazy(() => CityOrderByRelationAggregateInputSchema).optional(),
  branches: z.lazy(() => BranchOrderByRelationAggregateInputSchema).optional(),
});

export const StateWhereUniqueInputSchema: z.ZodType<Prisma.StateWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => StateWhereInputSchema), z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema), z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  country: z.union([ z.lazy(() => CountryScalarRelationFilterSchema), z.lazy(() => CountryWhereInputSchema) ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
}));

export const StateOrderByWithAggregationInputSchema: z.ZodType<Prisma.StateOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StateMinOrderByAggregateInputSchema).optional(),
});

export const StateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StateScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema), z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema), z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  countryCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CityWhereInputSchema), z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema), z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema), z.lazy(() => StateWhereInputSchema) ]).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
});

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => StateOrderByWithRelationInputSchema).optional(),
  branches: z.lazy(() => BranchOrderByRelationAggregateInputSchema).optional(),
});

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    name_stateId: z.lazy(() => CityNameStateIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    name_stateId: z.lazy(() => CityNameStateIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  name_stateId: z.lazy(() => CityNameStateIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema), z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema), z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema), z.lazy(() => StateWhereInputSchema) ]).optional(),
  branches: z.lazy(() => BranchListRelationFilterSchema).optional(),
}));

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional(),
});

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema), z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema), z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const BusinessHoursWhereInputSchema: z.ZodType<Prisma.BusinessHoursWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessHoursWhereInputSchema), z.lazy(() => BusinessHoursWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessHoursWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessHoursWhereInputSchema), z.lazy(() => BusinessHoursWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => EnumDayOfWeekFilterSchema), z.lazy(() => DayOfWeekSchema) ]).optional(),
  isOpen: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  openTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  closeTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branch: z.union([ z.lazy(() => BranchScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional(),
});

export const BusinessHoursOrderByWithRelationInputSchema: z.ZodType<Prisma.BusinessHoursOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  isOpen: z.lazy(() => SortOrderSchema).optional(),
  openTime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  closeTime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
});

export const BusinessHoursWhereUniqueInputSchema: z.ZodType<Prisma.BusinessHoursWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    branchId_dayOfWeek: z.lazy(() => BusinessHoursBranchIdDayOfWeekCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    branchId_dayOfWeek: z.lazy(() => BusinessHoursBranchIdDayOfWeekCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  branchId_dayOfWeek: z.lazy(() => BusinessHoursBranchIdDayOfWeekCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BusinessHoursWhereInputSchema), z.lazy(() => BusinessHoursWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessHoursWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessHoursWhereInputSchema), z.lazy(() => BusinessHoursWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => EnumDayOfWeekFilterSchema), z.lazy(() => DayOfWeekSchema) ]).optional(),
  isOpen: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  openTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  closeTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branch: z.union([ z.lazy(() => BranchScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional(),
}));

export const BusinessHoursOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusinessHoursOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  isOpen: z.lazy(() => SortOrderSchema).optional(),
  openTime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  closeTime: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BusinessHoursCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BusinessHoursMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BusinessHoursMinOrderByAggregateInputSchema).optional(),
});

export const BusinessHoursScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BusinessHoursScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessHoursScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessHoursScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessHoursScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessHoursScalarWhereWithAggregatesInputSchema), z.lazy(() => BusinessHoursScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => EnumDayOfWeekWithAggregatesFilterSchema), z.lazy(() => DayOfWeekSchema) ]).optional(),
  isOpen: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  openTime: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  closeTime: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const VerificationCodeWhereInputSchema: z.ZodType<Prisma.VerificationCodeWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationCodeWhereInputSchema), z.lazy(() => VerificationCodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationCodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationCodeWhereInputSchema), z.lazy(() => VerificationCodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumCodeStatusFilterSchema), z.lazy(() => CodeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const VerificationCodeOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationCodeOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const VerificationCodeWhereUniqueInputSchema: z.ZodType<Prisma.VerificationCodeWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => VerificationCodeWhereInputSchema), z.lazy(() => VerificationCodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationCodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationCodeWhereInputSchema), z.lazy(() => VerificationCodeWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumCodeStatusFilterSchema), z.lazy(() => CodeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const VerificationCodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationCodeOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationCodeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationCodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationCodeMinOrderByAggregateInputSchema).optional(),
});

export const VerificationCodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationCodeScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationCodeScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationCodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationCodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationCodeScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationCodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeWithAggregatesFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumCodeStatusWithAggregatesFilterSchema), z.lazy(() => CodeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const AccountStatusWhereInputSchema: z.ZodType<Prisma.AccountStatusWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountStatusWhereInputSchema), z.lazy(() => AccountStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountStatusWhereInputSchema), z.lazy(() => AccountStatusWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AccountStatusOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountStatusOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AccountStatusWhereUniqueInputSchema: z.ZodType<Prisma.AccountStatusWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId_type: z.lazy(() => AccountStatusUserIdTypeCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId_type: z.lazy(() => AccountStatusUserIdTypeCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId_type: z.lazy(() => AccountStatusUserIdTypeCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountStatusWhereInputSchema), z.lazy(() => AccountStatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountStatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountStatusWhereInputSchema), z.lazy(() => AccountStatusWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AccountStatusOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountStatusOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountStatusCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountStatusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountStatusMinOrderByAggregateInputSchema).optional(),
});

export const AccountStatusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountStatusScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountStatusScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountStatusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountStatusScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountStatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeWithAggregatesFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const BusinessCreateInputSchema: z.ZodType<Prisma.BusinessCreateInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BusinessUpdateManyMutationInputSchema: z.ZodType<Prisma.BusinessUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TenantCreateInputSchema: z.ZodType<Prisma.TenantCreateInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TenantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateManyInput> = z.strictObject({
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchCreateInputSchema: z.ZodType<Prisma.BranchCreateInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateInputSchema: z.ZodType<Prisma.BranchUncheckedCreateInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUpdateInputSchema: z.ZodType<Prisma.BranchUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchCreateManyInputSchema: z.ZodType<Prisma.BranchCreateManyInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
});

export const BranchUpdateManyMutationInputSchema: z.ZodType<Prisma.BranchUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutPricesInputSchema),
});

export const PriceUncheckedCreateInputSchema: z.ZodType<Prisma.PriceUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  productId: z.string(),
});

export const PriceUpdateInputSchema: z.ZodType<Prisma.PriceUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutPricesNestedInputSchema).optional(),
});

export const PriceUncheckedUpdateInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceCreateManyInputSchema: z.ZodType<Prisma.PriceCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  productId: z.string(),
});

export const PriceUpdateManyMutationInputSchema: z.ZodType<Prisma.PriceUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantCreateInputSchema: z.ZodType<Prisma.ProductVariantCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutProductVariantsInputSchema),
});

export const ProductVariantUncheckedCreateInputSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  productId: z.string(),
});

export const ProductVariantUpdateInputSchema: z.ZodType<Prisma.ProductVariantUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutProductVariantsNestedInputSchema).optional(),
});

export const ProductVariantUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductVariantUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantCreateManyInputSchema: z.ZodType<Prisma.ProductVariantCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
  productId: z.string(),
});

export const ProductVariantUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductVariantUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductVariantUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CountryCreateInputSchema: z.ZodType<Prisma.CountryCreateInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
  businesses: z.lazy(() => BusinessCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  businesses: z.lazy(() => BusinessUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
  businesses: z.lazy(() => BusinessUpdateManyWithoutCountryNestedInputSchema).optional(),
});

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  businesses: z.lazy(() => BusinessUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
});

export const CountryCreateManyInputSchema: z.ZodType<Prisma.CountryCreateManyInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
});

export const CountryUpdateManyMutationInputSchema: z.ZodType<Prisma.CountryUpdateManyMutationInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CountryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StateCreateInputSchema: z.ZodType<Prisma.StateCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  country: z.lazy(() => CountryCreateNestedOneWithoutStatesInputSchema),
  cities: z.lazy(() => CityCreateNestedManyWithoutStateInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateUncheckedCreateInputSchema: z.ZodType<Prisma.StateUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateUpdateInputSchema: z.ZodType<Prisma.StateUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutStatesNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutStateNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateUncheckedUpdateInputSchema: z.ZodType<Prisma.StateUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateCreateManyInputSchema: z.ZodType<Prisma.StateCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
});

export const StateUpdateManyMutationInputSchema: z.ZodType<Prisma.StateUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  state: z.lazy(() => StateCreateNestedOneWithoutCitiesInputSchema),
  branches: z.lazy(() => BranchCreateNestedManyWithoutCityInputSchema).optional(),
});

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  stateId: z.string(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutCityInputSchema).optional(),
});

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutCityNestedInputSchema).optional(),
});

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutCityNestedInputSchema).optional(),
});

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  stateId: z.string(),
});

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessHoursCreateInputSchema: z.ZodType<Prisma.BusinessHoursCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutBusinessHoursInputSchema),
});

export const BusinessHoursUncheckedCreateInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
  branchId: z.string(),
});

export const BusinessHoursUpdateInputSchema: z.ZodType<Prisma.BusinessHoursUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branch: z.lazy(() => BranchUpdateOneRequiredWithoutBusinessHoursNestedInputSchema).optional(),
});

export const BusinessHoursUncheckedUpdateInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessHoursCreateManyInputSchema: z.ZodType<Prisma.BusinessHoursCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
  branchId: z.string(),
});

export const BusinessHoursUpdateManyMutationInputSchema: z.ZodType<Prisma.BusinessHoursUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessHoursUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationCodeCreateInputSchema: z.ZodType<Prisma.VerificationCodeCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVerificationCodesInputSchema),
});

export const VerificationCodeUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
  userId: z.string(),
});

export const VerificationCodeUpdateInputSchema: z.ZodType<Prisma.VerificationCodeUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVerificationCodesNestedInputSchema).optional(),
});

export const VerificationCodeUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationCodeCreateManyInputSchema: z.ZodType<Prisma.VerificationCodeCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
  userId: z.string(),
});

export const VerificationCodeUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationCodeUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationCodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusCreateInputSchema: z.ZodType<Prisma.AccountStatusCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountStatusInputSchema),
});

export const AccountStatusUncheckedCreateInputSchema: z.ZodType<Prisma.AccountStatusUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
  userId: z.string(),
});

export const AccountStatusUpdateInputSchema: z.ZodType<Prisma.AccountStatusUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountStatusNestedInputSchema).optional(),
});

export const AccountStatusUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountStatusUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusCreateManyInputSchema: z.ZodType<Prisma.AccountStatusCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
  userId: z.string(),
});

export const AccountStatusUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountStatusUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountStatusUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CountryScalarRelationFilterSchema: z.ZodType<Prisma.CountryScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CountryWhereInputSchema).optional(),
  isNot: z.lazy(() => CountryWhereInputSchema).optional(),
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
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessMaxOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessMinOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
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
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
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
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
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
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  rfc: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
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

export const CityScalarRelationFilterSchema: z.ZodType<Prisma.CityScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CityWhereInputSchema).optional(),
  isNot: z.lazy(() => CityWhereInputSchema).optional(),
});

export const StateScalarRelationFilterSchema: z.ZodType<Prisma.StateScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => StateWhereInputSchema).optional(),
  isNot: z.lazy(() => StateWhereInputSchema).optional(),
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

export const BusinessHoursListRelationFilterSchema: z.ZodType<Prisma.BusinessHoursListRelationFilter> = z.strictObject({
  every: z.lazy(() => BusinessHoursWhereInputSchema).optional(),
  some: z.lazy(() => BusinessHoursWhereInputSchema).optional(),
  none: z.lazy(() => BusinessHoursWhereInputSchema).optional(),
});

export const ReviewsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewsOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const FavoritesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FavoritesOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessHoursOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BusinessHoursOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchCountOrderByAggregateInputSchema: z.ZodType<Prisma.BranchCountOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BranchAvgOrderByAggregateInput> = z.strictObject({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BranchMaxOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchMinOrderByAggregateInputSchema: z.ZodType<Prisma.BranchMinOrderByAggregateInput> = z.strictObject({
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
});

export const BranchSumOrderByAggregateInputSchema: z.ZodType<Prisma.BranchSumOrderByAggregateInput> = z.strictObject({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
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

export const VerificationCodeListRelationFilterSchema: z.ZodType<Prisma.VerificationCodeListRelationFilter> = z.strictObject({
  every: z.lazy(() => VerificationCodeWhereInputSchema).optional(),
  some: z.lazy(() => VerificationCodeWhereInputSchema).optional(),
  none: z.lazy(() => VerificationCodeWhereInputSchema).optional(),
});

export const AccountStatusListRelationFilterSchema: z.ZodType<Prisma.AccountStatusListRelationFilter> = z.strictObject({
  every: z.lazy(() => AccountStatusWhereInputSchema).optional(),
  some: z.lazy(() => AccountStatusWhereInputSchema).optional(),
  none: z.lazy(() => AccountStatusWhereInputSchema).optional(),
});

export const VerificationCodeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VerificationCodeOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountStatusOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountStatusOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  tenantId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  names: z.lazy(() => SortOrderSchema).optional(),
  maternal_surname: z.lazy(() => SortOrderSchema).optional(),
  paternal_surname: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumBaseUnitFilterSchema: z.ZodType<Prisma.EnumBaseUnitFilter> = z.strictObject({
  equals: z.lazy(() => BaseUnitSchema).optional(),
  in: z.lazy(() => BaseUnitSchema).array().optional(),
  notIn: z.lazy(() => BaseUnitSchema).array().optional(),
  not: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => NestedEnumBaseUnitFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const ProductCategoryScalarRelationFilterSchema: z.ZodType<Prisma.ProductCategoryScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
});

export const PriceListRelationFilterSchema: z.ZodType<Prisma.PriceListRelationFilter> = z.strictObject({
  every: z.lazy(() => PriceWhereInputSchema).optional(),
  some: z.lazy(() => PriceWhereInputSchema).optional(),
  none: z.lazy(() => PriceWhereInputSchema).optional(),
});

export const ProductVariantListRelationFilterSchema: z.ZodType<Prisma.ProductVariantListRelationFilter> = z.strictObject({
  every: z.lazy(() => ProductVariantWhereInputSchema).optional(),
  some: z.lazy(() => ProductVariantWhereInputSchema).optional(),
  none: z.lazy(() => ProductVariantWhereInputSchema).optional(),
});

export const PriceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PriceOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductVariantOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductVariantOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductBusinessIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.ProductBusinessIdNameCompoundUniqueInput> = z.strictObject({
  businessId: z.string(),
  name: z.string(),
});

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  baseUnit: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageId: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  baseUnit: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageId: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  baseUnit: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageId: z.lazy(() => SortOrderSchema).optional(),
  productCategoryId: z.lazy(() => SortOrderSchema).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumBaseUnitWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBaseUnitWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => BaseUnitSchema).optional(),
  in: z.lazy(() => BaseUnitSchema).array().optional(),
  notIn: z.lazy(() => BaseUnitSchema).array().optional(),
  not: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => NestedEnumBaseUnitWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBaseUnitFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBaseUnitFilterSchema).optional(),
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

export const DecimalNullableFilterSchema: z.ZodType<Prisma.DecimalNullableFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
});

export const ProductScalarRelationFilterSchema: z.ZodType<Prisma.ProductScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const PriceProductIdSizeLabelQuantityCompoundUniqueInputSchema: z.ZodType<Prisma.PriceProductIdSizeLabelQuantityCompoundUniqueInput> = z.strictObject({
  productId: z.string(),
  sizeLabel: z.string(),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
});

export const PriceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriceCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  sizeLabel: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriceAvgOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  sizeLabel: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  sizeLabel: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const PriceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PriceSumOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
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

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
});

export const ProductVariantProductIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.ProductVariantProductIdNameCompoundUniqueInput> = z.strictObject({
  productId: z.string(),
  name: z.string(),
});

export const ProductVariantCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductVariantCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductVariantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductVariantMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProductVariantMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductVariantMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
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

export const StateListRelationFilterSchema: z.ZodType<Prisma.StateListRelationFilter> = z.strictObject({
  every: z.lazy(() => StateWhereInputSchema).optional(),
  some: z.lazy(() => StateWhereInputSchema).optional(),
  none: z.lazy(() => StateWhereInputSchema).optional(),
});

export const StateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StateOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CountryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CountryCountOrderByAggregateInput> = z.strictObject({
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const CountryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMaxOrderByAggregateInput> = z.strictObject({
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const CountryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMinOrderByAggregateInput> = z.strictObject({
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneCode: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const CityListRelationFilterSchema: z.ZodType<Prisma.CityListRelationFilter> = z.strictObject({
  every: z.lazy(() => CityWhereInputSchema).optional(),
  some: z.lazy(() => CityWhereInputSchema).optional(),
  none: z.lazy(() => CityWhereInputSchema).optional(),
});

export const CityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CityOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const StateCountOrderByAggregateInputSchema: z.ZodType<Prisma.StateCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
});

export const StateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StateMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
});

export const StateMinOrderByAggregateInputSchema: z.ZodType<Prisma.StateMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryCode: z.lazy(() => SortOrderSchema).optional(),
});

export const CityNameStateIdCompoundUniqueInputSchema: z.ZodType<Prisma.CityNameStateIdCompoundUniqueInput> = z.strictObject({
  name: z.string(),
  stateId: z.string(),
});

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
});

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
});

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stateId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDayOfWeekFilterSchema: z.ZodType<Prisma.EnumDayOfWeekFilter> = z.strictObject({
  equals: z.lazy(() => DayOfWeekSchema).optional(),
  in: z.lazy(() => DayOfWeekSchema).array().optional(),
  notIn: z.lazy(() => DayOfWeekSchema).array().optional(),
  not: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => NestedEnumDayOfWeekFilterSchema) ]).optional(),
});

export const BusinessHoursBranchIdDayOfWeekCompoundUniqueInputSchema: z.ZodType<Prisma.BusinessHoursBranchIdDayOfWeekCompoundUniqueInput> = z.strictObject({
  branchId: z.string(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
});

export const BusinessHoursCountOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessHoursCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  isOpen: z.lazy(() => SortOrderSchema).optional(),
  openTime: z.lazy(() => SortOrderSchema).optional(),
  closeTime: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessHoursMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessHoursMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  isOpen: z.lazy(() => SortOrderSchema).optional(),
  openTime: z.lazy(() => SortOrderSchema).optional(),
  closeTime: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const BusinessHoursMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessHoursMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  isOpen: z.lazy(() => SortOrderSchema).optional(),
  openTime: z.lazy(() => SortOrderSchema).optional(),
  closeTime: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDayOfWeekWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDayOfWeekWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DayOfWeekSchema).optional(),
  in: z.lazy(() => DayOfWeekSchema).array().optional(),
  notIn: z.lazy(() => DayOfWeekSchema).array().optional(),
  not: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => NestedEnumDayOfWeekWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDayOfWeekFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDayOfWeekFilterSchema).optional(),
});

export const EnumVerificationTypeFilterSchema: z.ZodType<Prisma.EnumVerificationTypeFilter> = z.strictObject({
  equals: z.lazy(() => VerificationTypeSchema).optional(),
  in: z.lazy(() => VerificationTypeSchema).array().optional(),
  notIn: z.lazy(() => VerificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => NestedEnumVerificationTypeFilterSchema) ]).optional(),
});

export const EnumCodeStatusFilterSchema: z.ZodType<Prisma.EnumCodeStatusFilter> = z.strictObject({
  equals: z.lazy(() => CodeStatusSchema).optional(),
  in: z.lazy(() => CodeStatusSchema).array().optional(),
  notIn: z.lazy(() => CodeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => NestedEnumCodeStatusFilterSchema) ]).optional(),
});

export const VerificationCodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCodeCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationCodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCodeMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationCodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCodeMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumVerificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumVerificationTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => VerificationTypeSchema).optional(),
  in: z.lazy(() => VerificationTypeSchema).array().optional(),
  notIn: z.lazy(() => VerificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => NestedEnumVerificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVerificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVerificationTypeFilterSchema).optional(),
});

export const EnumCodeStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCodeStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => CodeStatusSchema).optional(),
  in: z.lazy(() => CodeStatusSchema).array().optional(),
  notIn: z.lazy(() => CodeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => NestedEnumCodeStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCodeStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCodeStatusFilterSchema).optional(),
});

export const AccountStatusUserIdTypeCompoundUniqueInputSchema: z.ZodType<Prisma.AccountStatusUserIdTypeCompoundUniqueInput> = z.strictObject({
  userId: z.string(),
  type: z.lazy(() => VerificationTypeSchema),
});

export const AccountStatusCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountStatusCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountStatusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountStatusMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountStatusMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountStatusMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const CountryCreateNestedOneWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutBusinessesInput> = z.strictObject({
  create: z.union([ z.lazy(() => CountryCreateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutBusinessesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutBusinessesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
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

export const CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutBusinessesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CountryCreateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutBusinessesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutBusinessesInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutBusinessesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutBusinessesInputSchema), z.lazy(() => CountryUpdateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutBusinessesInputSchema) ]).optional(),
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

export const CityCreateNestedOneWithoutBranchesInputSchema: z.ZodType<Prisma.CityCreateNestedOneWithoutBranchesInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
});

export const StateCreateNestedOneWithoutBranchesInputSchema: z.ZodType<Prisma.StateCreateNestedOneWithoutBranchesInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
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

export const BusinessHoursCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema).array(), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessHoursCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserCreateWithoutBranchInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema), z.lazy(() => UserCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
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

export const BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedCreateNestedManyWithoutBranchInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema).array(), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessHoursCreateManyBranchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const CityUpdateOneRequiredWithoutBranchesNestedInputSchema: z.ZodType<Prisma.CityUpdateOneRequiredWithoutBranchesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutBranchesInputSchema).optional(),
  upsert: z.lazy(() => CityUpsertWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CityUpdateToOneWithWhereWithoutBranchesInputSchema), z.lazy(() => CityUpdateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedUpdateWithoutBranchesInputSchema) ]).optional(),
});

export const StateUpdateOneRequiredWithoutBranchesNestedInputSchema: z.ZodType<Prisma.StateUpdateOneRequiredWithoutBranchesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedCreateWithoutBranchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutBranchesInputSchema).optional(),
  upsert: z.lazy(() => StateUpsertWithoutBranchesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StateUpdateToOneWithWhereWithoutBranchesInputSchema), z.lazy(() => StateUpdateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutBranchesInputSchema) ]).optional(),
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

export const BusinessHoursUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.BusinessHoursUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema).array(), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessHoursUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessHoursCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessHoursUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessHoursUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessHoursScalarWhereInputSchema), z.lazy(() => BusinessHoursScalarWhereInputSchema).array() ]).optional(),
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

export const BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedUpdateManyWithoutBranchNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema).array(), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema), z.lazy(() => BusinessHoursCreateOrConnectWithoutBranchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessHoursUpsertWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpsertWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessHoursCreateManyBranchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessHoursWhereUniqueInputSchema), z.lazy(() => BusinessHoursWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessHoursUpdateWithWhereUniqueWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpdateWithWhereUniqueWithoutBranchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessHoursUpdateManyWithWhereWithoutBranchInputSchema), z.lazy(() => BusinessHoursUpdateManyWithWhereWithoutBranchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessHoursScalarWhereInputSchema), z.lazy(() => BusinessHoursScalarWhereInputSchema).array() ]).optional(),
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

export const VerificationCodeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationCodeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountStatusCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusCreateWithoutUserInputSchema).array(), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountStatusCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
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

export const VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationCodeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusCreateWithoutUserInputSchema).array(), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountStatusCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
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

export const VerificationCodeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationCodeUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationCodeUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationCodeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationCodeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationCodeUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationCodeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationCodeUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => VerificationCodeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationCodeScalarWhereInputSchema), z.lazy(() => VerificationCodeScalarWhereInputSchema).array() ]).optional(),
});

export const AccountStatusUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountStatusUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusCreateWithoutUserInputSchema).array(), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountStatusUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountStatusUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountStatusCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountStatusUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountStatusUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountStatusUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountStatusUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountStatusScalarWhereInputSchema), z.lazy(() => AccountStatusScalarWhereInputSchema).array() ]).optional(),
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

export const VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateWithoutUserInputSchema).array(), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema), z.lazy(() => VerificationCodeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VerificationCodeUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationCodeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VerificationCodeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VerificationCodeWhereUniqueInputSchema), z.lazy(() => VerificationCodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VerificationCodeUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => VerificationCodeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VerificationCodeUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => VerificationCodeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VerificationCodeScalarWhereInputSchema), z.lazy(() => VerificationCodeScalarWhereInputSchema).array() ]).optional(),
});

export const AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountStatusUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusCreateWithoutUserInputSchema).array(), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountStatusCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountStatusUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountStatusUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountStatusCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountStatusWhereUniqueInputSchema), z.lazy(() => AccountStatusWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountStatusUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountStatusUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountStatusUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountStatusUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountStatusScalarWhereInputSchema), z.lazy(() => AccountStatusScalarWhereInputSchema).array() ]).optional(),
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

export const ProductVariantCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantCreateWithoutProductInputSchema).array(), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema), z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductVariantCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
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

export const ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantCreateWithoutProductInputSchema).array(), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema), z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductVariantCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumBaseUnitFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBaseUnitFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => BaseUnitSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.ProductCategoryUpdateOneRequiredWithoutProductsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutProductsInputSchema), z.lazy(() => ProductCategoryUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCategoryCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => ProductCategoryUpsertWithoutProductsInputSchema).optional(),
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

export const ProductVariantUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductVariantUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantCreateWithoutProductInputSchema).array(), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema), z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductVariantUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => ProductVariantUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductVariantCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductVariantUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => ProductVariantUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductVariantUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => ProductVariantUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductVariantScalarWhereInputSchema), z.lazy(() => ProductVariantScalarWhereInputSchema).array() ]).optional(),
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

export const ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductVariantUncheckedUpdateManyWithoutProductNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantCreateWithoutProductInputSchema).array(), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema), z.lazy(() => ProductVariantCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductVariantUpsertWithWhereUniqueWithoutProductInputSchema), z.lazy(() => ProductVariantUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductVariantCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductVariantWhereUniqueInputSchema), z.lazy(() => ProductVariantWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductVariantUpdateWithWhereUniqueWithoutProductInputSchema), z.lazy(() => ProductVariantUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductVariantUpdateManyWithWhereWithoutProductInputSchema), z.lazy(() => ProductVariantUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductVariantScalarWhereInputSchema), z.lazy(() => ProductVariantScalarWhereInputSchema).array() ]).optional(),
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

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.strictObject({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
});

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = z.strictObject({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
});

export const ProductUpdateOneRequiredWithoutPricesNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutPricesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutPricesInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutPricesInputSchema), z.lazy(() => ProductUpdateWithoutPricesInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutPricesInputSchema) ]).optional(),
});

export const ProductCreateNestedOneWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutProductVariantsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductVariantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutProductVariantsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
});

export const ProductUpdateOneRequiredWithoutProductVariantsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutProductVariantsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProductCreateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductVariantsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutProductVariantsInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutProductVariantsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutProductVariantsInputSchema), z.lazy(() => ProductUpdateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductVariantsInputSchema) ]).optional(),
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

export const StateCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateNestedManyWithoutCountryInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateCreateWithoutCountryInputSchema).array(), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema), z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.BusinessCreateNestedManyWithoutCountryInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessCreateWithoutCountryInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
});

export const StateUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedCreateNestedManyWithoutCountryInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateCreateWithoutCountryInputSchema).array(), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema), z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
});

export const BusinessUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateNestedManyWithoutCountryInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessCreateWithoutCountryInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessCreateManyCountryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
});

export const StateUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.StateUpdateManyWithoutCountryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateCreateWithoutCountryInputSchema).array(), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema), z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema), z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StateScalarWhereInputSchema), z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.BusinessUpdateManyWithoutCountryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessCreateWithoutCountryInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessUpdateManyWithWhereWithoutCountryInputSchema), z.lazy(() => BusinessUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
});

export const StateUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyWithoutCountryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateCreateWithoutCountryInputSchema).array(), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema), z.lazy(() => StateCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => StateUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StateCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StateWhereUniqueInputSchema), z.lazy(() => StateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => StateUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema), z.lazy(() => StateUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StateScalarWhereInputSchema), z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
});

export const BusinessUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyWithoutCountryNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessCreateWithoutCountryInputSchema).array(), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema), z.lazy(() => BusinessCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => BusinessUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BusinessCreateManyCountryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BusinessWhereUniqueInputSchema), z.lazy(() => BusinessWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCountryInputSchema), z.lazy(() => BusinessUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BusinessUpdateManyWithWhereWithoutCountryInputSchema), z.lazy(() => BusinessUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BusinessScalarWhereInputSchema), z.lazy(() => BusinessScalarWhereInputSchema).array() ]).optional(),
});

export const CountryCreateNestedOneWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutStatesInput> = z.strictObject({
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutStatesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
});

export const CityCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.CityCreateNestedManyWithoutStateInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityCreateWithoutStateInputSchema).array(), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema), z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
});

export const BranchCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.BranchCreateNestedManyWithoutStateInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchCreateWithoutStateInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema), z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const CityUncheckedCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedCreateNestedManyWithoutStateInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityCreateWithoutStateInputSchema).array(), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema), z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
});

export const BranchUncheckedCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.BranchUncheckedCreateNestedManyWithoutStateInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchCreateWithoutStateInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema), z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const CountryUpdateOneRequiredWithoutStatesNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutStatesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutStatesInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutStatesInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutStatesInputSchema), z.lazy(() => CountryUpdateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]).optional(),
});

export const CityUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.CityUpdateManyWithoutStateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityCreateWithoutStateInputSchema).array(), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema), z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema), z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema), z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema), z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema), z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
});

export const BranchUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.BranchUpdateManyWithoutStateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchCreateWithoutStateInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema), z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutStateInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutStateInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutStateInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const CityUncheckedUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutStateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityCreateWithoutStateInputSchema).array(), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutStateInputSchema), z.lazy(() => CityCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema), z.lazy(() => CityUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema), z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema), z.lazy(() => CityUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema), z.lazy(() => CityUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema), z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
});

export const BranchUncheckedUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutStateNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchCreateWithoutStateInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema), z.lazy(() => BranchCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutStateInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutStateInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutStateInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const StateCreateNestedOneWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateNestedOneWithoutCitiesInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
});

export const BranchCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.BranchCreateNestedManyWithoutCityInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchCreateWithoutCityInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema), z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const BranchUncheckedCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.BranchUncheckedCreateNestedManyWithoutCityInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchCreateWithoutCityInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema), z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
});

export const StateUpdateOneRequiredWithoutCitiesNestedInputSchema: z.ZodType<Prisma.StateUpdateOneRequiredWithoutCitiesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutCitiesInputSchema).optional(),
  upsert: z.lazy(() => StateUpsertWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StateUpdateToOneWithWhereWithoutCitiesInputSchema), z.lazy(() => StateUpdateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]).optional(),
});

export const BranchUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.BranchUpdateManyWithoutCityNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchCreateWithoutCityInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema), z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutCityInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutCityInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutCityInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const BranchUncheckedUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutCityNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchCreateWithoutCityInputSchema).array(), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema), z.lazy(() => BranchCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BranchUpsertWithWhereUniqueWithoutCityInputSchema), z.lazy(() => BranchUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BranchCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BranchWhereUniqueInputSchema), z.lazy(() => BranchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BranchUpdateWithWhereUniqueWithoutCityInputSchema), z.lazy(() => BranchUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BranchUpdateManyWithWhereWithoutCityInputSchema), z.lazy(() => BranchUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BranchScalarWhereInputSchema), z.lazy(() => BranchScalarWhereInputSchema).array() ]).optional(),
});

export const BranchCreateNestedOneWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchCreateNestedOneWithoutBusinessHoursInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessHoursInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutBusinessHoursInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
});

export const EnumDayOfWeekFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDayOfWeekFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => DayOfWeekSchema).optional(),
});

export const BranchUpdateOneRequiredWithoutBusinessHoursNestedInputSchema: z.ZodType<Prisma.BranchUpdateOneRequiredWithoutBusinessHoursNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessHoursInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BranchCreateOrConnectWithoutBusinessHoursInputSchema).optional(),
  upsert: z.lazy(() => BranchUpsertWithoutBusinessHoursInputSchema).optional(),
  connect: z.lazy(() => BranchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BranchUpdateToOneWithWhereWithoutBusinessHoursInputSchema), z.lazy(() => BranchUpdateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutBusinessHoursInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVerificationCodesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerificationCodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerificationCodesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumVerificationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumVerificationTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => VerificationTypeSchema).optional(),
});

export const EnumCodeStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCodeStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => CodeStatusSchema).optional(),
});

export const UserUpdateOneRequiredWithoutVerificationCodesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVerificationCodesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerificationCodesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVerificationCodesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVerificationCodesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVerificationCodesInputSchema), z.lazy(() => UserUpdateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerificationCodesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountStatusInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountStatusInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutAccountStatusNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountStatusNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountStatusInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountStatusInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountStatusInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountStatusInputSchema), z.lazy(() => UserUpdateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountStatusInputSchema) ]).optional(),
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

export const NestedEnumBaseUnitFilterSchema: z.ZodType<Prisma.NestedEnumBaseUnitFilter> = z.strictObject({
  equals: z.lazy(() => BaseUnitSchema).optional(),
  in: z.lazy(() => BaseUnitSchema).array().optional(),
  notIn: z.lazy(() => BaseUnitSchema).array().optional(),
  not: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => NestedEnumBaseUnitFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedEnumBaseUnitWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBaseUnitWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => BaseUnitSchema).optional(),
  in: z.lazy(() => BaseUnitSchema).array().optional(),
  notIn: z.lazy(() => BaseUnitSchema).array().optional(),
  not: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => NestedEnumBaseUnitWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBaseUnitFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBaseUnitFilterSchema).optional(),
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

export const NestedDecimalNullableFilterSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
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

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> = z.strictObject({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
});

export const NestedEnumDayOfWeekFilterSchema: z.ZodType<Prisma.NestedEnumDayOfWeekFilter> = z.strictObject({
  equals: z.lazy(() => DayOfWeekSchema).optional(),
  in: z.lazy(() => DayOfWeekSchema).array().optional(),
  notIn: z.lazy(() => DayOfWeekSchema).array().optional(),
  not: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => NestedEnumDayOfWeekFilterSchema) ]).optional(),
});

export const NestedEnumDayOfWeekWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDayOfWeekWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DayOfWeekSchema).optional(),
  in: z.lazy(() => DayOfWeekSchema).array().optional(),
  notIn: z.lazy(() => DayOfWeekSchema).array().optional(),
  not: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => NestedEnumDayOfWeekWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDayOfWeekFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDayOfWeekFilterSchema).optional(),
});

export const NestedEnumVerificationTypeFilterSchema: z.ZodType<Prisma.NestedEnumVerificationTypeFilter> = z.strictObject({
  equals: z.lazy(() => VerificationTypeSchema).optional(),
  in: z.lazy(() => VerificationTypeSchema).array().optional(),
  notIn: z.lazy(() => VerificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => NestedEnumVerificationTypeFilterSchema) ]).optional(),
});

export const NestedEnumCodeStatusFilterSchema: z.ZodType<Prisma.NestedEnumCodeStatusFilter> = z.strictObject({
  equals: z.lazy(() => CodeStatusSchema).optional(),
  in: z.lazy(() => CodeStatusSchema).array().optional(),
  notIn: z.lazy(() => CodeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => NestedEnumCodeStatusFilterSchema) ]).optional(),
});

export const NestedEnumVerificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumVerificationTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => VerificationTypeSchema).optional(),
  in: z.lazy(() => VerificationTypeSchema).array().optional(),
  notIn: z.lazy(() => VerificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => NestedEnumVerificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVerificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVerificationTypeFilterSchema).optional(),
});

export const NestedEnumCodeStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCodeStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => CodeStatusSchema).optional(),
  in: z.lazy(() => CodeStatusSchema).array().optional(),
  notIn: z.lazy(() => CodeStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => NestedEnumCodeStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCodeStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCodeStatusFilterSchema).optional(),
});

export const CountryCreateWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryCreateWithoutBusinessesInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  states: z.lazy(() => StateCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryUncheckedCreateWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutBusinessesInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  states: z.lazy(() => StateUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryCreateOrConnectWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutBusinessesInputSchema) ]),
});

export const TenantCreateWithoutBusinessInputSchema: z.ZodType<Prisma.TenantCreateWithoutBusinessInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutBusinessInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
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
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
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

export const CountryUpsertWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryUpsertWithoutBusinessesInput> = z.strictObject({
  update: z.union([ z.lazy(() => CountryUpdateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutBusinessesInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutBusinessesInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional(),
});

export const CountryUpdateToOneWithWhereWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutBusinessesInput> = z.strictObject({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutBusinessesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutBusinessesInputSchema) ]),
});

export const CountryUpdateWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryUpdateWithoutBusinessesInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  states: z.lazy(() => StateUpdateManyWithoutCountryNestedInputSchema).optional(),
});

export const CountryUncheckedUpdateWithoutBusinessesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutBusinessesInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  states: z.lazy(() => StateUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
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
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
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
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  cityId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
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
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  baseUnit: z.union([ z.lazy(() => EnumBaseUnitFilterSchema), z.lazy(() => BaseUnitSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  imageId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  productCategoryId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
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
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutTenantsInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTenantInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutTenantsInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutTenantsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  names: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  maternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  paternal_surname: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tenantId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const CityCreateWithoutBranchesInputSchema: z.ZodType<Prisma.CityCreateWithoutBranchesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  state: z.lazy(() => StateCreateNestedOneWithoutCitiesInputSchema),
});

export const CityUncheckedCreateWithoutBranchesInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutBranchesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  stateId: z.string(),
});

export const CityCreateOrConnectWithoutBranchesInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedCreateWithoutBranchesInputSchema) ]),
});

export const StateCreateWithoutBranchesInputSchema: z.ZodType<Prisma.StateCreateWithoutBranchesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  country: z.lazy(() => CountryCreateNestedOneWithoutStatesInputSchema),
  cities: z.lazy(() => CityCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateUncheckedCreateWithoutBranchesInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutBranchesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateCreateOrConnectWithoutBranchesInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedCreateWithoutBranchesInputSchema) ]),
});

export const BusinessCreateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutBranchesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutBranchesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBranchInputSchema), z.lazy(() => UserUncheckedCreateWithoutBranchInputSchema) ]),
});

export const UserCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManyBranchInputSchema), z.lazy(() => UserCreateManyBranchInputSchema).array() ]),
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

export const BusinessHoursCreateWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursCreateWithoutBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
});

export const BusinessHoursUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
});

export const BusinessHoursCreateOrConnectWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursCreateOrConnectWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => BusinessHoursWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema) ]),
});

export const BusinessHoursCreateManyBranchInputEnvelopeSchema: z.ZodType<Prisma.BusinessHoursCreateManyBranchInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BusinessHoursCreateManyBranchInputSchema), z.lazy(() => BusinessHoursCreateManyBranchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CityUpsertWithoutBranchesInputSchema: z.ZodType<Prisma.CityUpsertWithoutBranchesInput> = z.strictObject({
  update: z.union([ z.lazy(() => CityUpdateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedUpdateWithoutBranchesInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedCreateWithoutBranchesInputSchema) ]),
  where: z.lazy(() => CityWhereInputSchema).optional(),
});

export const CityUpdateToOneWithWhereWithoutBranchesInputSchema: z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => CityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CityUpdateWithoutBranchesInputSchema), z.lazy(() => CityUncheckedUpdateWithoutBranchesInputSchema) ]),
});

export const CityUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.CityUpdateWithoutBranchesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
});

export const CityUncheckedUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutBranchesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StateUpsertWithoutBranchesInputSchema: z.ZodType<Prisma.StateUpsertWithoutBranchesInput> = z.strictObject({
  update: z.union([ z.lazy(() => StateUpdateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutBranchesInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedCreateWithoutBranchesInputSchema) ]),
  where: z.lazy(() => StateWhereInputSchema).optional(),
});

export const StateUpdateToOneWithWhereWithoutBranchesInputSchema: z.ZodType<Prisma.StateUpdateToOneWithWhereWithoutBranchesInput> = z.strictObject({
  where: z.lazy(() => StateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StateUpdateWithoutBranchesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutBranchesInputSchema) ]),
});

export const StateUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.StateUpdateWithoutBranchesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutStatesNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateUncheckedUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutBranchesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutBranchesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutBranchesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const BusinessHoursUpsertWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUpsertWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => BusinessHoursWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BusinessHoursUpdateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedUpdateWithoutBranchInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessHoursCreateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedCreateWithoutBranchInputSchema) ]),
});

export const BusinessHoursUpdateWithWhereUniqueWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUpdateWithWhereUniqueWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => BusinessHoursWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BusinessHoursUpdateWithoutBranchInputSchema), z.lazy(() => BusinessHoursUncheckedUpdateWithoutBranchInputSchema) ]),
});

export const BusinessHoursUpdateManyWithWhereWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUpdateManyWithWhereWithoutBranchInput> = z.strictObject({
  where: z.lazy(() => BusinessHoursScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BusinessHoursUpdateManyMutationInputSchema), z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchInputSchema) ]),
});

export const BusinessHoursScalarWhereInputSchema: z.ZodType<Prisma.BusinessHoursScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BusinessHoursScalarWhereInputSchema), z.lazy(() => BusinessHoursScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BusinessHoursScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BusinessHoursScalarWhereInputSchema), z.lazy(() => BusinessHoursScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => EnumDayOfWeekFilterSchema), z.lazy(() => DayOfWeekSchema) ]).optional(),
  isOpen: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  openTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  closeTime: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  branchId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const TenantCreateWithoutUsersInputSchema: z.ZodType<Prisma.TenantCreateWithoutUsersInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  email: z.string(),
  phone: z.string().optional().nullable(),
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
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutUsersInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
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

export const VerificationCodeCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
});

export const VerificationCodeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
});

export const VerificationCodeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationCodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema) ]),
});

export const VerificationCodeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VerificationCodeCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => VerificationCodeCreateManyUserInputSchema), z.lazy(() => VerificationCodeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AccountStatusCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
});

export const AccountStatusUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
});

export const AccountStatusCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountStatusWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountStatusCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountStatusCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AccountStatusCreateManyUserInputSchema), z.lazy(() => AccountStatusCreateManyUserInputSchema).array() ]),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutUsersInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
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

export const VerificationCodeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationCodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VerificationCodeUpdateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VerificationCodeCreateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedCreateWithoutUserInputSchema) ]),
});

export const VerificationCodeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationCodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VerificationCodeUpdateWithoutUserInputSchema), z.lazy(() => VerificationCodeUncheckedUpdateWithoutUserInputSchema) ]),
});

export const VerificationCodeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => VerificationCodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VerificationCodeUpdateManyMutationInputSchema), z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const VerificationCodeScalarWhereInputSchema: z.ZodType<Prisma.VerificationCodeScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationCodeScalarWhereInputSchema), z.lazy(() => VerificationCodeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationCodeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationCodeScalarWhereInputSchema), z.lazy(() => VerificationCodeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumCodeStatusFilterSchema), z.lazy(() => CodeStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const AccountStatusUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountStatusWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountStatusUpdateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountStatusCreateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountStatusUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountStatusWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountStatusUpdateWithoutUserInputSchema), z.lazy(() => AccountStatusUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AccountStatusUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountStatusScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountStatusUpdateManyMutationInputSchema), z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AccountStatusScalarWhereInputSchema: z.ZodType<Prisma.AccountStatusScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountStatusScalarWhereInputSchema), z.lazy(() => AccountStatusScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountStatusScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountStatusScalarWhereInputSchema), z.lazy(() => AccountStatusScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumVerificationTypeFilterSchema), z.lazy(() => VerificationTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
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
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const PriceUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutProductInput> = z.strictObject({
  id: z.uuid().optional(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const PriceCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutProductInput> = z.strictObject({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutProductInputSchema), z.lazy(() => PriceUncheckedCreateWithoutProductInputSchema) ]),
});

export const PriceCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.PriceCreateManyProductInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => PriceCreateManyProductInputSchema), z.lazy(() => PriceCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProductVariantCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantCreateWithoutProductInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
});

export const ProductVariantUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUncheckedCreateWithoutProductInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
});

export const ProductVariantCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantCreateOrConnectWithoutProductInput> = z.strictObject({
  where: z.lazy(() => ProductVariantWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema) ]),
});

export const ProductVariantCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.ProductVariantCreateManyProductInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductVariantCreateManyProductInputSchema), z.lazy(() => ProductVariantCreateManyProductInputSchema).array() ]),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutProductsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tenants: z.lazy(() => TenantUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUncheckedUpdateManyWithoutBusinessesNestedInputSchema).optional(),
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
  price: z.union([ z.lazy(() => DecimalFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  quantity: z.union([ z.lazy(() => DecimalNullableFilterSchema), z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  sizeLabel: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ProductVariantUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUpsertWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => ProductVariantWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductVariantUpdateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ProductVariantCreateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutProductInputSchema) ]),
});

export const ProductVariantUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUpdateWithWhereUniqueWithoutProductInput> = z.strictObject({
  where: z.lazy(() => ProductVariantWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductVariantUpdateWithoutProductInputSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutProductInputSchema) ]),
});

export const ProductVariantUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUpdateManyWithWhereWithoutProductInput> = z.strictObject({
  where: z.lazy(() => ProductVariantScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductVariantUpdateManyMutationInputSchema), z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductInputSchema) ]),
});

export const ProductVariantScalarWhereInputSchema: z.ZodType<Prisma.ProductVariantScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProductVariantScalarWhereInputSchema), z.lazy(() => ProductVariantScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductVariantScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductVariantScalarWhereInputSchema), z.lazy(() => ProductVariantScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const BranchCreateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchCreateWithoutReviewsInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutReviewsInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutReviewsInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutReviewsInputSchema), z.lazy(() => BranchUncheckedCreateWithoutReviewsInputSchema) ]),
});

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutReviewsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const ProductCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductCreateWithoutFavoritesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutFavoritesInputSchema), z.lazy(() => ProductUncheckedCreateWithoutFavoritesInputSchema) ]),
});

export const BranchCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchCreateWithoutFavoritesInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutFavoritesInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutFavoritesInputSchema), z.lazy(() => BranchUncheckedCreateWithoutFavoritesInputSchema) ]),
});

export const UserCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserCreateWithoutFavoritesInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFavoritesInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
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
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const BusinessCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutCategoriesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutCategoriesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  zip: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  timezone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  rfc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const BusinessCreateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessCreateWithoutProductCategoriesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutProductCategoriesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutProductCategoryInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutProductCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutProductCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutPricesInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutPricesInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
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
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutPricesInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutPricesInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductCreateWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductCreateWithoutProductVariantsInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  productCategory: z.lazy(() => ProductCategoryCreateNestedOneWithoutProductsInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutProductVariantsInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutProductVariantsInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductVariantsInputSchema) ]),
});

export const ProductUpsertWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutProductVariantsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ProductUpdateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductVariantsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductVariantsInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional(),
});

export const ProductUpdateToOneWithWhereWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutProductVariantsInput> = z.strictObject({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutProductVariantsInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductVariantsInputSchema) ]),
});

export const ProductUpdateWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutProductVariantsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutProductVariantsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutProductVariantsInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
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
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutBusinessesInputSchema).optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutBusinessInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryCreateNestedManyWithoutBusinessInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryCreateNestedManyWithoutBusinessesInputSchema).optional(),
});

export const BusinessUncheckedCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  countryCode: z.string().optional(),
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
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutExchangeRatesInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  categories: z.lazy(() => BusinessCategoryUpdateManyWithoutBusinessesNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutExchangeRatesInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutExchangeRatesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const StateCreateWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateWithoutCountryInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityCreateNestedManyWithoutStateInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutCountryInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema) ]),
});

export const StateCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.StateCreateManyCountryInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => StateCreateManyCountryInputSchema), z.lazy(() => StateCreateManyCountryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BusinessCreateWithoutCountryInputSchema: z.ZodType<Prisma.BusinessCreateWithoutCountryInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
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

export const BusinessUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUncheckedCreateWithoutCountryInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
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

export const BusinessCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.BusinessCreateOrConnectWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema) ]),
});

export const BusinessCreateManyCountryInputEnvelopeSchema: z.ZodType<Prisma.BusinessCreateManyCountryInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BusinessCreateManyCountryInputSchema), z.lazy(() => BusinessCreateManyCountryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const StateUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.StateUpsertWithWhereUniqueWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StateUpdateWithoutCountryInputSchema), z.lazy(() => StateUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutCountryInputSchema), z.lazy(() => StateUncheckedCreateWithoutCountryInputSchema) ]),
});

export const StateUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateWithWhereUniqueWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StateUpdateWithoutCountryInputSchema), z.lazy(() => StateUncheckedUpdateWithoutCountryInputSchema) ]),
});

export const StateUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateManyWithWhereWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => StateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StateUpdateManyMutationInputSchema), z.lazy(() => StateUncheckedUpdateManyWithoutCountryInputSchema) ]),
});

export const StateScalarWhereInputSchema: z.ZodType<Prisma.StateScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => StateScalarWhereInputSchema), z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateScalarWhereInputSchema), z.lazy(() => StateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  countryCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const BusinessUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUpsertWithWhereUniqueWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BusinessUpdateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => BusinessCreateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedCreateWithoutCountryInputSchema) ]),
});

export const BusinessUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUpdateWithWhereUniqueWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => BusinessWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BusinessUpdateWithoutCountryInputSchema), z.lazy(() => BusinessUncheckedUpdateWithoutCountryInputSchema) ]),
});

export const BusinessUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUpdateManyWithWhereWithoutCountryInput> = z.strictObject({
  where: z.lazy(() => BusinessScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BusinessUpdateManyMutationInputSchema), z.lazy(() => BusinessUncheckedUpdateManyWithoutCountryInputSchema) ]),
});

export const CountryCreateWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateWithoutStatesInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  businesses: z.lazy(() => BusinessCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryUncheckedCreateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutStatesInput> = z.strictObject({
  code: z.string(),
  name: z.string(),
  phoneCode: z.string().optional().nullable(),
  id: z.uuid().optional(),
  businesses: z.lazy(() => BusinessUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
});

export const CountryCreateOrConnectWithoutStatesInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutStatesInput> = z.strictObject({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]),
});

export const CityCreateWithoutStateInputSchema: z.ZodType<Prisma.CityCreateWithoutStateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutCityInputSchema).optional(),
});

export const CityUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutStateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutCityInputSchema).optional(),
});

export const CityCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutStateInput> = z.strictObject({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema) ]),
});

export const CityCreateManyStateInputEnvelopeSchema: z.ZodType<Prisma.CityCreateManyStateInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => CityCreateManyStateInputSchema), z.lazy(() => CityCreateManyStateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const BranchCreateWithoutStateInputSchema: z.ZodType<Prisma.BranchCreateWithoutStateInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutStateInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutStateInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema) ]),
});

export const BranchCreateManyStateInputEnvelopeSchema: z.ZodType<Prisma.BranchCreateManyStateInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BranchCreateManyStateInputSchema), z.lazy(() => BranchCreateManyStateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CountryUpsertWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpsertWithoutStatesInput> = z.strictObject({
  update: z.union([ z.lazy(() => CountryUpdateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedCreateWithoutStatesInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional(),
});

export const CountryUpdateToOneWithWhereWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutStatesInput> = z.strictObject({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutStatesInputSchema), z.lazy(() => CountryUncheckedUpdateWithoutStatesInputSchema) ]),
});

export const CountryUpdateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUpdateWithoutStatesInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businesses: z.lazy(() => BusinessUpdateManyWithoutCountryNestedInputSchema).optional(),
});

export const CountryUncheckedUpdateWithoutStatesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutStatesInput> = z.strictObject({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businesses: z.lazy(() => BusinessUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
});

export const CityUpsertWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutStateInput> = z.strictObject({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CityUpdateWithoutStateInputSchema), z.lazy(() => CityUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutStateInputSchema), z.lazy(() => CityUncheckedCreateWithoutStateInputSchema) ]),
});

export const CityUpdateWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutStateInput> = z.strictObject({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CityUpdateWithoutStateInputSchema), z.lazy(() => CityUncheckedUpdateWithoutStateInputSchema) ]),
});

export const CityUpdateManyWithWhereWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutStateInput> = z.strictObject({
  where: z.lazy(() => CityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CityUpdateManyMutationInputSchema), z.lazy(() => CityUncheckedUpdateManyWithoutStateInputSchema) ]),
});

export const CityScalarWhereInputSchema: z.ZodType<Prisma.CityScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CityScalarWhereInputSchema), z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereInputSchema), z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  stateId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const BranchUpsertWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.BranchUpsertWithWhereUniqueWithoutStateInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BranchUpdateWithoutStateInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutStateInputSchema), z.lazy(() => BranchUncheckedCreateWithoutStateInputSchema) ]),
});

export const BranchUpdateWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.BranchUpdateWithWhereUniqueWithoutStateInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateWithoutStateInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutStateInputSchema) ]),
});

export const BranchUpdateManyWithWhereWithoutStateInputSchema: z.ZodType<Prisma.BranchUpdateManyWithWhereWithoutStateInput> = z.strictObject({
  where: z.lazy(() => BranchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateManyMutationInputSchema), z.lazy(() => BranchUncheckedUpdateManyWithoutStateInputSchema) ]),
});

export const StateCreateWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateWithoutCitiesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  country: z.lazy(() => CountryCreateNestedOneWithoutStatesInputSchema),
  branches: z.lazy(() => BranchCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateUncheckedCreateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutCitiesInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
  branches: z.lazy(() => BranchUncheckedCreateNestedManyWithoutStateInputSchema).optional(),
});

export const StateCreateOrConnectWithoutCitiesInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutCitiesInput> = z.strictObject({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]),
});

export const BranchCreateWithoutCityInputSchema: z.ZodType<Prisma.BranchCreateWithoutCityInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutCityInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutCityInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutCityInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutCityInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema) ]),
});

export const BranchCreateManyCityInputEnvelopeSchema: z.ZodType<Prisma.BranchCreateManyCityInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BranchCreateManyCityInputSchema), z.lazy(() => BranchCreateManyCityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const StateUpsertWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpsertWithoutCitiesInput> = z.strictObject({
  update: z.union([ z.lazy(() => StateUpdateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedCreateWithoutCitiesInputSchema) ]),
  where: z.lazy(() => StateWhereInputSchema).optional(),
});

export const StateUpdateToOneWithWhereWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpdateToOneWithWhereWithoutCitiesInput> = z.strictObject({
  where: z.lazy(() => StateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StateUpdateWithoutCitiesInputSchema), z.lazy(() => StateUncheckedUpdateWithoutCitiesInputSchema) ]),
});

export const StateUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUpdateWithoutCitiesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutStatesNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateUncheckedUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutCitiesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const BranchUpsertWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.BranchUpsertWithWhereUniqueWithoutCityInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BranchUpdateWithoutCityInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutCityInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutCityInputSchema), z.lazy(() => BranchUncheckedCreateWithoutCityInputSchema) ]),
});

export const BranchUpdateWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.BranchUpdateWithWhereUniqueWithoutCityInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateWithoutCityInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutCityInputSchema) ]),
});

export const BranchUpdateManyWithWhereWithoutCityInputSchema: z.ZodType<Prisma.BranchUpdateManyWithWhereWithoutCityInput> = z.strictObject({
  where: z.lazy(() => BranchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BranchUpdateManyMutationInputSchema), z.lazy(() => BranchUncheckedUpdateManyWithoutCityInputSchema) ]),
});

export const BranchCreateWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchCreateWithoutBusinessHoursInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutBranchesInputSchema),
  state: z.lazy(() => StateCreateNestedOneWithoutBranchesInputSchema),
  business: z.lazy(() => BusinessCreateNestedOneWithoutBranchesInputSchema),
  users: z.lazy(() => UserCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchUncheckedCreateWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchUncheckedCreateWithoutBusinessHoursInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
  businessId: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedCreateNestedManyWithoutBranchInputSchema).optional(),
});

export const BranchCreateOrConnectWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchCreateOrConnectWithoutBusinessHoursInput> = z.strictObject({
  where: z.lazy(() => BranchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessHoursInputSchema) ]),
});

export const BranchUpsertWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchUpsertWithoutBusinessHoursInput> = z.strictObject({
  update: z.union([ z.lazy(() => BranchUpdateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutBusinessHoursInputSchema) ]),
  create: z.union([ z.lazy(() => BranchCreateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedCreateWithoutBusinessHoursInputSchema) ]),
  where: z.lazy(() => BranchWhereInputSchema).optional(),
});

export const BranchUpdateToOneWithWhereWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchUpdateToOneWithWhereWithoutBusinessHoursInput> = z.strictObject({
  where: z.lazy(() => BranchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BranchUpdateWithoutBusinessHoursInputSchema), z.lazy(() => BranchUncheckedUpdateWithoutBusinessHoursInputSchema) ]),
});

export const BranchUpdateWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchUpdateWithoutBusinessHoursInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutBusinessHoursInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutBusinessHoursInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const UserCreateWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserCreateWithoutVerificationCodesInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVerificationCodesInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVerificationCodesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerificationCodesInputSchema) ]),
});

export const UserUpsertWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserUpsertWithoutVerificationCodesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerificationCodesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedCreateWithoutVerificationCodesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVerificationCodesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVerificationCodesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutVerificationCodesInputSchema) ]),
});

export const UserUpdateWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserUpdateWithoutVerificationCodesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutVerificationCodesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVerificationCodesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountStatusInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenant: z.lazy(() => TenantCreateNestedOneWithoutUsersInputSchema).optional(),
  branch: z.lazy(() => BranchCreateNestedOneWithoutUsersInputSchema).optional(),
  reviews: z.lazy(() => ReviewsCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountStatusInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountStatusInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountStatusInputSchema) ]),
});

export const UserUpsertWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountStatusInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountStatusInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountStatusInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountStatusInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountStatusInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountStatusInputSchema) ]),
});

export const UserUpdateWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountStatusInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAccountStatusInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountStatusInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const TenantCreateManyBusinessInputSchema: z.ZodType<Prisma.TenantCreateManyBusinessInput> = z.strictObject({
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BranchCreateManyBusinessInputSchema: z.ZodType<Prisma.BranchCreateManyBusinessInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  stateId: z.string(),
});

export const ProductCreateManyBusinessInputSchema: z.ZodType<Prisma.ProductCreateManyBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  productCategoryId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUpdateWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  productCategory: z.lazy(() => ProductCategoryUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
});

export const UserUpdateWithoutTenantInputSchema: z.ZodType<Prisma.UserUpdateWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branch: z.lazy(() => BranchUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutTenantInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTenantInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserCreateManyBranchInputSchema: z.ZodType<Prisma.UserCreateManyBranchInput> = z.strictObject({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  names: z.string(),
  maternal_surname: z.string(),
  paternal_surname: z.string(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  tenantId: z.string().optional().nullable(),
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

export const BusinessHoursCreateManyBranchInputSchema: z.ZodType<Prisma.BusinessHoursCreateManyBranchInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dayOfWeek: z.lazy(() => DayOfWeekSchema),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
});

export const UserUpdateWithoutBranchInputSchema: z.ZodType<Prisma.UserUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenant: z.lazy(() => TenantUpdateOneWithoutUsersNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  verificationCodes: z.lazy(() => VerificationCodeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accountStatus: z.lazy(() => AccountStatusUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  names: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  maternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paternal_surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tenantId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const BusinessHoursUpdateWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessHoursUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const BusinessHoursUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.BusinessHoursUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => DayOfWeekSchema), z.lazy(() => EnumDayOfWeekFieldUpdateOperationsInputSchema) ]).optional(),
  isOpen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  closeTime: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const VerificationCodeCreateManyUserInputSchema: z.ZodType<Prisma.VerificationCodeCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  code: z.string(),
  expiresAt: z.coerce.date(),
  type: z.lazy(() => VerificationTypeSchema),
  status: z.lazy(() => CodeStatusSchema).optional(),
});

export const AccountStatusCreateManyUserInputSchema: z.ZodType<Prisma.AccountStatusCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
  type: z.lazy(() => VerificationTypeSchema),
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

export const VerificationCodeUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationCodeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationCodeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VerificationCodeUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => CodeStatusSchema), z.lazy(() => EnumCodeStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountStatusUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountStatusUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => VerificationTypeSchema), z.lazy(() => EnumVerificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
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
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  quantity: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  sizeLabel: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const ProductVariantCreateManyProductInputSchema: z.ZodType<Prisma.ProductVariantCreateManyProductInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  isActive: z.boolean().optional(),
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
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PriceUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sizeLabel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUncheckedUpdateWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductVariantUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.ProductVariantUncheckedUpdateManyWithoutProductInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutBusinessesNestedInputSchema).optional(),
  tenants: z.lazy(() => TenantUpdateManyWithoutBusinessNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutBusinessNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutBusinessNestedInputSchema).optional(),
  productCategories: z.lazy(() => ProductCategoryUpdateManyWithoutBusinessNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBusinessNestedInputSchema).optional(),
});

export const BusinessUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutCategoriesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProductCreateManyProductCategoryInputSchema: z.ZodType<Prisma.ProductCreateManyProductCategoryInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  baseUnit: z.lazy(() => BaseUnitSchema).optional(),
  imageUrl: z.string().optional().nullable(),
  imageId: z.string().optional().nullable(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const ProductUpdateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  productVariants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutProductCategoryInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductCategoryInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  baseUnit: z.union([ z.lazy(() => BaseUnitSchema), z.lazy(() => EnumBaseUnitFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const StateCreateManyCountryInputSchema: z.ZodType<Prisma.StateCreateManyCountryInput> = z.strictObject({
  id: z.uuid().optional(),
  code: z.string(),
  name: z.string(),
});

export const BusinessCreateManyCountryInputSchema: z.ZodType<Prisma.BusinessCreateManyCountryInput> = z.strictObject({
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const StateUpdateWithoutCountryInputSchema: z.ZodType<Prisma.StateUpdateWithoutCountryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutStateNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutCountryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutStateNestedInputSchema).optional(),
});

export const StateUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyWithoutCountryInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BusinessUpdateWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUpdateWithoutCountryInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const BusinessUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateWithoutCountryInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const BusinessUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.BusinessUncheckedUpdateManyWithoutCountryInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timezone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rfc: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CityCreateManyStateInputSchema: z.ZodType<Prisma.CityCreateManyStateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
});

export const BranchCreateManyStateInputSchema: z.ZodType<Prisma.BranchCreateManyStateInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cityId: z.string(),
  businessId: z.string(),
});

export const CityUpdateWithoutStateInputSchema: z.ZodType<Prisma.CityUpdateWithoutStateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUpdateManyWithoutCityNestedInputSchema).optional(),
});

export const CityUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutStateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  branches: z.lazy(() => BranchUncheckedUpdateManyWithoutCityNestedInputSchema).optional(),
});

export const CityUncheckedUpdateManyWithoutStateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutStateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchUpdateWithoutStateInputSchema: z.ZodType<Prisma.BranchUpdateWithoutStateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.lazy(() => CityUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutStateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateManyWithoutStateInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutStateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BranchCreateManyCityInputSchema: z.ZodType<Prisma.BranchCreateManyCityInput> = z.strictObject({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stateId: z.string(),
  businessId: z.string(),
});

export const BranchUpdateWithoutCityInputSchema: z.ZodType<Prisma.BranchUpdateWithoutCityInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutBranchesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateWithoutCityInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateWithoutCityInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewsUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  exchangeRates: z.lazy(() => ExchangeRateUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
  businessHours: z.lazy(() => BusinessHoursUncheckedUpdateManyWithoutBranchNestedInputSchema).optional(),
});

export const BranchUncheckedUpdateManyWithoutCityInputSchema: z.ZodType<Prisma.BranchUncheckedUpdateManyWithoutCityInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ProductVariantFindFirstArgsSchema: z.ZodType<Prisma.ProductVariantFindFirstArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereInputSchema.optional(), 
  orderBy: z.union([ ProductVariantOrderByWithRelationInputSchema.array(), ProductVariantOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductVariantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductVariantScalarFieldEnumSchema, ProductVariantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductVariantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductVariantFindFirstOrThrowArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereInputSchema.optional(), 
  orderBy: z.union([ ProductVariantOrderByWithRelationInputSchema.array(), ProductVariantOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductVariantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductVariantScalarFieldEnumSchema, ProductVariantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductVariantFindManyArgsSchema: z.ZodType<Prisma.ProductVariantFindManyArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereInputSchema.optional(), 
  orderBy: z.union([ ProductVariantOrderByWithRelationInputSchema.array(), ProductVariantOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductVariantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductVariantScalarFieldEnumSchema, ProductVariantScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProductVariantAggregateArgsSchema: z.ZodType<Prisma.ProductVariantAggregateArgs> = z.object({
  where: ProductVariantWhereInputSchema.optional(), 
  orderBy: z.union([ ProductVariantOrderByWithRelationInputSchema.array(), ProductVariantOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductVariantWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductVariantGroupByArgsSchema: z.ZodType<Prisma.ProductVariantGroupByArgs> = z.object({
  where: ProductVariantWhereInputSchema.optional(), 
  orderBy: z.union([ ProductVariantOrderByWithAggregationInputSchema.array(), ProductVariantOrderByWithAggregationInputSchema ]).optional(),
  by: ProductVariantScalarFieldEnumSchema.array(), 
  having: ProductVariantScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProductVariantFindUniqueArgsSchema: z.ZodType<Prisma.ProductVariantFindUniqueArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereUniqueInputSchema, 
}).strict();

export const ProductVariantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductVariantFindUniqueOrThrowArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereUniqueInputSchema, 
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

export const CountryFindFirstArgsSchema: z.ZodType<Prisma.CountryFindFirstArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(), 
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(), CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema, CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CountryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CountryFindFirstOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(), 
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(), CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema, CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CountryFindManyArgsSchema: z.ZodType<Prisma.CountryFindManyArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(), 
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(), CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema, CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CountryAggregateArgsSchema: z.ZodType<Prisma.CountryAggregateArgs> = z.object({
  where: CountryWhereInputSchema.optional(), 
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(), CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CountryGroupByArgsSchema: z.ZodType<Prisma.CountryGroupByArgs> = z.object({
  where: CountryWhereInputSchema.optional(), 
  orderBy: z.union([ CountryOrderByWithAggregationInputSchema.array(), CountryOrderByWithAggregationInputSchema ]).optional(),
  by: CountryScalarFieldEnumSchema.array(), 
  having: CountryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CountryFindUniqueArgsSchema: z.ZodType<Prisma.CountryFindUniqueArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema, 
}).strict();

export const CountryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CountryFindUniqueOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema, 
}).strict();

export const StateFindFirstArgsSchema: z.ZodType<Prisma.StateFindFirstArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(), 
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(), StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema, StateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StateFindFirstOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(), 
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(), StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema, StateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StateFindManyArgsSchema: z.ZodType<Prisma.StateFindManyArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(), 
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(), StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema, StateScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const StateAggregateArgsSchema: z.ZodType<Prisma.StateAggregateArgs> = z.object({
  where: StateWhereInputSchema.optional(), 
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(), StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StateGroupByArgsSchema: z.ZodType<Prisma.StateGroupByArgs> = z.object({
  where: StateWhereInputSchema.optional(), 
  orderBy: z.union([ StateOrderByWithAggregationInputSchema.array(), StateOrderByWithAggregationInputSchema ]).optional(),
  by: StateScalarFieldEnumSchema.array(), 
  having: StateScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const StateFindUniqueArgsSchema: z.ZodType<Prisma.StateFindUniqueArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema, 
}).strict();

export const StateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StateFindUniqueOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema, 
}).strict();

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(), 
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(), CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema, CityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(), 
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(), CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema, CityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(), 
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(), CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema, CityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(), 
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(), CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(), 
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(), CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(), 
  having: CityScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema, 
}).strict();

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema, 
}).strict();

export const BusinessHoursFindFirstArgsSchema: z.ZodType<Prisma.BusinessHoursFindFirstArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessHoursOrderByWithRelationInputSchema.array(), BusinessHoursOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessHoursWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessHoursScalarFieldEnumSchema, BusinessHoursScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessHoursFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BusinessHoursFindFirstOrThrowArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessHoursOrderByWithRelationInputSchema.array(), BusinessHoursOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessHoursWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessHoursScalarFieldEnumSchema, BusinessHoursScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessHoursFindManyArgsSchema: z.ZodType<Prisma.BusinessHoursFindManyArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessHoursOrderByWithRelationInputSchema.array(), BusinessHoursOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessHoursWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BusinessHoursScalarFieldEnumSchema, BusinessHoursScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BusinessHoursAggregateArgsSchema: z.ZodType<Prisma.BusinessHoursAggregateArgs> = z.object({
  where: BusinessHoursWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessHoursOrderByWithRelationInputSchema.array(), BusinessHoursOrderByWithRelationInputSchema ]).optional(),
  cursor: BusinessHoursWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessHoursGroupByArgsSchema: z.ZodType<Prisma.BusinessHoursGroupByArgs> = z.object({
  where: BusinessHoursWhereInputSchema.optional(), 
  orderBy: z.union([ BusinessHoursOrderByWithAggregationInputSchema.array(), BusinessHoursOrderByWithAggregationInputSchema ]).optional(),
  by: BusinessHoursScalarFieldEnumSchema.array(), 
  having: BusinessHoursScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BusinessHoursFindUniqueArgsSchema: z.ZodType<Prisma.BusinessHoursFindUniqueArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereUniqueInputSchema, 
}).strict();

export const BusinessHoursFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BusinessHoursFindUniqueOrThrowArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereUniqueInputSchema, 
}).strict();

export const VerificationCodeFindFirstArgsSchema: z.ZodType<Prisma.VerificationCodeFindFirstArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationCodeOrderByWithRelationInputSchema.array(), VerificationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationCodeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationCodeScalarFieldEnumSchema, VerificationCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationCodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationCodeFindFirstOrThrowArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationCodeOrderByWithRelationInputSchema.array(), VerificationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationCodeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationCodeScalarFieldEnumSchema, VerificationCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationCodeFindManyArgsSchema: z.ZodType<Prisma.VerificationCodeFindManyArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationCodeOrderByWithRelationInputSchema.array(), VerificationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationCodeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationCodeScalarFieldEnumSchema, VerificationCodeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationCodeAggregateArgsSchema: z.ZodType<Prisma.VerificationCodeAggregateArgs> = z.object({
  where: VerificationCodeWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationCodeOrderByWithRelationInputSchema.array(), VerificationCodeOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationCodeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationCodeGroupByArgsSchema: z.ZodType<Prisma.VerificationCodeGroupByArgs> = z.object({
  where: VerificationCodeWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationCodeOrderByWithAggregationInputSchema.array(), VerificationCodeOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationCodeScalarFieldEnumSchema.array(), 
  having: VerificationCodeScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationCodeFindUniqueArgsSchema: z.ZodType<Prisma.VerificationCodeFindUniqueArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereUniqueInputSchema, 
}).strict();

export const VerificationCodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationCodeFindUniqueOrThrowArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereUniqueInputSchema, 
}).strict();

export const AccountStatusFindFirstArgsSchema: z.ZodType<Prisma.AccountStatusFindFirstArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereInputSchema.optional(), 
  orderBy: z.union([ AccountStatusOrderByWithRelationInputSchema.array(), AccountStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountStatusWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountStatusScalarFieldEnumSchema, AccountStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountStatusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountStatusFindFirstOrThrowArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereInputSchema.optional(), 
  orderBy: z.union([ AccountStatusOrderByWithRelationInputSchema.array(), AccountStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountStatusWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountStatusScalarFieldEnumSchema, AccountStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountStatusFindManyArgsSchema: z.ZodType<Prisma.AccountStatusFindManyArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereInputSchema.optional(), 
  orderBy: z.union([ AccountStatusOrderByWithRelationInputSchema.array(), AccountStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountStatusWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountStatusScalarFieldEnumSchema, AccountStatusScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountStatusAggregateArgsSchema: z.ZodType<Prisma.AccountStatusAggregateArgs> = z.object({
  where: AccountStatusWhereInputSchema.optional(), 
  orderBy: z.union([ AccountStatusOrderByWithRelationInputSchema.array(), AccountStatusOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountStatusWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountStatusGroupByArgsSchema: z.ZodType<Prisma.AccountStatusGroupByArgs> = z.object({
  where: AccountStatusWhereInputSchema.optional(), 
  orderBy: z.union([ AccountStatusOrderByWithAggregationInputSchema.array(), AccountStatusOrderByWithAggregationInputSchema ]).optional(),
  by: AccountStatusScalarFieldEnumSchema.array(), 
  having: AccountStatusScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountStatusFindUniqueArgsSchema: z.ZodType<Prisma.AccountStatusFindUniqueArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereUniqueInputSchema, 
}).strict();

export const AccountStatusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountStatusFindUniqueOrThrowArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereUniqueInputSchema, 
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

export const ProductVariantCreateArgsSchema: z.ZodType<Prisma.ProductVariantCreateArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  data: z.union([ ProductVariantCreateInputSchema, ProductVariantUncheckedCreateInputSchema ]),
}).strict();

export const ProductVariantUpsertArgsSchema: z.ZodType<Prisma.ProductVariantUpsertArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereUniqueInputSchema, 
  create: z.union([ ProductVariantCreateInputSchema, ProductVariantUncheckedCreateInputSchema ]),
  update: z.union([ ProductVariantUpdateInputSchema, ProductVariantUncheckedUpdateInputSchema ]),
}).strict();

export const ProductVariantCreateManyArgsSchema: z.ZodType<Prisma.ProductVariantCreateManyArgs> = z.object({
  data: z.union([ ProductVariantCreateManyInputSchema, ProductVariantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductVariantCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductVariantCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductVariantCreateManyInputSchema, ProductVariantCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProductVariantDeleteArgsSchema: z.ZodType<Prisma.ProductVariantDeleteArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  where: ProductVariantWhereUniqueInputSchema, 
}).strict();

export const ProductVariantUpdateArgsSchema: z.ZodType<Prisma.ProductVariantUpdateArgs> = z.object({
  select: ProductVariantSelectSchema.optional(),
  include: ProductVariantIncludeSchema.optional(),
  data: z.union([ ProductVariantUpdateInputSchema, ProductVariantUncheckedUpdateInputSchema ]),
  where: ProductVariantWhereUniqueInputSchema, 
}).strict();

export const ProductVariantUpdateManyArgsSchema: z.ZodType<Prisma.ProductVariantUpdateManyArgs> = z.object({
  data: z.union([ ProductVariantUpdateManyMutationInputSchema, ProductVariantUncheckedUpdateManyInputSchema ]),
  where: ProductVariantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductVariantUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductVariantUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProductVariantUpdateManyMutationInputSchema, ProductVariantUncheckedUpdateManyInputSchema ]),
  where: ProductVariantWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProductVariantDeleteManyArgsSchema: z.ZodType<Prisma.ProductVariantDeleteManyArgs> = z.object({
  where: ProductVariantWhereInputSchema.optional(), 
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

export const CountryCreateArgsSchema: z.ZodType<Prisma.CountryCreateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryCreateInputSchema, CountryUncheckedCreateInputSchema ]),
}).strict();

export const CountryUpsertArgsSchema: z.ZodType<Prisma.CountryUpsertArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema, 
  create: z.union([ CountryCreateInputSchema, CountryUncheckedCreateInputSchema ]),
  update: z.union([ CountryUpdateInputSchema, CountryUncheckedUpdateInputSchema ]),
}).strict();

export const CountryCreateManyArgsSchema: z.ZodType<Prisma.CountryCreateManyArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema, CountryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CountryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema, CountryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CountryDeleteArgsSchema: z.ZodType<Prisma.CountryDeleteArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema, 
}).strict();

export const CountryUpdateArgsSchema: z.ZodType<Prisma.CountryUpdateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryUpdateInputSchema, CountryUncheckedUpdateInputSchema ]),
  where: CountryWhereUniqueInputSchema, 
}).strict();

export const CountryUpdateManyArgsSchema: z.ZodType<Prisma.CountryUpdateManyArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema, CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CountryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CountryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema, CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CountryDeleteManyArgsSchema: z.ZodType<Prisma.CountryDeleteManyArgs> = z.object({
  where: CountryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StateCreateArgsSchema: z.ZodType<Prisma.StateCreateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateCreateInputSchema, StateUncheckedCreateInputSchema ]),
}).strict();

export const StateUpsertArgsSchema: z.ZodType<Prisma.StateUpsertArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema, 
  create: z.union([ StateCreateInputSchema, StateUncheckedCreateInputSchema ]),
  update: z.union([ StateUpdateInputSchema, StateUncheckedUpdateInputSchema ]),
}).strict();

export const StateCreateManyArgsSchema: z.ZodType<Prisma.StateCreateManyArgs> = z.object({
  data: z.union([ StateCreateManyInputSchema, StateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StateCreateManyAndReturnArgs> = z.object({
  data: z.union([ StateCreateManyInputSchema, StateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const StateDeleteArgsSchema: z.ZodType<Prisma.StateDeleteArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema, 
}).strict();

export const StateUpdateArgsSchema: z.ZodType<Prisma.StateUpdateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateUpdateInputSchema, StateUncheckedUpdateInputSchema ]),
  where: StateWhereUniqueInputSchema, 
}).strict();

export const StateUpdateManyArgsSchema: z.ZodType<Prisma.StateUpdateManyArgs> = z.object({
  data: z.union([ StateUpdateManyMutationInputSchema, StateUncheckedUpdateManyInputSchema ]),
  where: StateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StateUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StateUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StateUpdateManyMutationInputSchema, StateUncheckedUpdateManyInputSchema ]),
  where: StateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const StateDeleteManyArgsSchema: z.ZodType<Prisma.StateDeleteManyArgs> = z.object({
  where: StateWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityCreateInputSchema, CityUncheckedCreateInputSchema ]),
}).strict();

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema, 
  create: z.union([ CityCreateInputSchema, CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema, CityUncheckedUpdateInputSchema ]),
}).strict();

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema, CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema, CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema, 
}).strict();

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityUpdateInputSchema, CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema, 
}).strict();

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema, CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema, CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessHoursCreateArgsSchema: z.ZodType<Prisma.BusinessHoursCreateArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  data: z.union([ BusinessHoursCreateInputSchema, BusinessHoursUncheckedCreateInputSchema ]),
}).strict();

export const BusinessHoursUpsertArgsSchema: z.ZodType<Prisma.BusinessHoursUpsertArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereUniqueInputSchema, 
  create: z.union([ BusinessHoursCreateInputSchema, BusinessHoursUncheckedCreateInputSchema ]),
  update: z.union([ BusinessHoursUpdateInputSchema, BusinessHoursUncheckedUpdateInputSchema ]),
}).strict();

export const BusinessHoursCreateManyArgsSchema: z.ZodType<Prisma.BusinessHoursCreateManyArgs> = z.object({
  data: z.union([ BusinessHoursCreateManyInputSchema, BusinessHoursCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessHoursCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessHoursCreateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessHoursCreateManyInputSchema, BusinessHoursCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BusinessHoursDeleteArgsSchema: z.ZodType<Prisma.BusinessHoursDeleteArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  where: BusinessHoursWhereUniqueInputSchema, 
}).strict();

export const BusinessHoursUpdateArgsSchema: z.ZodType<Prisma.BusinessHoursUpdateArgs> = z.object({
  select: BusinessHoursSelectSchema.optional(),
  include: BusinessHoursIncludeSchema.optional(),
  data: z.union([ BusinessHoursUpdateInputSchema, BusinessHoursUncheckedUpdateInputSchema ]),
  where: BusinessHoursWhereUniqueInputSchema, 
}).strict();

export const BusinessHoursUpdateManyArgsSchema: z.ZodType<Prisma.BusinessHoursUpdateManyArgs> = z.object({
  data: z.union([ BusinessHoursUpdateManyMutationInputSchema, BusinessHoursUncheckedUpdateManyInputSchema ]),
  where: BusinessHoursWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessHoursUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BusinessHoursUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BusinessHoursUpdateManyMutationInputSchema, BusinessHoursUncheckedUpdateManyInputSchema ]),
  where: BusinessHoursWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BusinessHoursDeleteManyArgsSchema: z.ZodType<Prisma.BusinessHoursDeleteManyArgs> = z.object({
  where: BusinessHoursWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationCodeCreateArgsSchema: z.ZodType<Prisma.VerificationCodeCreateArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  data: z.union([ VerificationCodeCreateInputSchema, VerificationCodeUncheckedCreateInputSchema ]),
}).strict();

export const VerificationCodeUpsertArgsSchema: z.ZodType<Prisma.VerificationCodeUpsertArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereUniqueInputSchema, 
  create: z.union([ VerificationCodeCreateInputSchema, VerificationCodeUncheckedCreateInputSchema ]),
  update: z.union([ VerificationCodeUpdateInputSchema, VerificationCodeUncheckedUpdateInputSchema ]),
}).strict();

export const VerificationCodeCreateManyArgsSchema: z.ZodType<Prisma.VerificationCodeCreateManyArgs> = z.object({
  data: z.union([ VerificationCodeCreateManyInputSchema, VerificationCodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationCodeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCodeCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCodeCreateManyInputSchema, VerificationCodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationCodeDeleteArgsSchema: z.ZodType<Prisma.VerificationCodeDeleteArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  where: VerificationCodeWhereUniqueInputSchema, 
}).strict();

export const VerificationCodeUpdateArgsSchema: z.ZodType<Prisma.VerificationCodeUpdateArgs> = z.object({
  select: VerificationCodeSelectSchema.optional(),
  include: VerificationCodeIncludeSchema.optional(),
  data: z.union([ VerificationCodeUpdateInputSchema, VerificationCodeUncheckedUpdateInputSchema ]),
  where: VerificationCodeWhereUniqueInputSchema, 
}).strict();

export const VerificationCodeUpdateManyArgsSchema: z.ZodType<Prisma.VerificationCodeUpdateManyArgs> = z.object({
  data: z.union([ VerificationCodeUpdateManyMutationInputSchema, VerificationCodeUncheckedUpdateManyInputSchema ]),
  where: VerificationCodeWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationCodeUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCodeUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCodeUpdateManyMutationInputSchema, VerificationCodeUncheckedUpdateManyInputSchema ]),
  where: VerificationCodeWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationCodeDeleteManyArgsSchema: z.ZodType<Prisma.VerificationCodeDeleteManyArgs> = z.object({
  where: VerificationCodeWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountStatusCreateArgsSchema: z.ZodType<Prisma.AccountStatusCreateArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  data: z.union([ AccountStatusCreateInputSchema, AccountStatusUncheckedCreateInputSchema ]),
}).strict();

export const AccountStatusUpsertArgsSchema: z.ZodType<Prisma.AccountStatusUpsertArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereUniqueInputSchema, 
  create: z.union([ AccountStatusCreateInputSchema, AccountStatusUncheckedCreateInputSchema ]),
  update: z.union([ AccountStatusUpdateInputSchema, AccountStatusUncheckedUpdateInputSchema ]),
}).strict();

export const AccountStatusCreateManyArgsSchema: z.ZodType<Prisma.AccountStatusCreateManyArgs> = z.object({
  data: z.union([ AccountStatusCreateManyInputSchema, AccountStatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountStatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountStatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountStatusCreateManyInputSchema, AccountStatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountStatusDeleteArgsSchema: z.ZodType<Prisma.AccountStatusDeleteArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  where: AccountStatusWhereUniqueInputSchema, 
}).strict();

export const AccountStatusUpdateArgsSchema: z.ZodType<Prisma.AccountStatusUpdateArgs> = z.object({
  select: AccountStatusSelectSchema.optional(),
  include: AccountStatusIncludeSchema.optional(),
  data: z.union([ AccountStatusUpdateInputSchema, AccountStatusUncheckedUpdateInputSchema ]),
  where: AccountStatusWhereUniqueInputSchema, 
}).strict();

export const AccountStatusUpdateManyArgsSchema: z.ZodType<Prisma.AccountStatusUpdateManyArgs> = z.object({
  data: z.union([ AccountStatusUpdateManyMutationInputSchema, AccountStatusUncheckedUpdateManyInputSchema ]),
  where: AccountStatusWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountStatusUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountStatusUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountStatusUpdateManyMutationInputSchema, AccountStatusUncheckedUpdateManyInputSchema ]),
  where: AccountStatusWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountStatusDeleteManyArgsSchema: z.ZodType<Prisma.AccountStatusDeleteManyArgs> = z.object({
  where: AccountStatusWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();