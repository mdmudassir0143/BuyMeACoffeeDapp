import React from "react";
import { useState, useEffect } from "react";
const Memos = ({state}) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <>
    <p className="head">Supporters</p>
    
        <div
          className="container-fluid"
          style={{ width: "100%" }}
          
        >
          <table
            style={{
              marginBottom: "10px",
            }}
          >
            <thead>
                <th>Name</th>
                <th>TimeStamp</th>
                <th>Message</th>
                <th>Address</th>
            </thead>
            <tbody>
            {memos.map((memo) => {
      return (
              <tr key={Math.random()}>
                <td
                  style={{
                    backgroundColor: "#FCF7E0",
                    border: "2px solid #010100",
                    borderCollapse: "collapse",
                    padding: "10px",
                    width: "100px",
                  }}
                >
                  {memo.name}
                </td>
                
                <td
                  style={{
                    backgroundColor: "#FCF7E0",
                    border: "2px solid #010100",
                    borderCollapse: "collapse",
                    padding: "10px",
                    width: "200px",
                  }}
                >
                  {new Date(memo.timestamp * 1000).toLocaleString()}
                </td>
                
                <td
                  style={{
                    backgroundColor: "#FCF7E0",
                    border: "2px solid #010100",
                    borderCollapse: "collapse",
                    padding: "10px",
                    width: "300px",
                  }}
                >
                  {memo.message}
                </td>
                <td
                  style={{
                    backgroundColor: "#FCF7E0",
                    border: "2px solid #010100",
                    borderCollapse: "collapse",
                    padding: "10px",
                    width: "400px",
                  }}
                >
                  {memo.from}
                </td>
              </tr>
              )})}
            </tbody>
          </table>
        </div>
  </>
  );
};

export default Memos;
