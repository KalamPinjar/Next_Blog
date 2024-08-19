import { Children } from "react";
import { Header } from ".";

const Layout = ({ children: Children }) => {
  return (
    <>
      <Header />
      {Children}
    </>
  );
};

export default Layout;
