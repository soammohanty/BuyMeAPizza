import { useState, useEffect } from "react";
import abi from "./contractJSON/Pizza.json";
import { ethers } from "ethers";
import Memos from "./components/Memos";
import Buy from "./components/Buy";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x698B0ef766ddf85D13D54d4b5C8d3eaE9Ca4a176";
      const contractABI = abi.abi;

      //MetaMask part
      //1: In order do transaction in sepolia testnet
      //2: Metamask consist of infura api which actually help in connecting to blockchain

      try {
        if (!window.ethereum) {
          throw new Error("Metamask not detected. Please install Metamask.");
        }

        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        //When account changed in metamask, browser will refresh
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum); //Read the BC
        const signer = provider.getSigner(); //Write in BC

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);

        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }
    };
    template();
  }, []);

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-8 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Never Ending Love For Pizza
            </h1>
            <p class="mb-4 leading-relaxed">
              Pizza is the ultimate comfort food, and I could really use some
              comfort right now. Would you be willing to treat me?
            </p>
            <p class="mb-4 leading-relaxed font-bold">
              Connected Account - {account}
            </p>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000"
            />
          </div>
        </div>
      </section>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
