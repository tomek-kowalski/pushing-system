import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import UncontrolledForm from "@/components/Form";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/OneSignalSDK.sw.js")
        .then(() => console.log("✅ Service Worker registered successfully!"))
        .catch((error) => console.error("❌ Service Worker registration failed:", error));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Pushing system</title>
        <meta name="description" content="Pushing system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ✅ Load OneSignal SDK properly */}
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />

      <Script id="onesignal-init" strategy="afterInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "780e0b25-1162-4a45-a6d2-a7fc33e84650",
              safari_web_id: "web.onesignal.auto.2e77cfdc-f6e8-4572-82d4-363b6713f2bc",
              notifyButton: {
                enable: true,
              },
            });
          });
        `}
      </Script>

      <div>
        <Header />
        <main className={styles.main}>
          <UncontrolledForm />
        </main>
      </div>
    </>
  );
}
