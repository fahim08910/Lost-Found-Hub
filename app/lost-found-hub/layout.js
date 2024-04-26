"use client";
import Footer from "app/ui/utilComponents/footer";
import Header from "app/ui/utilComponents/header";
import "./lost-found-hub.css";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Header />
      <main className="flex-grow bg-[#f1f8e9] text-black">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
