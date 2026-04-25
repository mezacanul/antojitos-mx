import { getBusinessByUserId } from "@/lib/data/business";
import ContenidoCategoria from "@/components/Producto/ContenidoCategoria";
import ListaCategorias from "@/components/Producto/ListaCategorias";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const pcid = (await searchParams).pcid as string;
  console.log("pcid:", pcid);

  // If Product Category ID is provided,
  // show the product list
  if (pcid) {
    return <ContenidoCategoria pcid={pcid} />;
  }

  const business = await getBusinessByUserId();
  // console.log("Business:", business);
  const businessId = business.id;

  // // If no Product Category ID is provided,
  // // show the category list
  return <ListaCategorias businessId={businessId} />;
}
