import { useParams } from "react-router"
import { useGetProductQuery } from "../products/productApi";
import ProductEditForm from "./ProductEditForm";

export default function ProductEdit() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-pink-950">{error}</h1>

  return (
    <>

      <h1 className="text-2xl font-bold">Product Edit</h1>
      <ProductEditForm product={data.product} />



    </>
  )
}
