import React, { useState, useEffect } from 'react';
import { getAllDeserts } from '../../APIFunctions/Deserts';

export default function DesertPage() {
  const [deserts, setDeserts] = useState([]);
  async function getDesertsFromDB() {
    const desertsFromDB = await getAllDeserts();
    if (!desertsFromDB.error) {
      setDeserts(desertsFromDB.responseData);
    }
  }

  useEffect(() => {
    getDesertsFromDB();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Desert Page!!
      </h1>

      {deserts.length === 0 ? (
        <p className="mt-10 text-lg text-gray-500 dark:text-gray-400 text-center">
          No deserts yet!
        </p>
      ) : (
        <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Desert Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {deserts.map((desert) => {
                return (
                  <tr
                    key={desert._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {desert.title}
                    </th>
                    <td className="px-6 py-4">{desert.description}</td>
                    <td className="px-6 py-4">{desert.rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
