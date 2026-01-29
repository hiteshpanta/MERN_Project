import { useParams } from "react-router"
import { useGetOrderQuery } from "./orderApi";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { base } from "../../app/mainApi";

export default function Order() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderQuery(id);

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>

  return (
    <div>

      {data && <div>
        <h3>OrderId: {data.order._id}</h3>
        <p className="text-slate-600">CreatedAt: {data.order.createdAt}</p>
        <hr />
        <div className="mt-5">
          {data.order.products.map((item) => {
            return <div key={item._id} className="flex gap-5">
              <div>
                <Avatar className="size-20">
                  <AvatarImage src={`${base}/${item.product?.image}`} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>


              </div>
              <div className="space-y-2">
                <p>Product: {item.product?.title}</p>
                <p>Price: Rs.{item.product?.price}</p>
                <p>Quantity: {item.quantity}</p>

              </div>

              <hr />
            </div>
          })}
        </div>
        <div className="mt-12">
          <h3>Total Amount: Rs.{data.order.totalAmount}</h3>
        </div>

      </div>}











    </div>
  )
}
