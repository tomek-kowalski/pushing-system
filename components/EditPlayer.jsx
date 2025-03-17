import { useState, useEffect } from "react";
import formStyle from "../styles/Form.module.css";

function EditPlayer({ id, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: "",
    interval: "",
  });

  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`/api/editPlayer?id=${id}`);
        const data = await response.json();
        if (data.success) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    if (id) {
      fetchPlayerData();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/savePlayerData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      setFormSent(true);
    } else {
      console.error("Error:", result.error);
      alert("Failed to update player: " + result.error);
    }
  };

  return (
    <>
      {!formSent ? (
        <form className={formStyle.frontPageAddNew} onSubmit={handleSubmit}>
          <h2>Edytuj zawodnika</h2>

          <label>Imię:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>Numer telefonu:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <label>Kwota:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />

          <label>Interwał:</label>
          <input
            type="number"
            name="interval"
            value={formData.interval}
            onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
          />

          <button type="submit">Zapisz zmiany</button>
          <button type="button" onClick={onCancel}>
            Anuluj
          </button>
        </form>
      ) : (
        <div className={formStyle.successMessage}>
          <h2>Dziękujemy!</h2>
          <p>Dane zawodnika zaktualizowano.</p>
          <button onClick={onCancel} className={formStyle.goBack}>
            Wróć
          </button>
        </div>
      )}
    </>
  );
}

export default EditPlayer;
