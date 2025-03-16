import { useEffect, useState } from "react";
import formStyle from "../styles/Form.module.css";
import { database } from "../dbConnect"; // Ensure correct import
import { ref, onValue } from "firebase/database";

export default function DisplayPlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "players");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setPlayers(Object.entries(snapshot.val()).map(([id, player]) => ({ id, ...player })));
      } else {
        setPlayers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className={formStyle.frontPageForm}>
      <h2>Lista zawodników</h2>
      <ul>
        {players.length > 0 ? (
          players.map((player) => (
            <li key={player.id}>
              <h3>{player.name}</h3>
              <p>Telefon: {player.phone}</p>
              <p>Kwota: {player.amount}</p>
              <p>Interwał: {player.interval}</p>
              <div>
                <button>Edytuj</button>
                <button>Usuń</button>
              </div>
            </li>
          ))
        ) : (
          <p>Brak zawodników do wyświetlenia.</p>
        )}
      </ul>
    </section>
  );
}
