import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Restaurant from "../pages/Restaurant";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,

    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/restaurant",
        element: <Restaurant/>
      }
    ]
  },
]);
