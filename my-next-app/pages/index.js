import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the CSV Mapping App</h1>
      <button onClick={() => signIn()}>Get Started</button>
    </div>
  );
}
