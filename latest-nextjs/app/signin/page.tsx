"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={async () => {
            if (!username || !password) {
              alert("Please fill in both fields.");
              return;
            }
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/signin",
                {
                  username,
                  password,
                }
              );

              // Assuming the backend sends back a token and user info
              const { token, user } = response.data;

              // Save token to localStorage (or cookie, depending on your approach)
              localStorage.setItem("authToken", token);

              alert(`Welcome back, ${user.username}!`);
              router.push("/home"); // Redirect to the home page
            } catch (error) {
              console.error("Error signing in:", error);
              alert("Signin failed. Please check your credentials.");
            }
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
