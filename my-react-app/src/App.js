import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [mintedAmount, setMintedAmount] = useState('');
    const [totalMinted, setTotalMinted] = useState(0);
    const mintingLimit = 5; // Set the minting limit

    // Function to toggle between night and dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
        document.body.classList.toggle('dark-mode', darkMode); // Toggle the 'dark-mode' class on the body element
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

    const [cryptoPrices, setCryptoPrices] = useState(null);

  // Function to fetch crypto prices from CoinGecko API
const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,jupiter,saros,bonk&vs_currencies=usd');
      console.log('Crypto Prices Response:', response.data);
      setCryptoPrices(response.data);
    } catch (error) {
      console.error('Error fetching crypto prices:', error.message);
    }
  };
  

  // useEffect to fetch crypto prices when the component mounts
  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  const supportedCoins = ['bitcoin', 'ethereum', 'solana', 'jupiter', 'saros', 'bonk'];

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
            <header>
                <h1>Welcome to our Token Minter dApp.</h1>
                <button id="toggleDarkModeButton" onClick={toggleDarkMode}>
                    Toggle Dark Mode
                </button>
            </header>
            <main>
                {/* Home Section */}
                <section id="home">
                    <a href="#home">Home</a>
                    <p>Welcome to our Token Minter dApp. Mint your tokens and enjoy the benefits!</p>
                </section>

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
                    <img src="/token minter.jpg" alt="Token Image" />
                </section>

                {/* About Section */}
                <section id="about">
                <a href="#about">About Us</a>
                    <p>
                        Learn more about our company and how we are revolutionizing the world of token minting.
                    </p>
                </section>

                {/* Display Minted Amount */}
                <div id="mintedAmount">{mintedAmount}</div>
{/* Crypto Prices Section */}
<section id="cryptoPrices">
        <h2>Crypto Prices</h2>
        {cryptoPrices && (
          <ul>
            {supportedCoins.map((coin) => (
              <li key={coin}>
                {coin.charAt(0).toUpperCase() + coin.slice(1)}: ${cryptoPrices[coin]?.usd}
              </li>
            ))}
          </ul>
        )}
      </section>

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
