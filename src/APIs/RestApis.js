import axios from 'axios';

export async function GET_API(END_POINT, params) {
  const response = await axios.get(END_POINT, params);
  const data = await response.data;
  return data;
}

export async function DELETE_API(END_POINT) {
  const response = await axios.delete(END_POINT);
  return response;
}

export async function PUT_API(END_POINT, data) {
  const response = await axios.put(END_POINT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('response for post is: ', response);
  return response;
}

export async function POST_API(END_POINT, data) {
  const response = await axios.post(END_POINT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('response for post is: ', response);
  return response;
}
