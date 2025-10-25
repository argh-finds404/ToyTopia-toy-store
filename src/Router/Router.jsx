import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import CategoriesToys from "../pages/CategoriesToys";
import ToysDetails from "../pages/ToysDetails";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgetPassword";
import Loading from "../pages/Loading";
import ErrorPage from "../pages/error/ErrorPage";
import PrivateRoute from "../Provider/PrivateRoute";

const fetchToys = async () => {
  const res = await fetch("/toys.json");
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: fetchToys,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "categories/:id?",
        element: <CategoriesToys />,
        loader: fetchToys,
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/toys-details/:id",
    element: (
      <PrivateRoute>
        <ToysDetails />
      </PrivateRoute>
    ),
    loader: fetchToys,
    hydrateFallbackElement: <Loading />,
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <Wishlist />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
