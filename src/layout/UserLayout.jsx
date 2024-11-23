import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "../components/loginedUser/Header";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Start as true and set to false after checking
  const { isUserExist } = useSelector((state) => state.user);

  const checkUser = async () => {
    try {
      await axiosInstants({
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
        <span className="loading loading-spinner text-warning"></span>
      </div>
    ); // Optionally show a loading indicator
  }

  return (
    <div>
      {isUserExist ? <UserHeader/> : <Header />}
      <Outlet />
    </div>
  );
};

export default UserLayout;
