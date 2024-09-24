import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full pt-16 px-0 py-0">
        <div className="p-4">
          <div className="max-w-screen-xl mx-auto my-4">
            <Outlet />
            <ScrollRestoration />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
