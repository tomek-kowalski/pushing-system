import { useState } from "react";
import formStyle from "../styles/Form.module.css";

function UncontrolledForm() {
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

    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      validationErrors.email = "Proszę wpisać poprawny Email.";
    }
  
    const message = formData.get("message") || "";
    if (message.length < 5) {
      validationErrors.message = "Wiadomość powinna mieć co najmniej 5 znaków.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({});
  
    const data = { name, email, message };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.success) {
        setFormSent(true);
        event.target.reset();
      } else {
        alert("Failed to send email: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <>
      {!formSent ? (
        <form className={formStyle.frontPageForm} onSubmit={handleSubmit}>
          <h2>Chcesz coś napisać?</h2>

          <label>Opisz problem:</label>
          <textarea name="message" rows="4" cols="50" required></textarea>
          {errors.message && <div className={formStyle.error}>{errors.message}</div>}

          <label>Imię:</label>
          <input className={formStyle.formName} type="text" name="name" required />
          {errors.name && <div className={formStyle.error}>{errors.name}</div>}

          <label>Email:</label>
          <input className={formStyle.formEmail} type="email" name="email" required />
          {errors.email && <div className={formStyle.error}>{errors.email}</div>}

          <button type="submit">Wyślij</button>
        </form>
      ) : (
        <div className={formStyle.successMessage}>
          <h2>Dziękujemy!</h2>
          <p>Twoja wiadomość została wysłana.</p>
          <button onClick={handleGoBack} className={formStyle.goBack}>Wróć</button>
        </div>
      )}
    </>
  );
}

export default UncontrolledForm;

