import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-white flex flex-row overflow-auto">
      <Sidebar className="w-1/5" />
      <div className="h-full w-4/5 overflow-auto">{children}</div>
    </div>
  );
};
export default Layout;
