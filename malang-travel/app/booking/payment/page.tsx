import Link from 'next/link';

export default function PaymentPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXOtJ_k28ma0XrfT5GAVp1eRabSD9zAHNmubqFx__M5_rKSY7iXsI10RU8o24HFgkVMoGUpvxrIMarIhGz7pa7DV7GGvg0EJqEK2iMXJ1HIWzXGcms2h_e7sxRnsYlN01t-XxlyMWYbMIyWqDb3CeMJcnP5edI-mABmGfGSDTfUZJZpRtl4lpj_YZ9yPFNpwuQiolVZQ9KzXol6-gd7ORBeQWMizprAMV5GMpm38J7XFHIFlKp9fIX-n-eGpxefvKl_AXSZTKJsw')"}}
        ></div>
      </div>

      {/* Main Payment Modal */}
      <div className="relative z-20 w-full max-w-5xl bg-white dark:bg-[#1a2c26] shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px] animate-fade-in-up">
        {/* Left Column: Order Summary */}
        <div className="w-full md:w-[400px] bg-gray-50 dark:bg-[#152620] border-r border-gray-100 dark:border-white/5 p-8 flex flex-col">
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Order Summary</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Order ID #TRV-MLG-8821</p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
            {/* Product Card */}
            <div className="bg-white dark:bg-white/5 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 mb-6">
              <div className="aspect-video w-full rounded-md bg-gray-200 mb-3 overflow-hidden relative">
                <img
                  alt="Tourists hiking near active volcano crater"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD41BdN005h1oYjf_UrKC5_ixA01jSZ5T3_aE5KQ_457F7cM3KNilx2iPLT34_ZUejQPvTL1QeDqZnlwQU1UYQLSnk5eD88YlowX_4Gec-Ywjukh71KOW8mOd1TbKz4Z293qbc4FvEunm-Cnwh6YRf4jAJL72FIn-F86Esf465cv_zaGbdqBBqM45DtpI9uaDpEJTJgKTalT1ssm4_mPAJCZ1Q0-rAG6t6GfCIdGzzwkBZy5xUMA911bxeNxAvhCAoXa2a9weI1uQ"
                />
              </div>
              <h4 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight mb-1">Gunung Bromo Sunrise Tour</h4>
              <p className="text-primary text-sm font-medium mb-3">Private Trip • 14 Aug 2024</p>

              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span>2 Pax</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>1 Day Duration</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 dark:border-white/10 pt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal (2 Pax)</span>
                <span>Rp 700.000</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Service Fee</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Tax (Included)</span>
                <span>Rp 0</span>
              </div>
            </div>
          </div>

          {/* Total Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Due</span>
              <span className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight">Rp 700.000</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Secure Payment by Midtrans
            </div>
          </div>
        </div>

        {/* Right Column: Payment Method Selection */}
        <div className="flex-1 p-8 flex flex-col bg-white dark:bg-[#1a2c26]">
          {/* Header with Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Payment</h2>

            {/* Stepper */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</div>
                <span>Select</span>
              </div>
              <div className="w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">2</div>
                <span>Pay</span>
              </div>
              <div className="w-4 h-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">3</div>
                <span>Success</span>
              </div>
            </div>
          </div>

          {/* Payment Methods List */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2">

            {/* QRIS Option */}
            <label className="block group cursor-pointer relative">
              <input type="radio" name="payment_method" className="custom-radio peer sr-only" defaultChecked />
              <div className="relative border-2 border-gray-100 dark:border-white/10 rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:border-primary/50">
                {/* Custom Radio Circle */}
                <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0">
                  <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200"></div>
                </div>

                <div className="bg-gray-100 dark:bg-white/90 p-2 rounded w-16 h-10 flex items-center justify-center shrink-0">
                  <img alt="QRIS payment logo" className="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvXbc14XeU97Db3x6vijxZsAZR9s9KapaF1ECKlFh6kH6gFC6XXQOObZuGBdQKsubj26LevI4HghTTm_837AS1ZEYy6E7iU1Yz5DRZwbs0-XvbD1Qj1Vlw_H-eoZRjVuc_cqHPgah_fItpiz_opyIYzRv0BLS5LehnC-GK0-gnfrT0o0I-oRLXHsAguZs7RhNUT9MWu6pYWuMtL7qbODBuEg_OIR6xAUg476dNnCFZ5lM6pdJfNXAhI7Lf6iCMX8SCKRk1LeJKtw"/>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">QRIS</span>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">Recommended</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Scan with GoPay, OVO, ShopeePay, Dana</p>
                </div>
              </div>
            </label>

            {/* Virtual Accounts Section Header */}
            <div className="mt-6 mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Virtual Accounts</span>
            </div>

            {/* BCA VA */}
            <label className="block group cursor-pointer relative">
              <input type="radio" name="payment_method" className="custom-radio peer sr-only" />
              <div className="relative border-2 border-gray-100 dark:border-white/10 rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:border-primary/50">
                <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0">
                  <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200"></div>
                </div>

                <div className="bg-white p-1 rounded border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img alt="Bank Central Asia logo" className="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-PMUr5fdOGOOu6SMTAAs_kZSqAOCu6rR1QD5lf3DrzHDimBMTWXc5gownS2khWF3cvJqr3M0etyR0lnFuGnEV_n5UHFnxGC3yRTXyC1piRysVgAT-1XndDiMTZOH5F6vm_66saZr9qO7V6FZ9rmDjKCDXqOqYwZbvlgkaSDgxk0xi_d3TxyyCe-pP2CLUHmr8g1TFLFy90w7H8N9AESOTOHP6Wu64lkAnmxjS4P_4T9RmHjr6corz970CUyD_3MPfiurUf4u3ow"/>
                </div>

                <div className="flex-1">
                  <span className="font-semibold text-gray-900 dark:text-white block">BCA Virtual Account</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Automatic verification</p>
                </div>
              </div>
            </label>

            {/* Mandiri VA */}
            <label className="block group cursor-pointer relative">
              <input type="radio" name="payment_method" className="custom-radio peer sr-only" />
              <div className="relative border-2 border-gray-100 dark:border-white/10 rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:border-primary/50">
                <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0">
                  <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200"></div>
                </div>

                <div className="bg-white p-1 rounded border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img alt="Bank Mandiri logo" className="h-4 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-82rfysDKQU_63VZGkpag_9dQvfP6n337X_wdNewzzh8T3syV3TXPstnGaebCmLHGAkpLnpwPyBuX-rQwMtEWqTfWNyHuQet7t_wKYcZfLoe5Av6V8Cad644i6Ei0S4vWG7_hw53qwLiaiY4cXfjWSB2xa2xoXBogUk0-ug9DepbAyxyFVWJvYs2rx5WQC2SpPENuNCBRlpnBfpucNklGAxd_vHm-g_FHNYsI6o5VcPNUkCDC8SYU7aFF1VJamQSoGSKSHJ7teg"/>
                </div>

                <div className="flex-1">
                  <span className="font-semibold text-gray-900 dark:text-white block">Mandiri Virtual Account</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Accepts Bill Payment</p>
                </div>
              </div>
            </label>

            {/* BNI VA */}
            <label className="block group cursor-pointer relative">
              <input type="radio" name="payment_method" className="custom-radio peer sr-only" />
              <div className="relative border-2 border-gray-100 dark:border-white/10 rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:border-primary/50">
                <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0">
                  <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200"></div>
                </div>

                <div className="bg-white p-1 rounded border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img alt="Bank Negara Indonesia logo" className="h-5 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl9USy1fFepBhrXGk0kQM5XzUcUYL_Nf1UzMmqA9gpagZCGBpJUhsV-4Y2J8pn4xnhTgzNnmnlqB8EyfS2LuGms_VVWFQSqeqThVOoD25677vWv9sjPP6I45ArpIlp2HnyHDsA7IL0a8zkNTq2Ck0agul3APt_EuIwJaO9NCelC1Ya-LwbmzWkLNwxYDGXiu2cyOCXM2POjSSbmvagyWRVI38gSc2RZ9xralXIAagMAoh4rXA3XNwY7lbr6_e6VWMZuWj353Q7iQ"/>
                </div>

                <div className="flex-1">
                  <span className="font-semibold text-gray-900 dark:text-white block">BNI Virtual Account</span>
                </div>
              </div>
            </label>

            {/* Others Header */}
            <div className="mt-6 mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Others</span>
            </div>

            {/* Credit Card */}
            <label className="block group cursor-pointer relative">
              <input type="radio" name="payment_method" className="custom-radio peer sr-only" />
              <div className="relative border-2 border-gray-100 dark:border-white/10 rounded-lg p-4 flex items-center gap-4 transition-all duration-200 hover:border-primary/50">
                <div className="radio-circle-outer w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center shrink-0">
                  <div className="radio-circle-inner w-2.5 h-2.5 rounded-full bg-primary opacity-0 transform scale-0 transition-all duration-200"></div>
                </div>

                <div className="bg-white p-1 rounded border border-gray-100 w-16 h-10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-600 text-[28px]">credit_card</span>
                </div>

                <div className="flex-1">
                  <span className="font-semibold text-gray-900 dark:text-white block">Credit Card</span>
                  <div className="flex gap-2 mt-1">
                    <img alt="Visa Logo" className="h-3 w-auto opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5qIqINOViNaWXLJMcF8FDDFVFGceHvob5JIck77iFwBZvpZwB0cqEG7cTfUhSI_csxG2Ln-h_8b6jnsiTsfG-dUtCbrMyrV3wB1vqswLqxFed3rwOZZq0TvEU2Bu5hSTC9-wkR6nztjzc8NG_zUOu0JAxFktjo4q45ZbLenNrRu1vW6GYERWV7qzwLgsJ_xLdfqU8-ZVGYxI_RorLWkMK1pyDHduwqP8J7KONJDAHx-GfH4ILEFUFb0cOqphEH2a4-5KyXKufQg"/>
                    <img alt="Mastercard Logo" className="h-3 w-auto opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_lic5ZFsVKlWbZTbWLP5Pa2O4LlrMdaFge6NpkUQxF1JmHUXisqyRK7MHMSUERJdD175tOulyY8z6RBhfD_YvpkXu62TYEduAa7aJDwwk7B7B_vx-p-LPgjNmbaseOXqWpr_wGNWsrYX4_jikujkcuO9XppdLlHQgOIJjeIkVrd4NT_EZ27LCVF5chfIzl9AnZibTMtsnaT5iLADrID8EqF4y0M-xuLK61tnQ4pxJCly14-CFVqWgDkcjnBqzhX-B6WPwMInF4g"/>
                  </div>
                </div>
              </div>
            </label>

          </div>

          {/* Pay Button Section */}
          <div className="pt-6 mt-2 border-t border-gray-100 dark:border-white/10">
            <Link href="/booking/success" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg shadow-lg shadow-primary/30 transition-all duration-200 flex items-center justify-center gap-2 text-lg group">
              <span>Pay Rp 700.000</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
