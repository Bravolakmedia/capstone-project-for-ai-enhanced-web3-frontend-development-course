"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("@apollo/client");
const GET_CRYPTO_PRICES = (0, client_1.gql) `
  query {
    cryptoPrices {
      coin
      usd
    }
  }
`;
function App() {
    const { loading, error, data } = (0, client_1.useQuery)(GET_CRYPTO_PRICES);
    const [darkMode, setDarkMode] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)('');
    const [tokenAmount, setTokenAmount] = (0, react_1.useState)('');
    const [mintedAmount, setMintedAmount] = (0, react_1.useState)('');
    const [totalMinted, setTotalMinted] = (0, react_1.useState)(0);
    const mintingLimit = 5;
    (0, react_1.useEffect)(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);
    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };
    const handleMinting = (event) => __awaiter(this, void 0, void 0, function* () {
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
            const mintedAmount = yield mintTokens(email, tokenAmount);
            setMintedAmount(`Minted Amount: ${mintedAmount} tokens`);
            setTotalMinted(totalMinted + mintedAmount);
        }
        catch (error) {
            console.error('Token minting failed:', error.message);
        }
    });
    const mintTokens = (email, amount) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mintedAmount = parseInt(amount);
                if (totalMinted + mintedAmount > mintingLimit) {
                    reject(new Error('Exceeded minting limit.'));
                }
                else {
                    resolve(mintedAmount);
                }
            }, 1000);
        });
    };
    const walletHasMinted = (wallet) => {
        return wallet === localStorage.getItem('lastMintedWallet');
    };
    return className = { darkMode, 'dark-mode': '' } >
        Welcome;
    to;
    our;
    Token;
    Minter;
    dApp. < /h1>
        < button;
    id = "toggleDarkModeButton";
    onClick = { toggleDarkMode } >
        Toggle;
    Dark;
    Mode
        < /button>
        < /header>
        < main >
        id;
    "home" >
        href;
    "#home" > Home < /a>
        < p > Welcome;
    to;
    our;
    Token;
    Minter;
    dApp.Mint;
    your;
    tokens;
    and;
    enjoy;
    the;
    benefits < /p>
        < /section>
        < section;
    id = "mint" >
        Mint;
    Your;
    Tokens < /h2>
        < form;
    onSubmit = { handleMinting } >
        htmlFor;
    "email" > Email;
    /label>
        < input;
    type = "email";
    id = "email";
    placeholder = "Enter your email";
    value = { email };
    onChange = {}(e);
    setEmail(e.target.value);
}
required
    /  >
    htmlFor;
"tokenAmount" > Token;
Amount: /label>
    < input;
type = "number";
id = "tokenAmount";
placeholder = "Token amount";
value = { tokenAmount };
onChange = {}(e);
setTokenAmount(e.target.value);
required
    /  >
    type;
"submit" > Mint < /button>
    < /form>
    < img;
src = "/token minter.jpg";
alt = "Token Image" /  >
    /section>
    < section;
id = "about" >
    href;
"#about" > About;
Us < /a>
    < p > Learn;
more;
about;
our;
company;
and;
how;
we;
are;
revolutionizing;
the;
world;
of;
token;
minting. < /p>
    < /section>
    < section;
id = "cryptoPrices" >
    Crypto;
Prices < /h2>;
{
    loading ? Loading : ;
    crypto;
    prices;
    /p>;
    error ? Error : ;
    fetching;
    crypto;
    prices: {
        error.message;
    }
    /p>;
    ({ data, cryptoPrices, : .map((crypto) => key = { crypto, : .coin } >
            { crypto, : .coin.charAt(0).toUpperCase() + crypto.coin.slice(1) }, $, { crypto, : .usd }
            < /li>) }
        < /ul>);
}
/section>
    < div;
id = "mintedAmount" > { mintedAmount } < /div>
    < div > Total;
Minted: {
    totalMinted;
}
tokens < /div>
    < /main>
    < footer >
    Contact;
us;
at;
{
    ' ';
}
href;
"mailto:hello@dProgrammingUniversity.com" > hello;
/a></p >
    Olukosi;
I.B < /p>
    < /footer>
    < /div>;
;
exports.default = App;
