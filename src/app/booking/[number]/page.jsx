"use client";
import { useState, useEffect } from "react";
import { ReactToPrint } from "react-to-print";
import membersData from "../../database/members.json";
import productsData from "../../database/products.json";
import Logo from "../../../../public/omj-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }) {
  const [user, setUser] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [componentRef, setComponentRef] = useState(null);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const saveDataToApi = async () => {
    const invoice = `20242${user.Card.slice(9)}`;
    const date = getCurrentDate();
    const name = user.Name;
    const id = user.id;
    const card = user.Card;
    const khundi = user.Khundi;
    const area = selectedArea;
    const packageType = "Mini"; // You may need to adjust this based on your requirements

    const requestBody = {
      Invoice: invoice,
      Date: date,
      Name: name,
      Id: id,
      Card: card,
      Khundi: khundi,
      Area: area,
      Package: packageType,
    };

    try {
      const response = await fetch("http://localhost:3000/api/purchaser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error during API request", error);
    }
  };

  useEffect(() => {
    const foundUser = membersData.find(
      (member) => member.id === params.number
    );
    setUser(foundUser);
  }, [params.number]);

  // useEffect(() => {
  //   if (user && selectedArea) {
  //     // Save data to API when both user and selectedArea are available
  //     saveDataToApi();
  //   }
  // }, [user, selectedArea]);

  return (
    <>
      <div ref={(el) => setComponentRef(el)}>
        <div className="container">
          <header className="flex">
            <section>
              <Image src={Logo} width={175} height={50} alt="logo" />
            </section>
            <section className="text-center  space-y-6 mt-3 mb-3">
              <h1 className="text-2xl font-extrabold md:text-4xl">
                THE OKHAI MEMON JAMAT
              </h1>
              <h1 className=" text-1xl md:text-3xl font-extrabold">
                RAMZAN DISCOUNT RATION SCHEME
              </h1>
            </section>
          </header>
          <div className="flex justify-between">
            <div>
              <ReactToPrint
                trigger={() => (
                  <button className="text-2xl font-bold bg-white text-blue-500 py-2 px-4 rounded-md">
                    Print Bill
                  </button>
                )}
                content={() => componentRef}
                documentTitle="OMJ RASHAN BILL"
                pageStyle="print"
              />
            </div>
            <span>
              <Link href={"/booking"}>
                <button className="text-2xl font-bold bg-white text-blue-500 py-2 px-4 rounded-md">
                  New Order
                </button>
              </Link>
            </span>
          </div>
          <div>
            <div>
              {user ? (
                <div className="bg-green-50 mt-2 font-bold text-lg border border-x-2 border-y-2 p-2  rounded-md shadow-md grid grid-cols-3 ">
                  <p className="text-lg font-semibold">
                    Invoice: {`${getCurrentDate()}${user.Card.substring(0, 5)}`}
                  </p>
                  <p>Date: {getCurrentDate()}</p>
                  <p>Khundi: {user.Khundi}</p>
                  <p className="text-1xl">Name: {user.Name}</p>
                  <p className="text-1xl">
                    Card Number:{<br />} {user.Card}
                  </p>
                  <div className=" flex content-center items-center">
                    <label
                      htmlFor="areaDropdown"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Area:
                    </label>
                    <select
                      id="areaDropdown"
                      value={selectedArea}
                      onChange={handleAreaChange}
                      className="mt-1 border rounded-md"
                    >
                      <option value="">Select Area</option>
                      <option value="Hussainabad">Hussainabad</option>
                      <option value="Memon Society">Memon Society</option>
                      <option value="Mosamiyat">Mosamiyat</option>
                      <option value="Highway">Highway</option>
                    </select>
                  </div>
                  {/* <p>Package: Mini</p> */}
                </div>
              ) : (
                <p className="text-gray-500">-</p>
              )}
            </div>
            <div>
              <ul>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="border bg-gray-700 text-gray-100">
                          S.No
                        </th>
                        <th className="border bg-gray-700 text-gray-100">
                          Item
                        </th>
                        <th className="border bg-gray-700 text-gray-100">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData.map((product) => (
                        <tr
                          key={product["S.No"]}
                          className="text-sm text-center bg-green-50 "
                        >
                          <td className="border">{product["S.No"]}</td>
                          <td className="border">
                            <strong>{product["Item"]}</strong>
                          </td>
                          <td className="border">{product["Qty"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div>
                    <div className="flex md:text-2xl  border-3 border font-semibold justify-around bg-green-300">
                      <p>MARKET VALUE:</p>
                      <p>RS- 5000</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex  md:text-2xl  border-3 border font-semibold justify-around bg-green-300">
                      <p>DISCOUNT VALUE:</p>
                      <p>RS- 2500</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex  md:text-2xl  border-3 border font-semibold justify-around bg-green-300">
                      <p>PACKAGE VALUE:</p>
                      <p>RS- 2500</p>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div className="bg-gray-500 my-2">
              <p className="text-1xl uppercase italic text-gray-200 px-2 font-bold">
                app create by: Shoaib Abdul Sattar Khosa{" "}
              </p>
              <p className="text-1xl uppercase italic text-gray-200 px-2 font-semibold">
                MEMON DIGITAL TECH CLUB 0323-2579204
              </p>
            </div>

            <div className=" px-4 rounded-md shadow-md bg-gray-200 my-4 border border-black ">
              <p className="text-lg font-semibold underline underline-offset-4 text-center">
                Collection Copy
              </p>
              {user ? (
                <div className="grid grid-cols-2">
                <p className="text-1xl">Date: {getCurrentDate()}</p>
                <p className="text-1xl">Name: {user.Name}</p>
                <p className="text-1xl">Khundi: {user.Khundi}</p>
                <p className="text-1xl">
                  Invoice Number:{" "}
                  {`${getCurrentDate()}${user.Card.substring(0, 5)}`}
                </p>
              </div>
              ) : (
                <p className="text-gray-500">No user found</p>
              )}
              <p className="text-1xl">Area: {selectedArea || "-"}</p>

            </div>
            <div className=" px-4 rounded-md shadow-md bg-green-100 border border-black">
              <p className="text-lg font-semibold underline underline-offset-4 text-center border   ">
                Cashier Copy
              </p>
              {user ? (
                <div className="grid grid-cols-2">
                  <p className="text-1xl">Date: {getCurrentDate()}</p>
                  <p className="text-1xl">Name: {user.Name}</p>
                  <p className="text-1xl">Khundi: {user.Khundi}</p>
                  <p className="text-1xl">
                    Invoice Number:{" "}
                    {`${getCurrentDate()}${user.Card.substring(0, 5)}`}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No user found</p>
              )}
              <p className="text-1xl">Area: {selectedArea || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
