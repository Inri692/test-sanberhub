import React from "react";
import Sidebar from "./Sidebar";

export function Layout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <Sidebar />
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  );
}
