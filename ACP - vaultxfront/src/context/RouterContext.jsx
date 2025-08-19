import React, { createContext, useContext, useState } from "react";

const RouterContext = createContext();

const Router = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => setCurrentPage(page);

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used within Router");
  return context;
};

export default Router;
