import React, { useEffect, useState } from 'react';
import { getAllAnimals, createAnimal } from '../../APIFunctions/Animals';

export default function AnimalPage(props) {
  const [animals, setAnimals] = useState([]);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [lifespan, setLifespan] = useState();

  async function getAnimalsFromDB() {
    const animalsFromDB = await getAllAnimals();
    if (!animalsFromDB.error) {
      setAnimals(animalsFromDB.responseData);
    }
  }

  useEffect(() => {
    getAnimalsFromDB();
  }, []);

  const INPUT_CLASS = 'indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-white';
  return (
    <div className='m-10'>
      <h1 class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Animal Admin Page!!
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-full sm:grid-cols-6">
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-300'>
            Animal Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="For example, Dog"
              value={name}
              onChange={e => setName(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="description" className='block text-sm font-medium leading-6 text-gray-300'>
            Description
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="lifespan" className='block text-sm font-medium leading-6 text-gray-300'>
            Lifespan
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lifespan"
              id="lifespan"
              value={lifespan}
              onChange={e => setLifespan(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => createAnimal({
              name,
              description,
              lifespan,
            }, props.user.token)}
          >
            Save
          </button>
        </div>
      </div>

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
              <th scope="col" className="px-6 py-3">
                Lifespan
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
                  <td className="px-6 py-4">
                    {animal.lifespan}
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
