"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <h1>its ashutosh</h1>
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
              await axios.post("http://localhost:3000/api/v1/signup", {
                username,
                password,
              });
              router.push("/signin");
            } catch (error) {
              console.error("Error signing up:", error);
              alert("Signup failed. Please try again.");
            }
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
