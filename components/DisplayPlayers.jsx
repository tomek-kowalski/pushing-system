import { useEffect, useState } from "react";
import formStyle from "../styles/Form.module.css";
import { database } from "../dbConnect";
import { ref, onValue } from "firebase/database";

export default function DisplayPlayers({ onEdit }) {
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

  const handleDelete = async (id) => {
    if (confirm("Czy na pewno chcesz usunąć tego zawodnika?")) {
      try {
        await fetch("/api/deletePlayer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      } catch (error) {
        console.error("Failed to delete player:", error);
      }
    }
  };


  return (
    <section className={formStyle.frontPagePlayers}>
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
                <button onClick={() => onEdit(player.id)}>Edytuj</button>
                <button onClick={() => handleDelete(player.id)}>Usuń</button>
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

