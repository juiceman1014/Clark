import axios from 'axios';
import { ApiResponse } from './ApiResponses';

let DESERT_API_URL = 'http://localhost:8084/desert_api';

export async function getAllDeserts() {
  let status = new ApiResponse();
  await axios
    .get(DESERT_API_URL + '/Desert/getDeserts')
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.responseData = err;
      status.error = true;
    });
  return status;
}

export async function createDesert(newDesert, token) {
  let status = new ApiResponse();
  await axios
    .post(DESERT_API_URL + '/Desert/createDesert', newDesert, {
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

export async function editDesert(updatedDesert, token){
  let status = new ApiResponse();
  await axios
    .post(DESERT_API_URL + '/Desert/editDesert', updatedDesert, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
      status.responseData = err;
    });
  return status;
}

export async function deleteDesert(desertId, token){
  let status = new ApiResponse();
  await axios
    .post(DESERT_API_URL + '/Desert/deleteDesert', { _id: desertId}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
      status.responseData = err;
    });
  return status;
}

