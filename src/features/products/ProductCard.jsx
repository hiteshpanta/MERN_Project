import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { base } from '../../app/mainApi'
import { useNavigate } from 'react-router'
import StarRating from '../reviews/StarRating.jsx';


export default function ProductCard({ product }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/products/${product._id}`)}
      className='
     hover:scale-[103%] ease-in delay-100 duration-75 transition cursor-pointer relative rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
      <div className='flex h-50 items-center justify-center'>
        <img
          src={`${base}/${product.image}`}
          alt=''
          className='w-75 h-60'
        />
      </div>

      <Card className='border-none'>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>

        </CardHeader>
        <CardContent>
          <p className='line-clamp-3'>
            {product.detail}
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>

            <div>
              <span className='text-xl font-semibold'>Rs.{product.price}</span>
              <StarRating value={product.rating} />

            </div>

          </div>

        </CardFooter>
      </Card>
    </div>
  )
}


