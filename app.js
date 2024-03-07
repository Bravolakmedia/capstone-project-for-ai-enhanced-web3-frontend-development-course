import React, { useState, useEffect } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [mintedAmount, setMintedAmount] = useState('');

    // Function to toggle between night and dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Function to set initial mode based on user's preference or system preference
    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
    }, []);

    // Function to handle token minting
    const handleMinting = (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Validate inputs
        if (!email || !tokenAmount) {
            alert('Please enter a valid email and token amount.');
            return;
        }

        // Perform token minting logic (you can replace this with your actual minting logic)
        const mintedAmount = mintTokens(email, tokenAmount);

        // Display the minted amount
        setMintedAmount(`Minted Amount: ${mintedAmount} tokens`);
    };

    // Function to simulate token minting logic (replace with your actual minting logic)
    const mintTokens = (email, amount) => {
        // Perform minting logic here
        // For now, just return the amount as a placeholder
        return amount;
    };

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <header>
                <h1>Welcome to our Token Minter dApp.</h1>
                <button id="toggleDarkModeButton" onClick={toggleDarkMode}>Toggle Dark Mode</button>
            </header>
            <main>
                {/* Mint Section */}
                <section id="mint">
                    <h2>Mint Your Tokens</h2>
                    <form onSubmit={handleMinting}>
                        {/* Input fields for email and token amount with enforced data types */}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="tokenAmount">Token Amount:</label>
                        <input type="number" id="tokenAmount" placeholder="Token amount" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} required />

                        {/* Mint button */}
                        <button type="submit">Mint</button>
                    </form>
                </section>
                {/* Display Minted Amount */}
                <div id="mintedAmount">{mintedAmount}</div>
            </main>
            <footer>
                <p>Contact us at <a href="mailto:hello@dProgrammingUniversity.com">hello@dProgrammingUniversity.com</a></p>
                <p>Olukosi I.B</p>
            </footer>
        </div>
    );
}

export default App;

