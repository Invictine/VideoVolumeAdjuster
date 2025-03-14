console.log("✅ script.js is running!");

console.log("🎵 Music Slider:", document.getElementById("musicVolume"));
console.log("🎤 Vocals Slider:", document.getElementById("vocalsVolume"));
console.log("🔇 Mute Checkbox:", document.getElementById("muteVideoAudio"));
console.log("📩 Send Button:", document.getElementById("sendVolume"));

document.getElementById("sendVolume").addEventListener("click", function () {
    console.log("📩 Send button clicked!");
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM Loaded. Script is running.");

    // Get elements
    const sendButton = document.getElementById("sendVolume");
    const musicVolumeInput = document.getElementById("musicVolume");
    const vocalsVolumeInput = document.getElementById("vocalsVolume");
    const muteCheckbox = document.getElementById("muteVideoAudio");

    // Ensure all elements exist
    if (!sendButton) {
        console.error("❌ ERROR: 'Send Volume' button not found!");
        alert("Error: Send button is missing!");
        return;
    }
    if (!musicVolumeInput || !vocalsVolumeInput || !muteCheckbox) {
        console.error("❌ ERROR: One or more form elements are missing!");
        alert("Error: Missing form elements!");
        return;
    }

    // Button Click Event
    sendButton.addEventListener("click", async () => {
        console.log("📩 Send Volume button clicked!");

        // Get values
        const musicVolume = musicVolumeInput.value;
        const vocalsVolume = vocalsVolumeInput.value;
        const isMuted = muteCheckbox.checked;

        console.log(`🎵 Music Volume: ${musicVolume} dB`);
        console.log(`🎤 Vocals Volume: ${vocalsVolume} dB`);
        console.log(`🔇 Mute Track: ${isMuted ? "Yes" : "No"}`);

        if (!musicVolume || !vocalsVolume) {
            console.error("❌ ERROR: Volume values are missing!");
            alert("Please set both volume sliders before sending.");
            return;
        }

        const requestData = {
            musicDb: musicVolume,
            vocalsDb: vocalsVolume,
            isMuted: isMuted,
        };

        console.log("📡 Sending request to server:", requestData);

        try {
            const response = await fetch("/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            console.log("📡 Server response status:", response.status);

            const result = await response.text();
            if (response.ok) {
                console.log("✅ Email sent successfully!");
                alert("Email sent successfully!");
            } else {
                console.error("❌ Error sending email:", result);
                alert("Error sending email: " + result);
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            alert("Network error. Check console for details.");
        }
    });

    console.log("✅ Event listener added to Send Volume button.");
});
