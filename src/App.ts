import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

interface CryptoPrice {
  coin: string;
  usd: number;
}

interface CryptoPricesData {
  cryptoPrices: CryptoPrice[];
}

const GET_CRYPTO_PRICES = gql`
  query {
    cryptoPrices {
      coin
      usd
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<CryptoPricesData>(GET_CRYPTO_PRICES);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [mintedAmount, setMintedAmount] = useState<string>('');
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const mintingLimit: number = 5;

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleMinting = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !tokenAmount) {
      alert('Please enter a valid email and token amount.');
      return;
    }

    if (walletHasMinted(email)) {
      alert('This wallet has already minted tokens.');
      return;
    }

    try {
      const mintedAmount = await mintTokens(email, tokenAmount);
      setMintedAmount(`Minted Amount: ${mintedAmount} tokens`);
      setTotalMinted(totalMinted + mintedAmount);
    } catch (error) {
      console.error('Token minting failed:', error.message);
    }
  };

  const mintTokens = (email: string, amount: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mintedAmount = parseInt(amount);

        if (totalMinted + mintedAmount > mintingLimit) {
          reject(new Error('Exceeded minting limit.'));
        } else {
          resolve(mintedAmount);
        }
      }, 1000);
    });
  };

  const walletHasMinted = (wallet: string): boolean => {
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
        <section id="home">
          <a href="#home">Home</a>
          <p>Welcome to our Token Minter dApp. Mint your tokens and enjoy the benefits!</p>
        </section>
        <section id="mint">
          <h2>Mint Your Tokens</h2>
          <form onSubmit={handleMinting}>
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
            <button type="submit">Mint</button>
          </form>
          <img src="/token minter.jpg" alt="Token Image" />
        </section>
        <section id="about">
          <a href="#about">About Us</a>
          <p>Learn more about our company and how we are revolutionizing the world of token minting.</p>
        </section>
        <section id="cryptoPrices">
          <h2>Crypto Prices</h2>
          {loading ? (
            <p>Loading crypto prices...</p>
          ) : error ? (
            <p>Error fetching crypto prices: {error.message}</p>
          ) : (
            <ul>
              {data?.cryptoPrices.map((crypto) => (
                <li key={crypto.coin}>
                  {crypto.coin.charAt(0).toUpperCase() + crypto.coin.slice(1)}: ${crypto.usd}
                </li>
              ))}
            </ul>
          )}
        </section>
        <div id="mintedAmount">{mintedAmount}</div>
        <div>Total Minted: {totalMinted} tokens</div>
      </main>
      <footer>
        <p>Contact us at{' '}<a href="mailto:hello@dProgrammingUniversity.com">hello@dProgrammingUniversity.com</a></p>
        <p>Olukosi I.B</p>
      </footer>
    </div>
  );
}

export default App;
