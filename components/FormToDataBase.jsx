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
    if (!onlyLettersRegex.test(name)) {
      validationErrors.name = "Imię powinno mieć od 3 do 12 liter.";
    }
  
    const phone = formData.get("phone");
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(phone)) {
      validationErrors.phone = "Proszę wpisać poprawny numer telefonu.";
    }
  
    const amount = formData.get("amount");
    if (!amount) {
      validationErrors.amount = "Wartość kwota nie może być pusta. Wpisz kwotę.";
    }
  
    const interval = formData.get("interval");
    if (!interval) {
      validationErrors.interval = "Wpisz interwał wysyłania wiadomości.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({});
    const data = { name, phone, amount, interval };

    console.log('data',data)
  
    try {
      console.log('in try');
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json(); 
      console.log('result',result);
      if (response.ok && result.success) {
        setFormSent(true);
        event.target.reset();
      } else {
        console.error("Error:", result.error);
        alert("Failed to save data: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending data.");
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

