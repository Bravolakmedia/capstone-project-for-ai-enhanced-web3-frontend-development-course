// app.js

// Function to toggle between night and dark mode
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode'); // Toggle dark-mode class on the body
};

// Event listener to toggle dark mode when a button is clicked
const darkModeButton = document.getElementById('toggleDarkModeButton');
if (darkModeButton) {
    darkModeButton.addEventListener('click', toggleDarkMode);
}

// Function to set initial mode based on user's preference or system preference
const setInitialMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-mode', prefersDarkMode);
};

// Function to handle token minting
const handleMinting = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const emailInput = document.getElementById('email');
    const tokenAmountInput = document.getElementById('tokenAmount');

    // Validate inputs
    if (!emailInput.checkValidity() || !tokenAmountInput.checkValidity()) {
        alert('Please enter a valid email and token amount.');
        return;
    }

    const email = emailInput.value;
    const tokenAmount = parseInt(tokenAmountInput.value);

    // Perform token minting logic (you can replace this with your actual minting logic)
    const mintedAmount = mintTokens(email, tokenAmount);

    // Display the minted amount
    displayMintedAmount(mintedAmount);
};

// Function to simulate token minting logic (replace with your actual minting logic)
const mintTokens = (email, amount) => {
    // Perform minting logic here
    // For now, just return the amount as a placeholder
    return amount;
};

// Function to display the minted amount
const displayMintedAmount = (amount) => {
    const mintedAmountElement = document.getElementById('mintedAmount');
    mintedAmountElement.textContent = `Minted Amount: ${amount} tokens`;
};

// Event listener for the minting form
const mintForm = document.getElementById('mintForm');
if (mintForm) {
    mintForm.addEventListener('submit', handleMinting);
}

// Run setInitialMode when the DOM is loaded
document.addEventListener('DOMContentLoaded', setInitialMode);

// Optional: Add error handling or other functionalities as needed
