import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { SearchIcon, ShoppingBasket } from "lucide-react";
import toast from "react-hot-toast";
import { filterData } from "../filterData/FilterData";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/features/cartSlice";

const Menus = ({ restaurantId }) => {
  const [menus, setMenu] = useState([]);
  const dispatch = useDispatch()

  // Get the menus for the restaurant
  const getMenuForRestaurant = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/menu/${restaurantId}`,
      });
      setMenu(response.data.menus);
    } catch (error) {
      console.error("Error fetching menus", error);
    }
  };

  // Add the food items to the cart
  const handleAddToCart = async (menuItem) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/addCart",
        data: {
          items: [
            {
              menuItem: menuItem,
              quantity: 1,
            },
          ],
        },
      });
      const successMessage = response.data.message;
      toast.success(successMessage);
      dispatch(increment())
    } catch (error) {
      let erorrMessage = error.response.data.message;
      toast.error(erorrMessage);
    }
  };

  // Get the menus by category
  const handleCategory = async ({ category }) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/${restaurantId}/category/${category}`,
      });
      setMenu(response.data.menus);
    } catch (error) {
      console.error("Error fetching category menus", error);
      toast.error("The menu item not available.");
    }
  };

  const inputRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/menu/${restaurantId}/search`,
        params: {
          name: inputRef.current.value, // Correctly pass the search value here
        },
      });
      setMenu(response.data.menus);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getMenuForRestaurant();
  }, []);

  return (
    <section className="py-16 w-full">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
      Explore Our Delicious Menus
    </h2>

    {/* Filter Data Section */}
    <div className="flex xl:justify-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200 py-4 mb-8">
      {filterData.map((item, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-center py-5 px-7 shadow-xl rounded-lg bg-white hover:bg-orange-50 transition duration-300 cursor-pointer"
          onClick={() => handleCategory({ category: item.category })}
        >
          <img
            src={item.imageSrc}
            alt={item.category}
            className="w-16 h-16 object-cover mx-auto mb-2 rounded-full"
          />
          <p className="text-sm font-medium text-gray-600">{item.category}</p>
        </div>
      ))}
    </div>

    {/* Search and Dropdown Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      {/* <div className="relative">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-[#ffa100] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#ff8c00] transition"
        >
          Filter Options
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content absolute left-0 mt-2 bg-white rounded-lg shadow-md z-10 w-52 p-2"
        >
          <li className="hover:bg-gray-100 px-2 py-1 rounded">
            <a>Item 1</a>
          </li>
          <li className="hover:bg-gray-100 px-2 py-1 rounded">
            <a>Item 2</a>
          </li>
        </ul>
      </div> */}

      <div className="relative w-full sm:w-auto">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search your favorite..."
          className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <SearchIcon
          onClick={handleSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        />
      </div>
    </div>

    {/* Menu Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
        >
          {menu.image && (
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-[120px] object-cover rounded-md mb-4"
            />
          )}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {menu.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{menu.description}</p>
            <div className="flex justify-center items-center gap-3">
              <p className="text-lg font-bold text-orange-600">
                {`Rs:${menu.price}`}
              </p>
              <button
                onClick={() => handleAddToCart(menu._id)}
                className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                <ShoppingBasket className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Menus;
