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

export const ProductScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','price','imageUrl','businessId','branchId','isDeleted']);

export const ReviewsScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','rating','comment','branchId','userId']);

export const FavoritesScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','productId','branchId','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['SYSTEM_ADMIN','TENANT_OWNER','BRANCH_MANAGER','GUEST']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const FavoriteTypeSchema = z.enum(['BRANCH','PRODUCT']);

export type FavoriteTypeType = `${z.infer<typeof FavoriteTypeSchema>}`

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
// SELECT & INCLUDE
/////////////////////////////////////////

// BUSINESS
//------------------------------------------------------

export const BusinessIncludeSchema: z.ZodType<Prisma.BusinessInclude> = z.object({
  tenants: z.union([z.boolean(),z.lazy(() => TenantFindManyArgsSchema)]).optional(),
  branches: z.union([z.boolean(),z.lazy(() => BranchFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
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
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
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
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  businessId: z.boolean().optional(),
  branchId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  business: z.union([z.boolean(),z.lazy(() => BusinessArgsSchema)]).optional(),
  branch: z.union([z.boolean(),z.lazy(() => BranchArgsSchema)]).optional(),
  favorites: z.union([z.boolean(),z.lazy(() => FavoritesFindManyArgsSchema)]).optional(),
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
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
});

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  businessId: z.lazy(() => SortOrderSchema).optional(),
  branchId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isDeleted: z.lazy(() => SortOrderSchema).optional(),
  business: z.lazy(() => BusinessOrderByWithRelationInputSchema).optional(),
  branch: z.lazy(() => BranchOrderByWithRelationInputSchema).optional(),
  favorites: z.lazy(() => FavoritesOrderByRelationAggregateInputSchema).optional(),
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
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  business: z.union([ z.lazy(() => BusinessScalarRelationFilterSchema), z.lazy(() => BusinessWhereInputSchema) ]).optional(),
  branch: z.union([ z.lazy(() => BranchNullableScalarRelationFilterSchema), z.lazy(() => BranchWhereInputSchema) ]).optional().nullable(),
  favorites: z.lazy(() => FavoritesListRelationFilterSchema).optional(),
}));

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.strictObject({
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
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.strictObject({
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
});

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.strictObject({
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

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
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

export const FavoritesUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.FavoritesUncheckedCreateNestedManyWithoutProductInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavoritesCreateWithoutProductInputSchema), z.lazy(() => FavoritesCreateWithoutProductInputSchema).array(), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema), z.lazy(() => FavoritesUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema), z.lazy(() => FavoritesCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoritesCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoritesWhereUniqueInputSchema), z.lazy(() => FavoritesWhereUniqueInputSchema).array() ]).optional(),
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
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutBusinessInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductCreateOrConnectWithoutBusinessInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutBusinessInput> = z.strictObject({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutBusinessInputSchema), z.lazy(() => ProductUncheckedCreateWithoutBusinessInputSchema) ]),
});

export const ProductCreateManyBusinessInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyBusinessInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProductCreateManyBusinessInputSchema), z.lazy(() => ProductCreateManyBusinessInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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
  businessId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  branchId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
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
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  favorites: z.lazy(() => FavoritesCreateNestedManyWithoutProductInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutBranchInput> = z.strictObject({
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  imageUrl: z.string().optional().nullable(),
  businessId: z.string(),
  isDeleted: z.boolean().optional(),
  favorites: z.lazy(() => FavoritesUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
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

export const BusinessCreateWithoutProductsInputSchema: z.ZodType<Prisma.BusinessCreateWithoutProductsInput> = z.strictObject({
  name: z.string(),
  slug: z.string(),
  rfc: z.string().optional().nullable(),
  id: z.cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tenants: z.lazy(() => TenantCreateNestedManyWithoutBusinessInputSchema).optional(),
  branches: z.lazy(() => BranchCreateNestedManyWithoutBusinessInputSchema).optional(),
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
  business: z.lazy(() => BusinessCreateNestedOneWithoutProductsInputSchema),
  branch: z.lazy(() => BranchCreateNestedOneWithoutProductsInputSchema).optional(),
});

export const ProductUncheckedCreateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutFavoritesInput> = z.strictObject({
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
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutFavoritesInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutFavoritesInput> = z.strictObject({
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
  branchId: z.string().optional().nullable(),
  isDeleted: z.boolean().optional(),
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
  branch: z.lazy(() => BranchUpdateOneWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutBusinessInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBusinessInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  branchId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  business: z.lazy(() => BusinessUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  favorites: z.lazy(() => FavoritesUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  businessId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isDeleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  favorites: z.lazy(() => FavoritesUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
});

export const ProductUncheckedUpdateManyWithoutBranchInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutBranchInput> = z.strictObject({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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