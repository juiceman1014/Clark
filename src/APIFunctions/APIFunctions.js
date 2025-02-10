import axios from 'axios';
import { ApiResponse } from './ApiResponses';

let ANIMAL_API_URL = 'http://localhost:8084/animal_api';

export async function getAllAnimals() {
  let status = new ApiResponse();
  await axios
    .get(ANIMAL_API_URL + '/Animal/getAnimals')
    .then(res => {
      status.responseData = res.data;
    })
    .catch(err => {
      status.responseData = err;
      status.error = true;
    });
  return status;
}
