import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
            <span className="material-symbols-outlined text-4xl">
              lock_reset
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                mail
              </span>
              <input
                className="w-full h-12 pl-12 pr-4 rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 transition-all font-medium"
                id="email"
                placeholder="name@example.com"
                type="email"
              />
            </div>
          </div>

          <button
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
            type="button"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
