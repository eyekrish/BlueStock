import React, { useState } from "react";
import logoImage from "./logo.png";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log({ email, password, keepSignedIn });
  };

  return (
    <div className="relative min-h-screen bg-[#d1d1d1]/30 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-6">
          <img src={logoImage} alt="Bluestock Logo" className="h-10 mr-2" />
         
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block font-semibold text-gray-700">Password</label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* reCAPTCHA Placeholder */}
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="accent-green-600" />
              <span className="text-gray-800 font-medium">I’m not a robot</span>
            </div>
            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="h-6" />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={() => setKeepSignedIn(!keepSignedIn)}
              className="accent-violet-600"
            />
            <label className="text-sm text-gray-700">Keep me signed in</label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or sign in with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5" />
            <span>Continue with Google</span>
          </button>

          {/* Create Account */}
          <p className="text-center text-sm text-indigo-600 mt-4">
            <a href="#" className="hover:underline">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
