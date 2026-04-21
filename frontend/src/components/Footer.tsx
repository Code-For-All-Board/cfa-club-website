import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import cfaPrimaryLogo from "../assets/cfaLogos/CFA Primary Logo.png";

const linkedinUrl = "https://www.linkedin.com/company/code-for-all-qc/";
const instagramUrl = "https://www.instagram.com/codeforall_qc/";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1e1e24] text-white">
      <div className="mx-auto flex w-full max-w-378 flex-col gap-8 px-4 py-7 sm:px-5 lg:px-6.5 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={cfaPrimaryLogo}
              alt="Code For All logo"
              className="h-13.75 w-13.75 object-contain"
            />

            <div className="flex items-center gap-5.5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our LinkedIn page"
              >
                <FaLinkedinIn className="h-6 w-6" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit our Instagram page"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <p className="font-['Lexend',sans-serif] text-xl font-medium leading-none sm:text-2xl">
            Contact Us: codeforall@qmail.com
          </p>
        </div>

        <p className="font-['Lexend',sans-serif] text-base font-medium leading-none text-white/95 xl:self-center">
          @ 2026 Code For All.
        </p>

        <form
          className="flex w-full max-w-88.25 flex-col gap-3 xl:items-start"
          onSubmit={(event) => event.preventDefault()}
        >
          <label
            htmlFor="newsletter-email"
            className="font-['Lexend',sans-serif] text-xl font-medium leading-none"
          >
            Subscribe to our newsletter
          </label>

          {/* TODO: Figure out and implement newsletter */}
          <div className="flex w-full">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your Email"
              className="h-8.5 min-w-0 flex-1 border-0 bg-white px-4 font-['Lexend',sans-serif] text-xl font-medium text-black placeholder:text-black/50 focus:outline-none"
            />
            <button
              type="submit"
              className="h-8.5 bg-[#c084fc] px-4 font-['Lexend',sans-serif] text-xl font-medium text-black transition hover:bg-[#a855f7] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
}
