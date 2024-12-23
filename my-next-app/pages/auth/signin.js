// pages/signin.js
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign In</h1>
      {providers ? (
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, { callbackUrl: "/csv-mapping" })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))
      ) : (
        <p>Loading providers...</p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers: providers || null } };
}
