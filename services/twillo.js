import { getDatabase, ref, get } from "firebase/database";

const sendMessages = async () => {
    const db = getDatabase();
    const playersRef = ref(db, "players");

    try {
        const snapshot = await get(playersRef);

        if (snapshot.exists()) {
            const players = snapshot.val();

            Object.values(players).forEach(player => {
                setTimeout(async () => {
                    const response = await fetch('/api/sendMessage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            phone: `+48${player.phone}`,
                            message: `Panie ${player.name}, mamy nie rozliczone ${player.amount} za ostanie prace. 
                            Proszę o uregulowanie płatności. Tomasz Kowalski`
                        })
                    });

                    const data = await response.json();
                    console.log("Message Sent:", data);
                }, player.interval * 3600);
            });
        } else {
            console.log("No players found.");
        }
    } catch (error) {
        console.error("Error fetching players:", error);
    }
};

// Call sendMessages() when needed
