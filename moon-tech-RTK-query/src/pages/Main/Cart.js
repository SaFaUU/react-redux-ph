import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {
        cart.length > 0 ?
          cart.map((product, index) => <ProductCard key={index} product={product}></ProductCard>)
          :
          <h1>Cart is empty</h1>
      }
    </div>
  );
};

export default Cart;
