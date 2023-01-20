import axios from 'axios';
import { uri } from '../utils/helpers';

const baseUrl = '/api/blogs/';

const create = async (id, obj) => {
  const response = await axios.post(uri(baseUrl, id, 'comments'), obj);
  return response.data;
};

export default { create };
