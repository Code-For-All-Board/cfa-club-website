import { Outlet } from "react-router";

import { NavBar } from "../components/NavBar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f4f4f8]">
      <NavBar />
      <main className="px-6 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
