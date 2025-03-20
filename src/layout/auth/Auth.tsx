import React from "react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <div className="auth-wrapper">
      <div className="bg-[#ffffff] h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};
export default Auth;
