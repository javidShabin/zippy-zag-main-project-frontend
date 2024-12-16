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
import ChatPage from "../pages/loginesUser/ChatPage";
import CartPage from "../pages/loginesUser/CartPage";
import PaymentSuccess from "../components/loginedUser/PaymentSuccess";
import ProfileDashbord from "../pages/loginesUser/ProfileDashbord";
import EditProfile from "../components/loginedUser/ProfileEditePage";
import JoinUs from "../pages/loginesUser/JoinPage";
import AddAddress from "../components/loginedUser/AddAddress";

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
            path: "chat-page",
            element: <ChatPage />,
          },
          {
            path: "cart-page",
            element: <CartPage />,
          },
          {
            path: "payment/success",
            element: <PaymentSuccess/>
          },
          {
            path: "join-page",
            element: <JoinUs />
          },
          {
            path: "add-address",
            element: <AddAddress />
          },

          {
            path: "profile",
            element: <ProfileDashbord />,

            children: [
              {
                path: "profile-page",
                element: <ProfilePage />
              },
              {
                path: "edite-profile",
                element: <EditProfile />
              }
            ]
          }
        ],
      },
    ],
  },
]);
