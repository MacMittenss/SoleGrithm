import { useState } from "react";

export default function Header() {
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
              d="M27.8059 30.6943L27.7597 29.9458L27.8059 30.6943ZM22.3327 20.8244L22.2762 21.5723C22.4795 21.5877 22.6803 21.5196 22.8323 21.3838C22.9844 21.2479 23.0746 21.056 23.0822 20.8523L22.3327 20.8244ZM31.5254 27.3716L32.264 27.5015L31.5254 27.3716ZM27.7597 29.9458C26.1685 30.0438 24.5344 30.2341 22.9356 30.0486C21.3752 29.8676 19.933 29.3326 18.7594 28.0189L17.6408 29.0182C19.1263 30.6811 20.9523 31.3286 22.7627 31.5386C24.5347 31.7442 26.3739 31.534 27.852 31.4429L27.7597 29.9458ZM18.7594 28.0189C17.6168 26.7398 17.3858 25.0269 17.9646 23.7058C18.5225 22.4323 19.8968 21.3926 22.2762 21.5723L22.3892 20.0766C19.4577 19.8552 17.4361 21.1741 16.5907 23.1038C15.7661 24.9859 16.1242 27.3206 17.6408 29.0182L18.7594 28.0189ZM27.852 31.4429C28.3848 31.4101 28.9662 31.3726 29.4961 31.265C30.0257 31.1575 30.5862 30.9652 31.0342 30.565L30.0349 29.4464C29.8709 29.5929 29.6086 29.7116 29.1976 29.795C28.7869 29.8784 28.3101 29.9118 27.7597 29.9458L27.852 31.4429ZM32.264 27.5015C32.5206 26.043 32.936 24.239 32.9307 22.4552C32.9254 20.6326 32.4871 18.7454 31.0016 17.0825L29.8829 18.0818C31.0566 19.3956 31.4261 20.8887 31.4307 22.4596C31.4355 24.0691 31.0629 25.6715 30.7867 27.2417L32.264 27.5015ZM31.0016 17.0825C29.4851 15.3849 27.2054 14.7668 25.2426 15.3748C23.2301 15.9981 21.6924 17.8588 21.5832 20.7966L23.0822 20.8523C23.1708 18.4678 24.3584 17.219 25.6864 16.8076C27.0641 16.3809 28.7403 16.8028 29.8829 18.0818L31.0016 17.0825ZM30.7867 27.2417C30.6912 27.7847 30.6044 28.2548 30.4754 28.6535C30.3464 29.0525 30.199 29.2998 30.0349 29.4464L31.0342 30.565C31.4823 30.1647 31.7363 29.6293 31.9026 29.1152C32.069 28.6007 32.1716 28.0272 32.264 27.5015L30.7867 27.2417Z"
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
              d="M19.5829 30.8256C20.515 32 22.25 32 25.7198 32H26.2802C29.75 32 31.485 32 32.4171 30.8256M19.5829 30.8256C18.6507 29.6511 18.9704 27.8681 19.6099 24.3021C20.0646 21.7662 20.292 20.4982 21.1552 19.7491M19.5829 30.8256C19.5829 30.8256 19.5829 30.8256 19.5829 30.8256ZM32.4171 30.8256C33.3493 29.6511 33.0296 27.8681 32.3901 24.3021C31.9354 21.7662 31.708 20.4982 30.8448 19.7491M32.4171 30.8256C32.4171 30.8256 32.4171 30.8256 32.4171 30.8256ZM30.8448 19.7491C29.9816 19 28.7478 19 26.2802 19H25.7198C23.2522 19 22.0184 19 21.1552 19.7491M30.8448 19.7491C30.8448 19.7491 30.8448 19.7491 30.8448 19.7491ZM21.1552 19.7491C21.1552 19.7491 21.1552 19.7491 21.1552 19.7491Z"
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
