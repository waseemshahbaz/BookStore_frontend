import axios from 'axios';
import { BASE_URL } from '../COMMON/CONSTANTS';

export async function GET_API(END_POINT, params) {
  const response = await axios.get(BASE_URL + END_POINT, params);
  const data = await response.data;
  return data;
}

export async function DELETE_API(END_POINT) {
  const response = await axios.delete(BASE_URL + END_POINT);
  return response;
}

export async function PUT_API(END_POINT, data) {
  const response = await axios.put(BASE_URL + END_POINT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('response for post is: ', response);
  return response;
}

export async function POST_API(END_POINT, data) {
  const response = await axios.post(BASE_URL + END_POINT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('response for post is: ', response);
  return response;
}
