import { Formik } from "formik";
import { useGetProductsQuery } from "../products/productApi"
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import Top5Product from "./Top5Product.jsx";

export default function Home() {
  const [params, setPrams] = useSearchParams();

  const querYPage = params.get('page') ?? 1;

  const query = params.get('search') ? {
    search: params.get('search')
  } : null;
  const { isLoading, error, data } = useGetProductsQuery({
    ...query,
    page: querYPage
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [querYPage]);


  if (isLoading) return <div className="grid grid-cols-4 gap-6 mt-4 items-start">
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </div>

  if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>

  return (
    <div className="flex flex-col min-h-screen mb-5">


      <main className="grow">
        <h1 className="flex justify-center">Welcome To Shop Online</h1>
        
        

        <Formik
          initialValues={{
            search: ''
          }}
          onSubmit={(val, { resetForm }) => {
            setPrams({ search: val.search });
            resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit} className="mt-4 mb-4 max-w-sm">
              <div className="flex gap-5 justify-end bg-amber-200 p-2 shadow-sm ">
                <Input
                  value={values.search}
                  onChange={handleChange}
                  name="search" placeholder="Search" 
                />
                <Button className={"bg-transparent"}>Search</Button>
              </div>

            </form>
          )}
        </Formik>
        {/* <div className="mt-50 mb-10">
          <Top5Product />
        </div> */}



        <div className="grid grid-cols-4 gap-6 mt-30 items-start">
          {data.products.map((product) => {
            return <ProductCard key={product._id} product={product} />
          })}
        </div>


      </main>



      <div className="flex gap-5 my-5 justify-center">
        <Button disabled={Number(querYPage) === 1} onClick={() => setPrams({ page: Number(querYPage) - 1 })}>Prev</Button>
        <h1>{params.get('page') ?? 1}</h1>
        <Button onClick={() => setPrams({ page: Number(querYPage) + 1 })} disabled={data.totalPages === Number(querYPage)}>Next</Button>
      </div>




    </div>
  )
}



