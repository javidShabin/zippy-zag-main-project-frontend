import React from "react";
// import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/loginedUser/Header";

const UserLayout = () => {
  return (
    <div>
      {/* <Header /> */}
      <UserHeader/>
      <Outlet/>
    </div>
  );
};

export default UserLayout;
