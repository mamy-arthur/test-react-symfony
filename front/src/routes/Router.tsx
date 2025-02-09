import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import { ProductUpdate } from "../pages/ProductUpdate";
import { ProductCreate } from "../pages/ProductCreate";
import { Users } from "../pages/Users";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: '/product/create',
                element: <ProductCreate />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/product/update/:id',
                element: <ProductUpdate />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage/>
    }
]);

export default router;