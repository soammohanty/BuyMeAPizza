import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyPizza = async (event) => {
    event.preventDefault(); //It make sure page doesnt reload once form is submited
    const { contract } = state; //Destructuring
    const name = document.getElementById("name").value;
    const message = document.querySelector("#message").value;

    const amount = { value: ethers.utils.parseEther("0.00001") }; //Key must be "value". Unit is in Wei

    const transaction = await contract.buyPizza(name, message, amount);
    await transaction.wait(); //Wait for transaction

    alert("Congrats " + name + " your transaction is Successful");
    window.location.reload(); //Reload after transaction is successful, so that memos are shown
  };

  return (
    <form onSubmit={buyPizza}>
      <section className="text-gray-600 body-font relative container px-5 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto flex flex-wrap -m-2">
          <div className="p-2 w-1/2 relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              id="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full relative">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <input
              id="message"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <button className="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Pay 0.00001 ETH
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};
export default Buy;
