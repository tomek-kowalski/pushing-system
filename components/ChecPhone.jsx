import CheckStyle from "../styles/Form.module.css";
import { useState } from "react";

export default function CheckPhone() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneData, setPhoneData] = useState(null);
    const [error, setError] = useState("");

    const handleClick = async () => {
        if (!phoneNumber) {
            setError("Please enter a phone number.");
            return;
        }
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`/api/lookup-number?phoneNumber=${encodeURIComponent(phoneNumber)}`);
            const data = await response.json();

            if (response.ok) {
                setPhoneData(data);
            } else {
                setError(data.error || "Failed to fetch phone details.");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Internal error. Please try again later.");
        }
    };

    return (
        <>
                <form className={CheckStyle.frontPageFormPhone} onSubmit={(e) => e.preventDefault()}>
                <h2>Co wiadomo o numerze telefonu?</h2>
                    <label htmlFor="phone">Wpisz numer telefonu:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="np. 49123456789"
                    />
                    <button onClick={handleClick}>Sprawdź numer</button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {phoneData && (
                    <div className={CheckStyle.phoneResult}>
                        <h3>Phone Lookup Result:</h3>
                        <p><strong>Message:</strong> {phoneData.message}</p>
                        <p><strong>Formatted:</strong> {phoneData.formatted}</p>
                        <p><strong>Valid:</strong> {phoneData.valid ? "Yes" : "No"}</p>
                        <p><strong>Fraud Score:</strong> {phoneData.fraud_score}</p>
                        <p><strong>Carrier:</strong> {phoneData.carrier}</p>
                        <p><strong>Location:</strong> {phoneData.city}, {phoneData.region}, {phoneData.country}</p>
                        <p><strong>Time Zone:</strong> {phoneData.timezone}</p>
                        <p><strong>Risky:</strong> {phoneData.risky ? "Yes" : "No"}</p>
                        <p><strong>Active Status:</strong> {phoneData.active_status}</p>
                    </div>
                )}
        </>
    );
}
