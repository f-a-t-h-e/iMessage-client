import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Auth from "@/components/Auth";
import Chat from "@/components/Chat";
import { Session } from "next-auth";

export default function Home() {
  const { data: session } = useSession();
  console.log("🚀 ~ file: index.tsx:6 ~ Home ~ data", session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  return (
    <Box>
      {session?.user.username ? (
        <>
          <Chat session={session} />
        </>
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
