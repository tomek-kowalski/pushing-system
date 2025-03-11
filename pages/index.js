import Head from "next/head";
import UncontrolledForm from "@/components/Form";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";


export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pushing system</title>
        <meta name="description" content="Pushing system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>

        <Header/>

        <main className={styles.main}>
          <UncontrolledForm/>
        </main>

      </div>
    </>
  );
}
