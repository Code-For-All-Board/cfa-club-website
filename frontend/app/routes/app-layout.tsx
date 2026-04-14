import { Outlet } from "react-router";

import { SiteNav } from "../components/site-nav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteNav />
      <main className="px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
