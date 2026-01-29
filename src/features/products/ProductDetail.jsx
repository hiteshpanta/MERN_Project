import { useParams } from "react-router"
import { useGetProductQuery } from "./productApi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { base } from "../../app/mainApi";
import AddToCart from "../carts/AddToCart";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";
import { useSelector } from "react-redux";
import StarRating from "../reviews/StarRating.jsx";

export default function ProductDetail() {
  const { user } = useSelector((state) => state.userSlice);
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  if (isLoading) return <DotLottieReact
    src="/loading.lottie"
    loop
    autoplay
  />
  if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>



  return (
    <div>
      <div className=" max-w-7xl mx-auto grid grid-cols-2 mt-11 gap-10">
        <div>
          <img height={100} src={`${base}/${data.product.image}`} alt="" />
        </div>
        <div className="space-y-4 mt-5">
          <h1>{data.product.title}</h1>
          <StarRating value={data.product.rating} />
          <p className="text-zinc-500">Price:- {data.product.price}</p>
          <p className="text-zinc-500">Stock:- {data.product.stock}</p>
          <p className="text-zinc-700">{data.product.detail}</p>
          <hr />
          <div>
            <AddToCart product={data.product} />
          </div>
        </div>

      </div>
      <div className="p-5 mt-4">

        {user && user.role === 'user' && <ReviewForm id={id} user={user} />}


        <ReviewList id={id} />

      </div>



    </div>
  )
}
