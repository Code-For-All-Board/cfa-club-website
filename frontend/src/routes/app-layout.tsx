import { Outlet } from "react-router";

import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f8]">
      <NavBar />
      <main className="flex-1 px-6 py-8 sm:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
