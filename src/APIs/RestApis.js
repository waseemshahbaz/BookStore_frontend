import axios from "axios";

export async function GET_API(END_POINT) {
  const response = await axios.get(END_POINT);
  return response.data;
}
