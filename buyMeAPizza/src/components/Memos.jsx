import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state; //fetch contract from state

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
      console.log(memos); // log memos to the console
    };
    contract && memosMessage(); //Call memosMessage() once contract is present
  }, [contract]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container  mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Fellow Pizza'ites
            </h1>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Message
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Date
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    From
                  </th>
                </tr>
              </thead>

              <tbody>
                {memos.map((memo, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3">{memo.name}</td>
                      <td className="px-4 py-3">{memo.message}</td>
                      <td className="px-4 py-3">
                        {new Date(memo.timestamp * 1000).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{memo.from}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Memos;
