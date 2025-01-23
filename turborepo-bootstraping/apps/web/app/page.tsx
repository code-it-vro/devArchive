"use client";

import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "40%",
          alignItems: "center",
        }}
      >
        <TextInput placeholder="Enter your ID" />
        <button onClick={() => router.push("/room")}>Join Room</button>
      </main>
    </div>
  );
}
