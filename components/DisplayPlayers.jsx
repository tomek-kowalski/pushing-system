import { useEffect, useState } from "react";
import formStyle from "../styles/Form.module.css";

export default function DisplayPlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        if (data.success) {
          setPlayers(Object.values(data.data));
        } else {
          console.error("Error fetching players:", data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <section className={formStyle.frontPageForm}>
      <h2>Lista zawodników</h2>
      <ul>
        {players.length > 0 ? (
          players.map((player, index) => (
            <li key={index}>
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
