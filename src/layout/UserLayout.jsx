import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "../components/loginedUser/Header";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { axiosInstance } from "../config/axiosInstance";
import Footer from "../components/Footer";

const UserLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Start as true and set to false after checking
  const { isUserExist } = useSelector((state) => state.user);

  const checkUser = async () => {
    try {
      const responsre = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(saveUser());
    } catch (error) {
      dispatch(clearUser());
      console.error("Error checking user:", error);
    } finally {
      setLoading(false); // Set loading to false after checking user
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <div>
      {isUserExist ? <UserHeader /> : <Header />}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default UserLayout;
