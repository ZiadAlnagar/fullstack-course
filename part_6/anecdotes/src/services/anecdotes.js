import axios from 'axios';

const baseUrl = '/anecdotes';

const index = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const update = (id, obj) => {
  const response = axios.put(`${baseUrl}/${id}`, obj);
  return response.data;
};

const destroy = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  index,
  create,
  update,
  destroy,
};
