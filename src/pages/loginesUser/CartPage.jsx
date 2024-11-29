import React, { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const CartPage = () => {
  const getTheCart = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/cart/getCart",
      });
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    getTheCart();
  }, []);
  return (
    <section>
      <div className="conatiner"></div>
    </section>
  );
};

export default CartPage;
