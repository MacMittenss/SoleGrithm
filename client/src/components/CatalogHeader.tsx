import { useState } from "react";

export default function CatalogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-28 py-12 bg-white">
      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="28"
          height="18"
          viewBox="0 0 28 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-4"
        >
          <path d="M27 1L1 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 9L1 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 17H1" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Navigation - Desktop */}
      <nav className="hidden md:flex gap-10">
        <a
          href="#"
          className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity"
        >
          Home
        </a>
        <a
          href="#"
          className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity"
        >
          Collections
        </a>
        <a
          href="#"
          className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity"
        >
          New
        </a>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t md:hidden">
          <nav className="flex flex-col py-4">
            <a
              href="#"
              className="px-6 py-3 text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="#"
              className="px-6 py-3 text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:bg-gray-50"
            >
              Collections
            </a>
            <a
              href="#"
              className="px-6 py-3 text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:bg-gray-50"
            >
              New
            </a>
          </nav>
        </div>
      )}

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <circle cx="25" cy="25" r="25" fill="black" />
            <path
              d="M27.8059 30.6943L27.7597 29.9458L27.8059 30.6943ZM22.3327 20.8244L22.2762 21.5723C22.4795 21.5877 22.6803 21.5196 22.8323 21.3838C22.9844 21.2479 23.0746 21.056 23.0822 20.8523L22.3327 20.8244ZM31.5254 27.3716L32.264 27.5015L31.5254 27.3716ZM27.7597 29.9458C26.1685 30.0438 24.5344 30.2341 22.9356 30.0486C21.3752 29.8676 19.933 29.3326 18.7594 28.0189L17.6408 29.0182C19.1263 30.6811 20.9523 31.3286 22.7627 31.5386C24.5347 31.7442 26.3739 31.534 27.852 31.4429L27.75"
              fill="white"
            />
          </svg>
        </button>

        {/* Cart */}
        <div className="h-12 px-5 rounded-3xl bg-black flex items-center justify-center">
          <span className="text-white font-beatrice-deck text-xs font-medium tracking-wider uppercase">
            Cart
          </span>
        </div>

        {/* Shopping Bag Icon */}
        <button className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
          <svg
            width="51"
            height="50"
            viewBox="0 0 51 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <circle cx="25.6665" cy="25" r="25" fill="black" />
            <circle cx="25.6665" cy="25" r="18.5185" fill="white" />
            <path
              d="M19.5829 30.8256C20.515 32 22.25 32 25.7198 32H26.2802C29.75 32 31.485 32 32.4171 30.8256M19.5829 30.8256C18.6507 29.6511 18.9704 27.8681 19.6099 24.3021C20.0646 21.7662 20.292 20.4982 21.1552 19.7491M19.5829 30.8256C19.5829 30.8256 19.5829 30.8256 19.5829 30.8256ZM32.4171 30.8256C33.3493 29.6511 33.0296 27.8681 32.3901 24.3021C31.9354 21.7662 31.708 20.4982 30.8448 19.7491M32.4171 30.8256C32.4171 30.8256 32.4171 30.8256 32.4171 30.8256ZM30.8448 19.7491C29.9816 19 28.1986 19 24.6327 19H27.3673C23.8014 19 22.0184 19 21.1552 19.7491M30.8448 19.7491C30.8448 19.7491 30.8448 19.7491 30.8448 19.7491ZM21.1552 19.7491C21.1552 19.7491 21.1552 19.7491 21.1552 19.7491Z"
              stroke="black"
              strokeWidth="1.5"
            />
            <path
              d="M24 22C24.2911 23.1652 25.0766 24 26 24C26.9234 24 27.7089 23.1652 28 22"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* User Profile Icon */}
        <button className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
          <svg
            width="51"
            height="50"
            viewBox="0 0 51 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <circle cx="25.2593" cy="25" r="25" fill="black" />
            <circle
              cx="25.0001"
              cy="22.4286"
              r="3.42857"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M31 31.8571C31 29.9636 28.3137 28.4286 25 28.4286C21.6863 28.4286 19 29.9636 19 31.8571"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}