import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/auth",
    element: <h2>Authntication Layout</h2>,
  },
  {
    path: "/toys",
    element: <h2>toys Layout</h2>,
  },
  {
    path: "/*",
    element: <h2>Error404</h2>,
  },
]);

export default router;