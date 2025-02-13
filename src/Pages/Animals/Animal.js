import React, { useState, useEffect } from 'react';
import { getAllAnimals } from '../../APIFunctions/Animals';

export default function AnimalPage() {
  const [animals, setAnimals] = useState([]);
  async function getAnimalsFromDB() {
    const animalsFromDB = await getAllAnimals();
    if (!animalsFromDB.error) {
      setAnimals(animalsFromDB.responseData);
    }
  }

  useEffect(() => {
    getAnimalsFromDB();
  }, []);

  return (
    <div className='m-10'>
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Animal Page!!
      </h1>


      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Animal name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => {
              return (
                <tr key={animal._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {animal.name}
                  </th>
                  <td className="px-6 py-4">
                    {animal.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
