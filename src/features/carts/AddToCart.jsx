import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./cartSlice";
import { useNavigate } from "react-router";

export default function AddToCart({ product }) {
  const { carts } = useSelector((state) => state.cartSlice);
  const isExist = carts.find((cart) => cart.id === product._id);
  const [qty, setQty] = useState(isExist?.qty || 1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty - 1);
  const nav = useNavigate();
  const handleCart = () => {
    dispatch(setCart({
      id: product._id,
      title: product.title,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      image: product.image,
      qty
    }));
    nav('/checkout');
  }

  return (
    <div className="space-y-5">

      <div className="flex gap-4">
        <Button disabled={qty === 1} onClick={decrement}>
          <MinusIcon />
        </Button>

        <h3>{qty}</h3>
        <Button disabled={qty === product.stock} onClick={increment}>
          <PlusIcon />
        </Button>

      </div>

      <Button disabled={user?.role === 'admin' || !user} onClick={handleCart} size="lg" className={'bg-green-600'}>Add To Cart</Button>



    </div>
  )
}
