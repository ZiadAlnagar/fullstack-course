/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/persons';

const index = () =>
  axios.get(baseUrl).then((res) => res.data);

const create = (obj) => axios.post(baseUrl, obj).then((res) => res.data);

const update = (id, obj) =>
  axios.put(`${baseUrl}/${id}`, obj).then((res) => res.data);

const destroy = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

export default {
  index,
  create,
  update,
  destroy,
};
