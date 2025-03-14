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
                    <h3>Rezultaty dla sprawdzanego numeru:</h3>
                    <p><strong>Message:</strong> {phoneData.message}</p>
                    <p><strong>Success:</strong> {phoneData.success ? "Yes" : "No"}</p>
                    <p><strong>Formatted:</strong> {phoneData.formatted}</p>
                    <p><strong>Local Format:</strong> {phoneData.local_format}</p>
                    <p><strong>Valid:</strong> {phoneData.valid ? "Yes" : "No"}</p>
                    <p><strong>Fraud Score:</strong> {phoneData.fraud_score}</p>
                    <p><strong>Recent Abuse:</strong> {phoneData.recent_abuse ? "Yes" : "No"}</p>
                    <p><strong>VOIP:</strong> {phoneData.VOIP ? "Yes" : "No"}</p>
                    <p><strong>Prepaid:</strong> {phoneData.prepaid ? "Yes" : "No"}</p>
                    <p><strong>Risky:</strong> {phoneData.risky ? "Yes" : "No"}</p>
                    <p><strong>Active:</strong> {phoneData.active ? "Yes" : "No"}</p>
                    <p><strong>Carrier:</strong> {phoneData.carrier}</p>
                    <p><strong>Line Type:</strong> {phoneData.line_type}</p>
                    <p><strong>Country:</strong> {phoneData.country}</p>
                    <p><strong>City:</strong> {phoneData.city}</p>
                    <p><strong>Region:</strong> {phoneData.region}</p>
                    <p><strong>Zip Code:</strong> {phoneData.zip_code}</p>
                    <p><strong>Dialing Code:</strong> {phoneData.dialing_code}</p>
                    <p><strong>Active Status:</strong> {phoneData.active_status}</p>
                    <p><strong>SMS Domain:</strong> {phoneData.sms_domain}</p>
                    <p><strong>SMS Email:</strong> {phoneData.sms_email}</p>
                    <p><strong>User Activity:</strong> {phoneData.user_activity}</p>
                    <p><strong>MNC:</strong> {phoneData.mnc}</p>
                    <p><strong>MCC:</strong> {phoneData.mcc}</p>
                    <p><strong>Leaked:</strong> {phoneData.leaked ? "Yes" : "No"}</p>
                    <p><strong>Spammer:</strong> {phoneData.spammer ? "Yes" : "No"}</p>
                    <p><strong>Request ID:</strong> {phoneData.request_id}</p>
                    <p><strong>Name:</strong> {phoneData.name}</p>
                    <p><strong>Timezone:</strong> {phoneData.timezone}</p>
                    <p><strong>Do Not Call:</strong> {phoneData.do_not_call ? "Yes" : "No"}</p>
                    <p><strong>Accurate Country Code:</strong> {phoneData.accurate_country_code ? "Yes" : "No"}</p>

                    <h4>Associated Email Addresses:</h4>
                    <p><strong>Status:</strong> {phoneData.associated_email_addresses?.status}</p>
                    {phoneData.associated_email_addresses?.emails.length > 0 ? (
                    <ul>
                    {phoneData.associated_email_addresses.emails.map((email, index) => (
                    <li key={index}>{email}</li>
                    ))}
                     </ul>
                    ) : (
                    <p>No associated emails found.</p>
                    )}
                    </div>
                )}
        </>
    );
}
