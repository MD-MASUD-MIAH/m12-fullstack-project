import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "../providers/AdminRoute";
import SellerRoute from "../providers/SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/allplant`),
      },
      {
        path: "/plant/:id",
       
        element: <PlantDetails />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
         <AdminRoute>

             <Statistics />
         </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
          <SellerRoute>

              <AddPlant />
          </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <SellerRoute>

              <MyInventory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
        <AdminRoute>

              <ManageUsers />
        </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element:<SellerRoute> <ManageOrders /></SellerRoute>,
      },
    ],
  },
]);
