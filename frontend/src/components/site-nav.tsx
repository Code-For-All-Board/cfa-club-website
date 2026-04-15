import { NavLink } from "react-router";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/board", label: "Board" },
  { to: "/events", label: "Events" },
  { to: "/mock-interviews", label: "Mock Interviews" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export function SiteNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-slate-900">
          CFA Club
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "rounded px-3 py-2 text-sm",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
