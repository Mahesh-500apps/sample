// pages/csv-mapping.js
import { useSession, getSession } from "next-auth/react";

export default function CsvMapping() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      {/* CSV Mapping Code Here */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
