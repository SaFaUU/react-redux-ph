import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrand } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productsSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  // const [products, setProducts] = useState([])
  const brands = useSelector((state) => state.filter.brands)
  const stock = useSelector((state) => state.filter.stock)
  // const isLoading = useSelector((state) => state.products.isLoading)
  const dispatch = useDispatch()

  const { data, isLoading, error, isSuccess, isError } = useGetProductsQuery();
  const products = data?.data
  console.log(data);


  const activeClass = "text-white  bg-indigo-500 border-white";
  let content;
  if (products?.length) {
    content = products.map((product) => {
      return <ProductCard key={product.model} product={product} />
    })
  }

  if (isLoading) {
    content = <h1>Loading...</h1>
  }
  if (isError) {
    content = <h1>{error}</h1>
  }
  return (
    <>
      <div className='mb-10 flex justify-end gap-5  mx-auto max-w-7xl  my-10'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null}`} onClick={() => dispatch(toggleBrand("amd"))}>
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null}`} onClick={() => dispatch(toggleBrand("intel"))}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
        {content}
      </div>
    </>
  );
};
export default Home;
