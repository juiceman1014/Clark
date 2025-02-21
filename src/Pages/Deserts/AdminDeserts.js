import React, { useEffect, useState } from 'react';
import {
  getAllDeserts,
  createDesert,
  editDesert,
  deleteDesert,
} from '../../APIFunctions/Deserts';

export default function DesertPage(props) {
  const [deserts, setDeserts] = useState([]);
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [rating, setRating] = useState();
  const [editingDesertId, setEditingDesertId] = useState(null);
  const [editedDesert, setEditedDesert] = useState({
    title: '',
    description: '',
    rating: '',
  });

  async function getDesertsFromDB() {
    const desertsFromDB = await getAllDeserts();
    if (!desertsFromDB.error) {
      setDeserts(desertsFromDB.responseData);
    }
  }

  async function handleEdit(desertId) {
    await editDesert({ _id: desertId, ...editedDesert }, props.user.token);
    setEditingDesertId(null);
  }

  async function handleDelete(desertId) {
    await deleteDesert(desertId, props.user.token);
  }

  useEffect(() => {
    getDesertsFromDB();
  }, []);

  const INPUT_CLASS =
    'indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-white';
  return (
    <div className="m-10">
      <h1 class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Desert Admin Page!!
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-full sm:grid-cols-6">
        <div className="col-span-full sm:col-span-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-300"
          >
            Desert Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="For example, cookie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-300"
          >
            Description
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium leading-6 text-gray-300"
          >
            Rating
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rating"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              createDesert(
                {
                  title,
                  description,
                  rating,
                },
                props.user.token
              )
            }
          >
            Save
          </button>
        </div>
      </div>

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
                  Desert title
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
              {deserts.map((desert) => (
                <tr
                  key={desert._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {editingDesertId === desert._id ? (
                    // Editing display
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editedDesert.title}
                          onChange={(e) =>
                            setEditedDesert({
                              ...editedDesert,
                              title: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editedDesert.description}
                          onChange={(e) =>
                            setEditedDesert({
                              ...editedDesert,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editedDesert.rating}
                          onChange={(e) =>
                            setEditedDesert({
                              ...editedDesert,
                              rating: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                          onClick={() => handleEdit(desert._id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-3 py-1 rounded-md"
                          onClick={() => setEditingDesertId(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // Nonediting display
                    <>
                      <td className="px-6 py-4">{desert.title}</td>
                      <td className="px-6 py-4">{desert.description}</td>
                      <td className="px-6 py-4">{desert.rating}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                          onClick={() => {
                            setEditingDesertId(desert._id);
                            setEditedDesert(desert);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                          onClick={() => handleDelete(desert._id)}
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
      )}
    </div>
  );
}
