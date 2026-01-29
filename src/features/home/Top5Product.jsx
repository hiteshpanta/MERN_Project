
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetTop5ProductQuery } from "../products/productApi.js"
import { base } from "../../app/mainApi.js";
import { Star } from "lucide-react";

export default function Top5Product() {
  const { data, isLoading, error } = useGetTop5ProductQuery();

  return (
    <div className="px-10">


      <Carousel className="w-full max-w-xs ">
        <CarouselContent>

          {data?.map((item) => (
            <CarouselItem key={item._id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={`${base}/${item.image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>

  )
}

