import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
  },
]);
