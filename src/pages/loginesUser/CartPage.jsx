import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { decrement } from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurantId, setRestarantId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const dispatch = useDispatch();

  const deliveryCharge = 50;

  // Function to fetch cart items
  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/cart/getCart");
      setCartItems(response.data.items);
      setRestarantId(response.data.restaurantId);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check the address have or not
  const checkAddress = async () => {
    try {
      const response = await axiosInstance.get("/address/get-address");
      if (response.data[0]) {
        setIsAddress(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAddress();
  }, []);

  // Optimized update for item quantity without loading state
  const updateCartItemQuantity = useCallback(
    async (menuItemId, newQuantity) => {
      if (newQuantity < 1) return;

      try {
        const response = await axiosInstance.put("/cart/update", {
          items: [{ menuItem: menuItemId, quantity: newQuantity }],
        });
        setCartItems(response.data.items);
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    },
    []
  );

  // Remove item from cart
  const removeCartItem = async (menuItemId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: { menuItem: menuItemId },
      });
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      dispatch(decrement());
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user ID
  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile");
        setUserId(response.data._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    getUserId();
  }, []);

  // Fetch user address
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axiosInstance.get("/address/get-address");
        setAddress(response.data[0]);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    getAddress();
  }, []);

  // Payment function
  const makePayment = async () => {
    if (
      !address ||
      !address.email ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      alert("Please enter a complete delivery address before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_publisheble_key
      );
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          products: cartItems,
          restaurantId,
          userId,
          totalAmount: totalPrice + deliveryCharge,
          address,
        }
      );

      const { sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items initially
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <main>
      <section className="mt-10 flex flex-col justify-center items-center">
        <div className="container w-[85%]">
          <h1>Your Cart</h1>
          {loading && <div>Loading...</div>}
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
                          onClick={() =>
                            updateCartItemQuantity(
                              item.menuItem,
                              item.quantity - 1
                            )
                          }
                          className="text-lg font-bold text-gray-700 bg-orange-300 hover:shadow-lg hover:shadow-orange-400 rounded-lg w-8 h-8"
                        >
                          -
                        </button>
                        <span className="mx-5 text-xl font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.menuItem,
                              item.quantity + 1
                            )
                          }
                          className="text-lg font-bold text-gray-700 bg-orange-300 hover:shadow-lg hover:shadow-orange-400 rounded-lg w-8 h-8"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">₹{item.price}</td>
                    <td className="py-4 px-6">₹{item.price * item.quantity}</td>
                    <td className="py-4 px-6 text-right">
                      <Trash2
                        onClick={() => removeCartItem(item.menuItem)}
                        className="text-orange-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              {isAddress ? (
                <button
                  onClick={makePayment}
                  className="py-1 px-5 rounded-md bg-orange-400 font-semibold mt-2"
                >
                  Check Out
                </button>
              ) : (
                <Link to={"/user/add-address"}>
                  <button className="py-1 px-5 rounded-md bg-orange-400 font-semibold mt-2">
                    Address
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
