import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logoImage from "./logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        setTimeout(() => {navigate("/admin"); }, 100);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterMessage("");
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();
      setRegisterMessage(data.message);
      setRegisterSuccess(data.success);

      if (data.success) {
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setTimeout(() => setShowRegister(false), 1500);
      }
    } catch (error) {
      setRegisterMessage("Something went wrong. Please try again.");
      setRegisterSuccess(false);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#d1d1d1]/100 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={logoImage} alt="Bluestock Logo" className="h-10 mr-2" />
        </div>

        {/* Login Form */}
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
            <label className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

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
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5"
            />
            <span>Continue with Google</span>
          </button>

          {/* Create Account */}
          <p className="text-center text-sm text-indigo-600 mt-4">
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="hover:underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </div>

      {/* Register Modal (Moved outside Login Form) */}
      {showRegister && (
        <div
          className="fixed inset-0 bg-[#d1d1d1]/100 flex items-center justify-center z-50"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                disabled={registerLoading}
              >
                {registerLoading ? "Registering..." : "Register"}
              </button>
            </form>

            {registerMessage && (
              <p
                className={`mt-4 text-center ${registerSuccess ? "text-green-600" : "text-red-600"
                  }`}
              >
                {registerMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
