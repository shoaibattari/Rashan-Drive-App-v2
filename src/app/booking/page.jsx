// CardSearch.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import members from "../database/members.json";
import purchases from "../database/purchases.json";
import Image from "next/image";
import Logo from "../../../public/omj-logo.png";

const CardSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleSearch = () => {
    const result = members.filter((member) => member.id === searchInput);

    if (result.length > 0) {
      setSearchResult(result);

      const userPurchases = purchases.filter(
        (purchase) => purchase.id === searchInput
      );

      if (userPurchases.length > 0) {
        setAlreadyPurchased(true);
        setPurchaseData(userPurchases);
        setUserNotFound(false);
      } else {
        setAlreadyPurchased(false);
        setPurchaseData(null);
        setUserNotFound(false);
        router.push(`booking/${searchInput}`);
      }
    } else {
      setSearchResult(null);
      setAlreadyPurchased(false);
      setPurchaseData(null);

      const foundInPurchases = purchases.find(
        (purchase) => purchase.id === searchInput
      );

      if (foundInPurchases) {
        setAlreadyPurchased(true);
        setUserNotFound(false);
      } else {
        setUserNotFound(true);
      }
    }
  };

  return (
    <main>
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

      <div className="md:text-3xl mt-6 p-4 md:p-8 items-center rounded-2xl justify-center bg-slate-500">
        <label className=" mb-4 ">
          <span className="text-white">Enter Card Number:</span>
          <input
            type="text"
            value={searchInput}
            placeholder="12345 first 5 number"
            className="p-2 border rounded-lg mx-0 md:mx-6"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
        <button
          onClick={handleSearch}
          disabled={searchInput.length < 1}
          className=" mx-2 px-4 md:mx-1 md:px-3 bg-blue-500 text-white p-2 rounded-lg"
        >
          Search
        </button>
        {userNotFound && (
          <p className=" text-red-300 mt-1">
            User Card Number: {searchInput} not found in the database.
          </p>
        )}
        {searchInput.length >= 5 && searchResult && (
          <div className="mt-4">
            {alreadyPurchased ? (
              <div>
                {searchResult.slice(0, 1).map((member, index) => (
                  <div key={index} className="mb-4">
                    <div>
                      {purchaseData.map((purchase, index) => (
                        <div
                          key={index}
                          className="p-2 border rounded-lg bg-gray-100 text-2xl"
                        >
                          <div>
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th className=" p-2">
                                    <p className="text-center">
                                      Already Purchased
                                    </p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Card Number
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Card}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Invoice
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Invoice}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Date
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Date}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Name
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Khundi
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Khundi}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 p-2">
                                    Area
                                  </td>
                                  <td className="border border-gray-300 p-2 text-gray-600">
                                    {purchase.Area}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-500">Loading Bill.......</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CardSearch;
