import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Restaurant from "../pages/Restaurant";
import RestDetails from "../components/RestDetails";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant",
        element: <Restaurant />,
      },
      {
        path: "/rest-details",
        element: <RestDetails />,
      },
      {
        path: "/signup-page",
        element: <SignupPage/>
      },
      {
        path: "/login-page",
        element: <LoginPage/>
      }
    ],
  },
]);
