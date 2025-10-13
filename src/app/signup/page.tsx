


"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const carouselImages = [
   {
    src: "/images/login2.jpg",
    alt: "Premium Sneakers Collection",
    // heading: "Serve Looks, Not Apologies",
    // description: "Log in to cop the latest heat and continue serving looks that hit different.",
  },
  {
    src: "/images/login3.png",
    alt: "Streetwear Fashion",
    // heading: "Built Different",
    // description: "Access exclusive drops, track your orders, and shop the collection that never misses.",
  },
  {
    src: "/images/loginscreen.jpg",
    alt: "Nike Style",
    // heading: "Your Drip Awaits",
    // description: "Sign in to unlock exclusive drops and keep your fits fresh.",
  },
];

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters long");
      return;
    }

    const result = await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    if (result.success) {
      router.push("/account");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const displayError = validationError || error;
  const currentImage = carouselImages[currentImageIndex];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:p-8 bg-white mt-8">
        <div className="max-w-md w-full space-y-6 lg:space-y-8 py-8 lg:py-0">
          {/* Logo/Brand */}
          <div className="text-center">
            <Link href="/" className="inline-block mb-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-ispire hidden lg:block">
                MYDEARNIKES
              </h1>
            </Link>
            <h2 className="text-lg sm:text-xl lg:text-2xl tracking-tight font-semibold text-gray-900 mt-4 lg:mt-6 font-inter">
              Create your account
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 lg:mt-2">
              Join the community and start shopping
            </p>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 lg:gap-3">
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs sm:text-sm text-red-800">{displayError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-9 lg:pl-10 pr-3 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full pl-9 lg:pl-10 pr-3 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-9 lg:pl-10 pr-3 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-9 lg:pl-10 pr-10 lg:pr-12 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full pl-9 lg:pl-10 pr-3 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-5 lg:py-6 text-sm lg:text-base font-medium rounded-lg transition-colors"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-2 lg:pt-4">
            <Link
              href="/"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image Carousel (Hidden on Mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Carousel Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
          </div>
        ))}

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white z-10">
          <div key={currentImageIndex} className="animate-fade-in">
            {/* <h2 className="text-4xl font-bold mb-4">{currentImage.heading}</h2>
            <p className="text-lg text-gray-200 max-w-md mb-8">
              {currentImage.description}
            </p> */}
          </div>

          {/* Benefits */}
           <div className="grid grid-cols-3 gap-8 max-w-lg mb-6">
            <div>
              <div className="text-3xl font-bold">1500+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">300+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
          
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}