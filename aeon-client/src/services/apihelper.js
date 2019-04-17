import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

const postUser = async (user) => {
  try {
    const resp = await api.post(`/users`, user);
    return resp.data;
    updateToken(resp.data.token);
  } catch(e) {
    console.error(e);
  };
};

const loginUser = async (user) => {
  try {
    const resp = await api.post(`/users/login`, user);
    updateToken(resp.data.token);
    return resp.data;
} catch(e) {
  console.error(e);
 };
};

const getAllActions = async () => {
  try {
    const resp = await api.get(`/actions`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

const createAction = async (newActionData) => {
  try{
    const { name, status } = newActionData
    const resp = await api.post('/actions', {
      action: {
        name,
        status
      }
    });
    console.log(resp.data);
    return resp.data
  } catch(e) {
    console.error(e);
  }
}



    export {
      postUser,
      loginUser,
      getAllActions,
      createAction,
  }
