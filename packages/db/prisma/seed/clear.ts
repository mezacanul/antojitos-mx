export async function clearDatabase(prisma: any) {
  try {
    const transaction = await prisma.$transaction(
      async (tx: any) => {
        // Delete in this order:
        await tx.price.deleteMany();
        await tx.product.deleteMany();
        await tx.productVariant.deleteMany();
        await tx.productCategory.deleteMany();
        await tx.businessHours.deleteMany();
        await tx.verificationCode.deleteMany();
        await tx.accountStatus.deleteMany();

        await tx.branch.deleteMany();
        await tx.tenant.deleteMany();
        await tx.business.deleteMany();
        await tx.user.deleteMany();

        return true;
      }
    );
    return transaction;
  } catch (error) {
    // console.error(error);
    throw error;
  }
}
