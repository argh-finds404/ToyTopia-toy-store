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
import AboutUs from "../pages/AboutUs";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import LiveTrack from "../pages/LiveTrack";
import Games from "../pages/Games";
import Competitions from "../pages/Competitions";

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
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "livetrack",
        element: <LiveTrack />,
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
    path: "/games",
    element: <Games />,
  },
  {
    path: "/competitions",
    element: <Competitions />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;

