import toast from "react-hot-toast";
import ShowDialog from "../../components/ShowDialog"
import { Button } from "../../components/ui/button"
import { useCreateOrderMutation } from "../orders/orderApi"
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/ui/spinner";
import { clearCart } from "./cartSlice";

export default function CheckOutPart({ carts }) {
  const dispatch = useDispatch();
  const [addOrder, { isLoading }] = useCreateOrderMutation();
  const totalAmount = carts.reduce((total, item) => total + item.price * item.qty, 0);
  const { user } = useSelector((state) => state.userSlice);

  const handleOrder = async () => {
    try {
      await addOrder({
        token: user.token,
        body: {
          products: carts.map((item) => ({
            product: item.id,
            quantity: item.qty
          })),
          totalAmount
        }

      }).unwrap();
      dispatch(clearCart());

      toast.success('Order placed successfully');
    } catch (err) {
      toast.error(err.data.message);
    }
  }
  return (
    <div className='flex items-center flex-col '>
      <h2>Order Summary</h2>

      <div className='space-y-4 mt-6'>
        {carts.map((item) => {
          return <div key={item.id}>
            <div className='flex justify-between gap-14'>
              <span>{item.title}</span>
              <span>{item.qty} X Rs.{item.price}</span>
            </div>
          </div>
        })}
        <p>Total Items: {carts.length}</p>
        <div>
          <p>Total Price: Rs. {carts.reduce((total, item) => total + item.price * item.qty, 0)}</p>
        </div>
      </div>

      <ShowDialog
        func={handleOrder}
        detail={' you want to buy products '}>
        <Button disabled={isLoading || !carts.length} className={' mt-9 px-9 bg-green-700'}>
          {isLoading && <Spinner />}
          Checkout</Button>
      </ShowDialog>

    </div>
  )
}
