import React from "react";
import Header from "./Header";
import CopyRightNotice from "./CopyrightNotice";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <CopyRightNotice />
    </div>
  );
};

export default MainLayout;