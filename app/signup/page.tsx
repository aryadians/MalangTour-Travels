"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth";

export default function SignupPage() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <div className="flex min-h-screen w-full flex-row">
      {/* Left Side: Form Section */}
      <div className="flex w-full lg:w-1/2 xl:w-[45%] flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto justify-center bg-background-light dark:bg-background-dark text-text-main dark:text-white">
        {/* Header / Logo */}
        <div className="flex items-center gap-3 mb-12">
          {/* ... Logo SVG ... */}
          <div className="size-10 text-primary bg-surface-dark rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-text-main dark:text-white">
            Malang Premium Tours
          </h1>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-text-main dark:text-white mb-3">
            Create New Account
          </h2>
          <p className="text-text-muted dark:text-gray-400 text-base leading-relaxed">
            Start your journey to Malang's hidden gems today. Unlock exclusive
            offers and premium itineraries.
          </p>
        </div>

        {/* Form */}
        <form action={action} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              className="text-text-main dark:text-gray-200 text-sm font-bold"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[22px]">
                  person
                </span>
              </div>
              <input
                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-text-main dark:text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                id="fullname"
                name="name"
                placeholder="Enter your full name"
                type="text"
              />
            </div>
            {state?.errors?.name && (
              <p className="text-red-500 text-xs font-semibold ml-1">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              className="text-text-main dark:text-gray-200 text-sm font-bold"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[22px]">
                  mail
                </span>
              </div>
              <input
                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-text-main dark:text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-500 text-xs font-semibold ml-1">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Phone (Optional) */}
          <div className="flex flex-col gap-2">
            <label
              className="text-text-main dark:text-gray-200 text-sm font-bold"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[22px]">
                  call
                </span>
              </div>
              <input
                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-text-main dark:text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                id="phone"
                name="phone"
                placeholder="+62 812 3456 7890"
                type="tel"
              />
            </div>
          </div>

          {/* Passwords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-text-main dark:text-gray-200 text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[22px]">
                    lock
                  </span>
                </div>
                <input
                  className="w-full h-12 pl-12 pr-10 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-text-main dark:text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-main dark:hover:text-white transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    visibility_off
                  </span>
                </button>
              </div>
              {state?.errors?.password && (
                <p className="text-red-500 text-xs font-semibold ml-1">
                  {state.errors.password}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-text-main dark:text-gray-200 text-sm font-bold"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[22px]">
                    lock_reset
                  </span>
                </div>
                <input
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-text-main dark:text-white placeholder:text-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                  id="confirm-password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-1">
            <div className="flex h-6 items-center">
              <input
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                id="terms"
                name="terms"
                type="checkbox"
              />
            </div>
            <div className="text-sm leading-6">
              <label
                className="font-medium text-text-muted dark:text-gray-400"
                htmlFor="terms"
              >
                I agree to the{" "}
                <Link
                  className="font-bold text-primary hover:text-primary-hover underline underline-offset-2 decoration-transparent hover:decoration-current transition-all"
                  href="#"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  className="font-bold text-primary hover:text-primary-hover underline underline-offset-2 decoration-transparent hover:decoration-current transition-all"
                  href="#"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-primary h-12 px-6 text-sm font-bold leading-normal text-[#111814] tracking-wider uppercase shadow-lg shadow-primary/25 hover:bg-primary-hover hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
            type="submit"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="shrink-0 mx-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Or continue with
            </span>
            <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          {/* Social Button */}
          <button
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 px-6 text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            type="button"
          >
            <img
              alt="Google Logo"
              className="h-5 w-5"
              data-alt="Google G logo in standard colors"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJKT7EMr2EoDVnZiNBPgcIvzpdPUS-MtfqoQiS_R7obZqTOqWLKvIEEiej0LeHtyGGWOwhmSYmNzlx2SXrbm64A7rYv98RiY4cDJX9keHGH2T5rOqS2wFG4NI7dgRP8z3mX2HxMPMef94oQgX24c0UpKCsncowHteqKlJ4-xN-yoVtjXAwOROK0uuM14c197QPwtg5oMc3uNNgLTqwultmoj8KbdlczZVX8B0L4MyFIusq7kXywlfmdD6DZTGSmJBzDKQcblfWKA"
            />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="mt-2 text-center text-sm text-text-muted dark:text-gray-400">
            Already have an account?
            <Link
              className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors ml-1"
              href="/login"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side: Image Section */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-background-dark">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          data-alt="Scenic view of Mount Bromo active volcano in East Java at sunrise with mist covering the caldera"
          data-location="Malang, East Java"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDahPTPx-_2w9FcDmbrYyoIRniPHhk0UgWc2kse99rEZ-9AC3XHct81g6k0kLKM_kibhTDF81thAoXlaiBZvFNp9pcRj543lAmgTWzhF7J4HaRZ3I59-t5bTwKH6LygC4xjbbovwmw4x0KddPMh_L4NKbsdojvDzelzDCH_pBaSChvj0fJjWw63iNEv4Q_54uVWcKQBtrXT33ZzwHhCIF9IOSD84xmwvCm10pn3pDXjg_EsS9JFo-jVX5t0RYc0u8F7TnbKletQGQ')",
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">
              location_on
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Malang, East Java
            </span>
          </div>
          <h3 className="text-4xl font-extrabold leading-tight mb-4">
            Experience the magic of
            <br />
            nature's finest artwork.
          </h3>
          <p className="text-lg text-gray-200 max-w-md">
            Join thousands of travelers who have discovered the untouched beauty
            of Indonesia through our premium guided tours.
          </p>
          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex -space-x-3">
              <img
                alt="User avatar"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background-dark object-cover"
                data-alt="Portrait of a smiling young woman"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaAg0MqptLGbFB9kPHYcIMEHtLP76pZPRMIAqEfDnxyG36XioD_VZFRTt5Dau1XuafV9ZNK-Fzt0Ca4ngpjD-Kjg3BJG0XiQU_tQZqtZ9ka1tmFiD76cfbFKB3PQ_N30vrQhNnPpPpVFYgJlRnehrb-nktsuR1JFYEYNK0eIya5LrioeAoCsMBQBVis-CM17N2hxdbAcD9-8u60QuU_PZt7utlTgQ1Lvyjf4rsEbOTiaMub12wDz679kdDpsBJ4CMs32a3G4ZfHA"
              />
              <img
                alt="User avatar"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background-dark object-cover"
                data-alt="Portrait of a young man with a beard"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaP9i-ZW2ftdSiauanu0ovUvt5QOfjSR-ppe_SK7Y91Dx1PReELkRAZVXIURRzjstbRwzf4MEJjTx1w7ZHIcOlthqlaM1OhyHoRBvfBjf5AkNoVTkUtFcmzVXl46s4d5yNJ1LO8AxzvbTAnqaP8poiIjuCuodhhZGitl4RQ1rotKvghk0Hd129AnLjGyLqSZHzb2kMPIsNJF1w_DoydmKeUnMY_WjrmjXLmZPKyp6a-qhgd8Z0cLHPVh6e-m6m0s4NDbfkA5tl4g"
              />
              <img
                alt="User avatar"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background-dark object-cover"
                data-alt="Portrait of a smiling man"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTfM2IK9hA437QUDqHFyhdmEGcde-MrFVq6WanRU7FkWHV_CpxZEV4Wy179Qhe_JpqNDntfaZV2yUxa9cx7lxz-8pMQS9NrS0jchY-fX07ndiuep54Fr1QtYp4nuCkwo3qWCGpnZUzAjuCQU_6Z5Hpqo9LkndF7R-RzqY0qCXkck_YDhZpSY61Euk8zeRHDYjK65yXO9gJl9fNPb_e8KQ-MSur9-PNlDYq3Jgob3CkMHfGz0mxrfh6Tph82EFv18JhPYoXF0wM2A"
              />
              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-background-dark bg-primary text-[#111814] font-bold text-xs">
                2k+
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400 text-sm">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
              <span className="text-sm font-medium text-white">
                Top Rated Tours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
