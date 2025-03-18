import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import UncontrolledForm from "@/components/Form";
import Header from "@/components/Header";
import CheckPhone from "@/components/ChecPhone";
import FormToDataBase from "@/components/FormToDataBase";
import DisplayPlayers from "@/components/DisplayPlayers";
import EditPlayer from "@/components/EditPlayer";
import styles from "@/styles/Home.module.css";


export default function HomePage() {
  

  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/OneSignalSDK.sw.js")
        .then(() => console.log("✅ Service Worker registered successfully!"))
        .catch((error) => console.error("❌ Service Worker registration failed:", error));
    }
  }, []);

  if(!session) {
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
        <CheckPhone />
      </main>
    </div> 
  </>
);
  }
  else {
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
            <CheckPhone />
            <DisplayPlayers onEdit={(id) => setEditingPlayerId(id)} />
            {editingPlayerId ? (
            <EditPlayer id={editingPlayerId} onCancel={() => setEditingPlayerId(null)} />
            ) : (
            <FormToDataBase/>
            )}
            
          </main>
        </div> 
      </>
    );
  }
 
}
