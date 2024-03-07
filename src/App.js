import React, { useState } from 'react';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [mintedAmount, setMintedAmount] = useState('');
    const [totalMinted, setTotalMinted] = useState(0);
    const mintingLimit = 5; // Set the minting limit

    // Function to toggle between night and dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Function to handle token minting
    const handleMinting = async (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Validate inputs
        if (!email || !tokenAmount) {
            alert('Please enter a valid email and token amount.');
            return;
        }

        // Validate wallet to ensure it hasn't minted before
        if (walletHasMinted(email)) {
            alert('This wallet has already minted tokens.');
            return;
        }

        // Simulate asynchronous token minting with a promise
        try {
            const mintedAmount = await mintTokens(email, tokenAmount);
            setMintedAmount(`Minted Amount: ${mintedAmount} tokens`);
            setTotalMinted(totalMinted + mintedAmount);
        } catch (error) {
            console.error('Token minting failed:', error.message);
        }
    };

    // Function to simulate asynchronous token minting logic (replace with your actual minting logic)
    const mintTokens = (email, amount) => {
        return new Promise((resolve, reject) => {
            // Simulate minting process
            setTimeout(() => {
                const mintedAmount = parseInt(amount);
                // Check minting limit
                if (totalMinted + mintedAmount > mintingLimit) {
                    reject(new Error('Exceeded minting limit.'));
                } else {
                    resolve(mintedAmount);
                }
            }, 1000); // Simulate a delay, replace with actual minting logic
        });
    };

    // Function to check if the wallet has already minted
    const walletHasMinted = (wallet) => {
        // Simulate checking a database or storage for wallet history
        // For now, just check if the wallet is the same as the last minted wallet
        return wallet === localStorage.getItem('lastMintedWallet');
    };

    return (
        <div className={darkMode ? 'dark-mode' : ''}>
            <header>
                <h1>Welcome to our Token Minter dApp.</h1>
                <button id="toggleDarkModeButton" onClick={toggleDarkMode}>
                    Toggle Dark Mode
                </button>
            </header>
            <main>
                {/* Mint Section */}
                <section id="mint">
                    <h2>Mint Your Tokens</h2>
                    <form onSubmit={handleMinting}>
                        {/* Input fields for email and token amount with enforced data types */}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="tokenAmount">Token Amount:</label>
                        <input
                            type="number"
                            id="tokenAmount"
                            placeholder="Token amount"
                            value={tokenAmount}
                            onChange={(e) => setTokenAmount(e.target.value)}
                            required
                        />

                        {/* Mint button */}
                        <button type="submit">Mint</button>
                    </form>
                </section>
                {/* Display Minted Amount */}
                <div id="mintedAmount">{mintedAmount}</div>
                {/* Display Total Minted */}
                <div>Total Minted: {totalMinted} tokens</div>
            </main>
            <footer>
                <p>
                    Contact us at{' '}
                    <a href="mailto:hello@dProgrammingUniversity.com">hello@dProgrammingUniversity.com</a>
                </p>
                <p>Olukosi I.B</p>
            </footer>
        </div>
    );
}

export default App;
