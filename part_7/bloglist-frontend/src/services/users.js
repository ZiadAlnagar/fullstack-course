import axios from 'axios';
import { uri } from '../utils/helpers';

const baseUrl = '/api/users';

const index = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const show = async (id) => {
  const response = await axios.get(uri(baseUrl, id));
  return response.data;
};

export default {
  index,
  show,
};
