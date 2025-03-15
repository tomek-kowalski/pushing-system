import { useSession, signIn, signOut } from "next-auth/react";

import Styles from "../styles/LogInOut.module.css";

export default function LogInOut() {
  const { data: session } = useSession();

  if (!session) {
    return (
        <button
          onClick={() => signIn("google")}
          className={Styles.btnLogin}
        >
          Zaloguj się z Google
        </button>
    );
  }

  return (
      <button
        onClick={() => signOut()}
        className={Styles.btnLogout}
      >
        Wyloguj
      </button>
  );
}
