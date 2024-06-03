import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,

    children: [
      {
        path: "/",
        element: <Home/>
      }
    ]
  },
]);
