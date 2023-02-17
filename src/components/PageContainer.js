import React from "react";
import Header from "./Header";

const PageContainer = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px 30px" }}>{children}</div>
    </div>
  );
};

export default PageContainer;
