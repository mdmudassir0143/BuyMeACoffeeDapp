import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xf57b9681b3443e7770b14a2eb86d8a22b13edd8d";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          // const shortAccount = `${account.substr(0,5)}...${account.substr(38,4)}`;
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#FFFCE6", height: "100%" }}>
      {/* <p className="account">Connected Account - {account}</p> */}
      <div className="home">
        <div className="nav">
          <div className="coffee">
            <img src={chai} className="img-fluid" alt=".." width="50px" />
            <h4 className="faq">Buy me a Coffee</h4>
          </div>
        </div>
        <div className="tagline">
          <p>A supporter is worth a thousand followers.</p>
          <h4 className="tag">I'd really appreciate a coffee.</h4>
        </div>
        <h5 className="accounthead">Connected Account</h5>
        <div className="address">
          <button
            type="button"
            className="btn btnad btn-outline-light btn-lg download-btn"
          >
            {account}
          </button>
        </div>
      </div>
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      ></p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>


      <div className="footer">
        <a href="https://www.linkedin.com/in/mohammad-mudassir-b788a41ab/">Created By Mohammad Mudassir</a>
      </div>
    </div>
  );
}

export default App;
