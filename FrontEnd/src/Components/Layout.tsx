import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
