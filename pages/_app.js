import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {

  return (
    <SessionProvider session={pageProps.session}>
      <SpeedInsights />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
