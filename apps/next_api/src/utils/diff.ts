import {
  Price,
  ProductVariant,
} from "@antojitos-mx/shared";

function getDiffVariants(
  incoming: ProductVariant[],
  existing: ProductVariant[],
  productId: string
) {
  // 1. Get the incoming ids.
  // These are for the variants that already exist,
  // which are the ones that have an id.
  const incomingIds = incoming
    .map((v) => v.id)
    .filter(Boolean);

  // 2. Get the variants to delete.
  // These are the variants that exist in the database
  // but not in the incoming data. This is done by filtering
  const toDelete = existing.filter(
    (ex) => !incomingIds.includes(ex.id)
  );

  // 3. Get the variants to create.
  // These are the variants that don't exist in the database,
  // which are the ones that don't have an id.
  const toCreate = incoming
    .filter((inc) => !inc.id)
    .map((inc) => ({ ...inc, productId }));

  // 4. Get the variants to update.
  // These are the variants that exist in the database
  // and are in the incoming data, but have changed.
  // This is done by filtering the incoming data
  // and checking if the variant has changed.
  const toUpdate = incoming
    .filter((inc) => {
      const match = existing.find((ex) => ex.id === inc.id);
      return (
        match &&
        (match.name !== inc.name ||
          match.isActive !== inc.isActive)
      );
    })
    .map((v) => ({ id: v.id, data: v }));

  return {
    toDelete,
    toCreate,
    toUpdate,
  };
}

function getDiffPrices(
  incoming: Price[],
  existing: Price[],
  productId: string
) {
  const incomingIds = incoming
    .map((p) => p.id)
    .filter(Boolean);

  const toDelete = existing.filter(
    (ex) => !incomingIds.includes(ex.id)
  );

  const toCreate = incoming
    .filter((inc) => !inc.id)
    .map((inc) => ({ ...inc, productId }));

  // We need to cast the prices and quantities to strings
  // because Prisma.Decimal returns an object,
  // which is not compatible with the diff function
  // for equality comparison.
  const casted = {
    incoming: incoming.map((p) => ({
      ...p,
      price: String(p.price),
      quantity: String(p.quantity),
    })),
    existing: existing.map((p) => ({
      ...p,
      price: String(p.price),
      quantity: String(p.quantity),
    })),
  };
  const toUpdate = casted.incoming
    .filter((inc) => {
      const match = casted.existing.find(
        (ex) => ex.id === inc.id
      );
      return match && diffPriceParams(match, inc);
    })
    .map((p) => ({ id: p.id, data: p }));

  return {
    toDelete,
    toCreate,
    toUpdate,
  };
}

function diffPriceParams(match: any, inc: any) {
  return (
    match.price !== inc.price ||
    match.sizeLabel !== inc.sizeLabel ||
    match.quantity !== inc.quantity ||
    match.isActive !== inc.isActive
  );
}

export { getDiffVariants, getDiffPrices };
