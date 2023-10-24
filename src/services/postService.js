import { api } from 'boot/axios';
const read = async () => {
  try {
    const { data } = await api.get('posts');
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

const create = async (value) => {
  try {
    const { data } = await api.post('posts', value);
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

const update = async (id, form) => {
  try {
    const url = `posts/${id}`;
    const { data } = await api.put(url, form);
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

const del = async (id) => {
  try {

    const { data } = await api.delete('posts/' + id);
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

const readById = async (id) => {
  try {
    const { data } = await api.get('posts/' + id);
    return data;
  } catch (e) {
    throw new Error(e);
  }
}


export { create, read, update, del, readById };
