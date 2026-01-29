import { useGetReviewsQuery } from "../products/productApi.js"

export default function ReviewList({ id }) {
  const { isLoading, error, data } = useGetReviewsQuery(id);

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>


  console.log(data);
  return (
    <div className="mt-5">
      {data?.map(item => (
        <div key={item._id} className="flex gap-5 items-center border-b-2 py-2 px-4 ">

          <div className="space-y-2">
            <p>Name: {item.userId.username}</p>
            <p>Review: {item.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
