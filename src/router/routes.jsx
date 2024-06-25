import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Restaurant from "../pages/Restaurant";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AuthUser from "./protectedRoutes/AuthUser";
import RestDetails from "../pages/loginesUser/RestDetails";
import ProfilePage from "../pages/loginesUser/ProfilePage";
import ShortProfile from "../components/loginedUser/ShortProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about", // Relative path
        element: <About />,
      },
      {
        path: "restaurant", // Relative path
        element: <Restaurant />,
      },
      {
        path: "signup-page", // Relative path
        element: <SignupPage />,
      },
      {
        path: "login-page", // Relative path
        element: <LoginPage />,
      },

      // Logged-in user
      {
        path: "user",
        element: <AuthUser />, // Ensure <AuthUser /> uses <Outlet /> to render children
        children: [
          {
            path: "rest-details/:id", // Relative path
            element: <RestDetails />,
          },
          {
            path: "profile-page",
            element: <ProfilePage />,
          },
          {
            path: "short-profile",
            element: <ShortProfile />,
          },
        ],
      },
    ],
  },
]);
