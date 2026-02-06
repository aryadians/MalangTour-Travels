import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side: Image Section */}
      <div className="hidden lg:block relative w-1/2 bg-surface-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700 ease-in-out"
          data-alt="Malang Night Paradise illuminated colorful lanterns at night"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKhdF5TG5hc5gcqHiDRkdn7r51VoFqr0Yg4UMQr_3QjlibfyWoVd8kC895QUR1zaXu8q-dqF_1oeGXIwmr7RFQBtSIooorZOuP6Q7vE7PYKOtzmiSZ1RBmseneAEHlzMgoj7qy0agj1WPi-Fo39ngVFkHTPDpAo5fHLu7-OO1CtZAYbHgKF5ERxYeNP9Ji6x8kC_BGk-67SGhFBZmEYD1VzajB_dvzojNnahChyTHcv4CsIfccvgnosJL5b5mfBeOfPU-hCGOhOQ')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-12 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              Premium
            </span>
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
              Travel Dashboard
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Experience the Magic of <br />
            <span className="text-primary">Malang Night Paradise</span>
          </h2>
          <p className="text-text-muted text-lg max-w-md">
            Your gateway to managing exclusive tours, bookings, and
            unforgettable journeys in East Java.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-20 relative bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-[480px] flex flex-col">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">
                travel_explore
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-gray-900 dark:text-white">
              Log In to Your Journey
            </h1>
            <p className="text-gray-500 dark:text-text-muted text-base">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="form-input block w-full rounded-xl border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-text-muted focus:border-primary focus:ring-primary h-14 pl-12 sm:text-sm"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-text-muted">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative group">
                <input
                  className="form-input block w-full rounded-xl border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-text-muted focus:border-primary focus:ring-primary h-14 pl-12 pr-10 sm:text-sm"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-text-muted">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                </div>
                <button
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 dark:text-text-muted hover:text-gray-600 dark:hover:text-white transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    visibility_off
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-white dark:bg-surface-dark"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-gray-600 dark:text-text-muted"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-primary hover:text-green-400 transition-colors"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-background-dark bg-primary hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-primary/25"
              type="button"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative mt-8 mb-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-200 dark:border-border-dark"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-background-light dark:bg-background-dark text-sm text-gray-500 dark:text-text-muted font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-border-dark rounded-xl shadow-sm bg-white dark:bg-surface-dark text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#25322a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="button"
            >
              <svg
                className="h-5 w-5 mr-2"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.225 -9.429 56.472 -10.689 57.25 L -10.689 60.15 L -6.824 60.15 C -4.561 58.07 -3.264 55.009 -3.264 51.509 Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M -14.754 63.239 C -11.519 63.239 -8.804 62.156 -6.824 60.15 L -10.689 57.25 C -11.764 57.965 -13.139 58.39 -14.754 58.39 C -17.874 58.39 -20.514 56.284 -21.454 53.464 L -25.449 53.464 L -25.449 56.564 C -23.475 60.485 -19.414 63.239 -14.754 63.239 Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M -21.454 53.464 C -21.694 52.749 -21.824 51.989 -21.824 51.214 C -21.824 50.439 -21.694 49.679 -21.454 48.964 L -21.454 45.864 L -25.449 45.864 C -26.261 47.481 -26.719 49.297 -26.719 51.214 C -26.719 53.131 -26.261 54.947 -25.449 56.564 L -21.454 53.464 Z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M -14.754 44.039 C -12.994 44.039 -11.419 44.644 -10.174 45.839 L -6.714 42.379 C -8.804 40.429 -11.519 39.239 -14.754 39.239 C -19.414 39.239 -23.475 41.993 -25.449 45.914 L -21.454 48.964 C -20.514 46.144 -17.874 44.039 -14.754 44.039 Z"
                    fill="#EA4335"
                  ></path>
                </g>
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-border-dark rounded-xl shadow-sm bg-white dark:bg-surface-dark text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#25322a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="button"
            >
              <svg
                className="h-5 w-5 mr-2 text-gray-900 dark:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              Facebook
            </button>
          </div>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-text-muted">
            Don't have an account?
            <Link
              className="font-bold text-primary hover:text-green-400 transition-colors ml-1"
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-600">
          © 2024 Malang Premium Travel. All rights reserved.
        </div>
      </div>
    </div>
  );
}
