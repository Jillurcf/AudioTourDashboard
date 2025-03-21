import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import ProductListing from "../pages/ProductListing";
import Category_Management from "../pages/Category_Management";
import Manage_Users from "../pages/Manage_Users";
import Love from "../pages/Love";
import Transactions from "../pages/Transactions";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import Seller_Profile from "../pages/Seller_Profile";
import Settings_personalInformation from "../pages/Settings_personalInformation";
import SettingsFaq from "../pages/SettingsFaq";
import SettingsTermsAndConditions from "../pages/SettingsTermsAndConditions";
import EditTermsAndCondition from "../pages/EditTermsAndConditions";
import RejectionOrder from "../pages/RejectionOrder";
import AdminRoutes from "./AdminRoutes";
import ErrorPage from "../pages/ErrorPage";
import Settings_AboutUs from "../pages/SettingsAboutus";
import EditAboutus from "../pages/EditAboutus";
import Audios from "../pages/Audios";
import AudioMother from "../pages/AudioMother";
import Subscription from "../pages/Subscription";
import SettingsChangePassword from "../pages/SettingsChangePassword";



const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
    // Add your notification handling logic here
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard handleNotifications={handleNotifications} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <AdminRoutes><DasboardHome /></AdminRoutes>
            },
            {
                path: "/notifications",
                element: <AdminRoutes><Notifications /></AdminRoutes>,
            },
            {
                path: "/manage-users",
                element: <AdminRoutes><Manage_Users /> </AdminRoutes>,
            },
            {
                path: "/category_management",
                element: <AdminRoutes><Category_Management /></AdminRoutes>,
            },
            {
                path: "/audioMother",
                element: <AdminRoutes><AudioMother/></AdminRoutes>,
            },
            {
                path: "/manage-users/seller-profile/:id",
                element: <AdminRoutes><Seller_Profile /></AdminRoutes>,
            },
            {
                path: "/love",
                element: <AdminRoutes><Love /></AdminRoutes>,
            },
            {
                path: "/subscription",
                element: <AdminRoutes><Subscription/></AdminRoutes>,
            },
            {
                path: "/rejectionOrder",
                element: <AdminRoutes><RejectionOrder /></AdminRoutes>
            },
            {
                path: "/settings",
                element: <AdminRoutes><SettingsPage /></AdminRoutes>,
            },
            {
                path: "/settings/aboutus",
                element: <AdminRoutes><Settings_AboutUs/></AdminRoutes>,
            },
            {
                path: "/settings/aboutus/editAboutus",
                element: <AdminRoutes><EditAboutus/></AdminRoutes>,
            },
            {
                path: "/settings/personalInformation",
                element: <AdminRoutes><Settings_personalInformation /></AdminRoutes>,
            },
            {
                path: "/settings/faq",
                element: <AdminRoutes><SettingsFaq /></AdminRoutes>,
            },
            {
                path: "/settings/termsAndCondition",
                element: <AdminRoutes><SettingsTermsAndConditions /></AdminRoutes>
            },
            {
                path: "/settings/termsAndCondition/edittermsAndConditions",
                element: <AdminRoutes><EditTermsAndCondition /></AdminRoutes>
            },
            {
                path: "/settings/changePassword",
                element: <AdminRoutes><SettingsChangePassword /></AdminRoutes>
            },
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth",
            element: <Login />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "/auth/verify",
            element: <VerifyEmail />,
          },
          {
            path: "/auth/set-new-password",
            element: <SetNewPassword />,
          },
                 
        ],
      },
])

export default router;