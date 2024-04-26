"use client";
import Header from "app/ui/utilComponents/header";
import "./styles.css"

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-[#f1f8e9] text-black ">{children}</main>
    </div>
  );
}

export default Layout;
