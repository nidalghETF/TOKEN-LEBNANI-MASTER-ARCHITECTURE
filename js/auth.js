document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the elements based on the IDs in your new HTML
    const passwordInput = document.getElementById('passwordInput');
    const enterButton = document.getElementById('enterButton');

    // 2. Define the correct password/token here
    // Change "YOUR_TOKEN_HERE" to the actual password you want to use.
    const VALID_TOKEN = "TOKEN123"; 

    // 3. The function to check credentials and redirect
    function attemptLogin() {
        const userInput = passwordInput.value;

        if (userInput === VALID_TOKEN) {
            // SUCCESS: Redirect to the new home page
            // NOTE: Ensure home.html is in the same folder as this index.html
            window.location.href = "home.html"; 
        } else {
            // FAILURE: Shake effect or alert
            passwordInput.style.border = "2px solid red";
            passwordInput.classList.add('shake'); // Optional: adds animation if you have css for it
            setTimeout(() => {
                 passwordInput.style.border = "2px solid #d4af37"; // Reset to gold
            }, 1000);
            // alert("Incorrect Token"); // Uncomment this if you want a popup alert
        }
    }

    // 4. Event Listener: Click the image button
    if (enterButton) {
        enterButton.addEventListener('click', attemptLogin);
    }

    // 5. Event Listener: Press "Enter" on keyboard
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                attemptLogin();
            }
        });
    }
});
