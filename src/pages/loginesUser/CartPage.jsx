import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Delivery initializing
  let deliveryCharge = 50;

  // Get all cart items
  const getCartItmes = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/cart/getCart",
      });
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {}
  };

  // Update the cart item quantity
  const updateCartItemQuantity = async (menuItemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      const response = await axiosInstance({
        method: "PUT",
        url: "/cart/update",
        data: {
          items: [{ menuItem: menuItemId, quantity: newQuantity }],
        },
      });
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.log(error)
    }
  };

  // Revome the item from cart
  const removeCartItem = async (menuItemId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/cart/remove",
        data: { menuItem: menuItemId },
      });
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  // Payment function
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_publisheble_key
      );

      const session = await axiosInstance({
        method: "POST",
        url: "/payment/create-checkout-session",
        data: { products: cartItems },
      });
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItmes();
  }, []);

  return (
    <main>
      <section className="mt-10 flex flex-col justify-center items-center">
        <div className="container w-[85%]">
          <h1>Your cart</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Total</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-4 px-6 flex items-center">
                      <img
                        src={item.image}
                        alt={item.ItemName}
                        className="w-16 h-16 object-cover mr-4 rounded-md"
                      />
                      <span className="font-medium">{item.ItemName}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            updateCartItemQuantity(
                              item.menuItem,
                              item.quantity - 1
                            );
                          }}
                          className="text-lg font-bold text-gray-700 bg-orange-300 hover:shadow-lg hover:shadow-orange-400 rounded-lg w-8 h-8 flex items-center justify-center duration-300"
                        >
                          -
                        </button>
                        <span className="mx-5 text-xl font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            updateCartItemQuantity(
                              item.menuItem,
                              item.quantity + 1
                            );
                          }}
                          className="text-lg font-bold text-gray-700 bg-orange-300 hover:shadow-lg hover:shadow-orange-400 rounded-lg w-8 h-8 flex items-center justify-center duration-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">₹{item.price}</td>
                    <td className="py-4 px-6">₹{item.price * item.quantity}</td>
                    <td className="py-4 px-6 text-right">
                      <Trash2
                        onClick={() => {
                          removeCartItem(item.menuItem);
                        }}
                        className="text-orange-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* The total and check out section */}
          <div className="mb-5 flex justify-between">
            <div className="shadow-xl w-full max-w-sm py-8 px-6 leading-8 bg-white rounded-lg">
              <h2 className="text-lg text-gray-700">
                Total Price: ₹{totalPrice}
              </h2>
              <hr className="mt-5" />
              <h2 className="text-lg text-gray-700 mt-5">
                Delivery charge: ₹{deliveryCharge}
              </h2>
              <hr className="mt-5" />
              <h2 className="text-2xl font-bold text-gray-900 mt-4">
                Grand Total: ₹{totalPrice > 0 ? totalPrice + deliveryCharge : 0}
              </h2>
              <button
                onClick={makePayment}
                className="py-1 px-5 rounded-md bg-orange-400 font-semibold mt-2 "
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
