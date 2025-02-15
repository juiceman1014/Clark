import axios from 'axios';
import { ApiResponse } from './ApiResponses';

let ANIMAL_API_URL = 'http://localhost:8084/animal_api';

export async function getAllAnimals() {
  let status = new ApiResponse();
  await axios
    .get(ANIMAL_API_URL + '/Animal/getAnimals')
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.responseData = err;
      status.error = true;
    });
  return status;
}

export async function createAnimal(newAnimal, token) {
  let status = new ApiResponse();
  await axios
    .post(ANIMAL_API_URL + '/Animal/createAnimal', newAnimal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      status.error = true;
      status.responseData = err;
    });
  return status;
}
