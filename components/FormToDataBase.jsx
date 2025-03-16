import { useState } from "react";
import formStyle from "../styles/Form.module.css";

function FormToDataBase() {
  const [errors, setErrors] = useState({});
  const [formSent, setFormSent] = useState(false);

  const handleGoBack = () => {
    setFormSent(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    let validationErrors = {};
  
    const name = formData.get("name");
    const onlyLettersRegex = /^[a-zA-Z]{3,12}$/;
    if (!name.match(onlyLettersRegex)) {
      validationErrors.name = "Imię powinno mieć od 3 do 12 liter.";
    }

    const phone = formData.get("phone");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!phone.match(emailRegex)) {
      validationErrors.phone = "Proszę wpisać poprawny Email.";
    }
  
    const amount = formData.get("amount") || "";
    if (amount.length === "") {
      validationErrors.amount = "Wartość kwota nie może być pusta. Wpisz kwotę.";
    }

    const interval = formData.get("interval") || "";
    if (interval.length === "") {
      validationErrors.interval = "Wpisz interwał wysyłania wiadomości.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({});
  
    const data = { name, phone, amount, interval };

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <>
      {!formSent ? (
        <form className={formStyle.frontPageForm} onSubmit={handleSubmit}>
          <h2>Dodaj zawodnika</h2>

          <label>Imię:</label>
          <input className={formStyle.formName} type="text" name="name" required />
          {errors.name && <div className={formStyle.error}>{errors.name}</div>}

          <label>Numer telofonu:</label>
          <input className={formStyle.formEmail} type="phone" name="phone" required />
          {errors.email && <div className={formStyle.error}>{errors.email}</div>}

          <label>Kwota:</label>
          <input className={formStyle.formEmail} type="number" name="amount" required />
          {errors.email && <div className={formStyle.error}>{errors.email}</div>}

          <label>Interwał:</label>
          <input className={formStyle.formEmail} type="number" name="interval" required />
          {errors.email && <div className={formStyle.error}>{errors.email}</div>}

          <button type="submit">Wyślij</button>
        </form>
      ) : (
        <div className={formStyle.successMessage}>
          <h2>Dziękujemy!</h2>
          <p>Dane zawodnika dodano do bazy.</p>
          <button onClick={handleGoBack} className={formStyle.goBack}>Wróć</button>
        </div>
      )}
    </>
  );
}

export default FormToDataBase;

