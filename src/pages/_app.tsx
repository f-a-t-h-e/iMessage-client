import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { theme } from "@/chakra/theme";
import { ApolloProvider } from "@apollo/client";
import { client as graphQLClient } from "@/graphql/apollo-client";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log("🚀 ~ file: _app.tsx:10 ~ session", session?.user?.username);

  return (
    <ApolloProvider client={graphQLClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
