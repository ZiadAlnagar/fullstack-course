import axios from 'axios';
import { uri } from '../utils/helpers';

const baseUrl = '/api/blogs';

let token = null;

const authConfig = () => ({ headers: { Authorization: token } });

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getToken = () => token;

const removeToken = () => {
  token = null;
};
const index = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const show = async (id) => {
  const response = await axios.get(uri(baseUrl, id));
  return response.data;
};

const create = async (obj) => {
  obj.likes = 0;
  const response = await axios.post(baseUrl, obj, authConfig());
  return response.data;
};

const update = async (id, obj) => {
  const response = await axios.put(uri(baseUrl, id), obj, authConfig());
  return response.data;
};

const destroy = async (id) => {
  const response = await axios.delete(uri(baseUrl, id), authConfig());
  return response.data;
};

export default {
  index,
  show,
  create,
  update,
  destroy,
  setToken,
  getToken,
  removeToken,
};
