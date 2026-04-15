import { NavLink } from "react-router";

import cfaPrimaryLogo from "../assets/CFA Primary Logo.png";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const navItems: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/board", label: "Board" },
  { to: "/events", label: "Events" },
  { to: "/mock-interviews", label: "Mock Interviews" },
  { to: "/leaderboard", label: "Leader board" },
];

function getNavItemClass(isActive: boolean) {
  return [
    "relative whitespace-nowrap text-[0.95rem] tracking-[-0.02em] text-white transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]",
    isActive ? "opacity-100" : "opacity-82 hover:opacity-100",
  ].join(" ");
}

export function NavBar() {
  return (
    <header className="border-b border-white/10 bg-[#1e1e24] text-white">
      <div className="mx-auto flex min-h-24 w-full max-w-378 items-center gap-6 px-4 sm:px-5 lg:px-5.25">
        <NavLink
          to="/"
          end
          className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
          aria-label="Code For All home"
        >
          <img
            src={cfaPrimaryLogo}
            alt="Code For All logo"
            className="h-12 w-12 object-contain sm:h-16 sm:w-16"
          />
        </NavLink>

        <div className="ml-auto flex flex-1 flex-wrap items-center justify-end gap-x-5 gap-y-3 overflow-x-auto font-['Orbitron',sans-serif] text-[20px] font-normal leading-none sm:flex-nowrap sm:gap-x-8">
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3 sm:flex-nowrap sm:gap-x-8"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => getNavItemClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-xl bg-[#a855f7] px-5 py-2.5 font-['Lexend',sans-serif] text-base font-medium leading-none text-white transition hover:bg-[#9333ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
          >
            Join Discord
          </button>
        </div>
      </div>
    </header>
  );
}
