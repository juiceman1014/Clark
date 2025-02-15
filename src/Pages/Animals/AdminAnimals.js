import React, { useEffect, useState } from 'react';
import { getAllAnimals, createAnimal, editAnimal, deleteAnimal } from '../../APIFunctions/Animals';

export default function AnimalPage(props) {
  const [animals, setAnimals] = useState([]);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [lifespan, setLifespan] = useState();
  const [editingAnimalId, setEditingAnimalId] = useState(null);
  const [editedAnimal, setEditedAnimal] = useState({name: '', description: '', lifespan: ''});

  async function getAnimalsFromDB() {
    const animalsFromDB = await getAllAnimals();
    if (!animalsFromDB.error) {
      setAnimals(animalsFromDB.responseData);
    }
  }

  async function handleEdit(animalId){
    await editAnimal({ _id: animalId, ...editedAnimal }, props.user.token);
    setEditingAnimalId(null);
    getAnimalsFromDB();
  }

  async function handleDelete(animalId){
    await deleteAnimal(animalId, props.user.token);
    getAnimalsFromDB();
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
            {animals.map((animal) => (
              <tr key={animal._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                {editingAnimalId === animal._id ? (
                  // Editing display
                  <>
                    <td className='px-6 py-4'>
                      <input
                        type='text'
                        value={editedAnimal.name}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, name: e.target.value })}
                        className='w-full p-2 border rounded-md'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <input
                        type='text'
                        value={editedAnimal.description}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, description: e.target.value })}
                        className='w-full p-2 border rounded-md'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <input
                        type='text'
                        value={editedAnimal.lifespan}
                        onChange={(e) => setEditedAnimal({ ...editedAnimal, lifespan: e.target.value })}
                        className='w-full p-2 border rounded-md'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        className='bg-green-500 text-white px-3 py-1 rounded-md mr-2'
                        onClick={() => handleEdit(animal._id)}
                      >
                        Save
                      </button>
                      <button
                        className='bg-gray-500 text-white px-3 py-1 rounded-md'
                        onClick={() => setEditingAnimalId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // Nonediting display
                  <>
                    <td className='px-6 py-4'>{animal.name}</td>
                    <td className='px-6 py-4'>{animal.description}</td>
                    <td className='px-6 py-4'>{animal.lifespan}</td>
                    <td className='px-6 py-4'>
                      <button
                        className='bg-yellow-500 text-white px-3 py-1 rounded-md mr-2'
                        onClick={() => {
                          setEditingAnimalId(animal._id);
                          setEditedAnimal(animal);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded-md'
                        onClick={() => handleDelete(animal._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
