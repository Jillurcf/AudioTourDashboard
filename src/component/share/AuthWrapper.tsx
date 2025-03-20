import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-1/4 bg-gray-100 p-8 rounded ${className}`}>{children}</div>
  );
};

export default AuthWrapper;
