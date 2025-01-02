import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [userOrder, setUserOrder] = useState({ orders: [], products: [] });
  const [orderId, setOrderId] = useState();

  console.log(orderId, "===clg");

  useEffect(() => {
    const getSessionStatus = async () => {
      try {
        const response = await axiosInstance.get("/payment/session-status");

        // Ensure that orders and products are arrays
        const orders = Array.isArray(response.data.orders)
          ? response.data.orders
          : [];

        setUserOrder({
          orders,
        });
        setOrderId(response.data.orders[0].orderId);
      } catch (error) {
        console.log("Error fetching session status:", error);
      }
    };

    getSessionStatus();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {userOrder.orders.length > 0 ? (
        <Link to={`/user/order-details/${orderId}`}>
          <div>
            {/* Order Details Section */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {userOrder.orders.map((order, index) => (
                  <div
                    key={index}
                    className="shadow-lg p-5 bg-gray-200 rounded-lg"
                  >
                    <p>
                      <strong>Total Amount:</strong>{" "}
                      <span>{order.totalAmount}</span>
                    </p>

                    {/* Items for the order */}
                    <section>
                      <h3>Items:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {order.products && order.products.length > 0 ? (
                          order.products.map((item, idx) => (
                            <div key={idx}>
                              <img
                                src={
                                  item.image || "/path/to/placeholder/image.png"
                                }
                                alt={item.ItemName}
                                className="w-[50px] rounded-lg"
                                onError={(e) =>
                                  (e.target.src =
                                    "/path/to/placeholder/image.png")
                                }
                              />
                            </div>
                          ))
                        ) : (
                          <p>No items found for this order.</p>
                        )}
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Link>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
