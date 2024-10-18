import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Restaurant from "../pages/Restaurant";
import RestDetails from "../components/RestDetails";


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
      },
      {
        path: "/rest-details",
        element: <RestDetails/>
      }
    ]
  },
]);
