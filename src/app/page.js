// pages/index.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../public/omj-logo.png";
import Image from "next/image";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      router.push(`/booking`);
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-green-200 p-8 rounded shadow-md">
          <div className="flex border border-black">
            <Image src={logo} width={100} height={100} alt="logo" />
            <p className="md:text-3xl max-w-1xl font-bold mx-3 text-center md:mt-4">
              RAMZAN DISCOUNT RATION SCHEME
            </p>
          </div>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
