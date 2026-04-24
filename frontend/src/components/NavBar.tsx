import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router";

import cfaPrimaryLogo from "../assets/cfaLogos/CFA Primary Logo.png";

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

const discordUrl = "https://discord.com/invite/zh3cjDT6P7";

const menuVariants = {
  closed: {
    opacity: 0,
    y: -18,
    scale: 0.96,
    transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.06,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18, ease: [0.32, 0, 0.67, 0] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function getDesktopNavItemClass(isActive: boolean) {
  return [
    "relative whitespace-nowrap rounded-full px-1 py-2 text-[0.95rem] tracking-[-0.02em] text-white transition duration-300",
    "after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:bg-linear-to-r after:from-fuchsia-300 after:via-violet-400 after:to-cyan-300 after:transition after:duration-300 after:content-['']",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]",
    isActive
      ? "opacity-100 after:scale-x-100"
      : "opacity-72 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100",
  ].join(" ");
}

function getMobileNavItemClass(isActive: boolean) {
  return [
    "block rounded-2xl px-4 py-3 text-base tracking-[-0.02em] transition duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17171d]",
    isActive
      ? "bg-white/12 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/82 hover:bg-white/8 hover:text-white",
  ].join(" ");
}

export function NavBar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#1e1e24] text-white">
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

        <div className="ml-auto hidden flex-1 items-center justify-end gap-x-8 font-['Orbitron',sans-serif] text-[20px] font-normal leading-none lg:flex">
          <nav
            aria-label="Primary"
            className="flex items-center justify-end gap-x-8"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => getDesktopNavItemClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            href={discordUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-linear-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-2.5 font-['Lexend',sans-serif] text-base font-medium leading-none text-white shadow-[0_12px_30px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(168,85,247,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
          >
            Join Discord
          </a>
        </div>

        <div className="ml-auto lg:hidden">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-white/5 text-white shadow-[0_12px_30px_rgba(9,9,15,0.28)] backdrop-blur-sm transition duration-300 hover:border-fuchsia-300/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <motion.span
              className="absolute inset-0 bg-linear-to-br from-fuchsia-400/20 via-transparent to-cyan-300/20 opacity-0 transition duration-300 group-hover:opacity-100"
              animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            />
            <motion.span
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0, scale: isMobileMenuOpen ? 1.08 : 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {isMobileMenuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </motion.span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 top-24 bg-[#09090f]/55 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              id="mobile-navigation"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute inset-x-4 top-[calc(100%-0.4rem)] rounded-[1.75rem] border border-white/12 bg-[#17171d]/96 p-4 shadow-[0_28px_80px_rgba(4,5,12,0.45)] backdrop-blur-xl sm:inset-x-5"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-300/60 to-transparent" />

              <motion.nav
                aria-label="Mobile primary"
                className="flex flex-col gap-2 font-['Orbitron',sans-serif] text-lg leading-none"
              >
                {navItems.map((item) => (
                  <motion.div key={item.to} variants={menuItemVariants}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => getMobileNavItemClass(isActive)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div variants={menuItemVariants} className="mt-4">
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-[1.35rem] bg-linear-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-3 font-['Lexend',sans-serif] text-base font-medium text-white shadow-[0_18px_35px_rgba(168,85,247,0.25)] transition duration-300 hover:shadow-[0_20px_42px_rgba(168,85,247,0.34)]"
                >
                  <span>Join Discord</span>
                  <motion.span
                    className="text-lg"
                    initial={false}
                    animate={{ x: isMobileMenuOpen ? [0, 4, 0] : 0 }}
                    transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {">"}
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
