import Axios from 'axios';
import {store} from '../../store';
import {saveAllUsers} from '../../store/user.slice';

const baseUrl = 'https://reqres.in/api';

export const login = async payload => {
  const url = `${baseUrl}/login`;
  return await Axios.post(url, payload);
};

export const register = async payload => {
  const url = `${baseUrl}/register`;
  return await Axios.post(url, payload);
};

export const updateProfile = async (id, payload) => {
  const url = `${baseUrl}/users/${id}`;
  return await Axios.put(url, payload);
};

export const getAllUserz = async () => {
  //
  const url = `${baseUrl}/users?page=1&per_page=12`;
  await Axios.get(url)
    .then(data => {
      //   console.log('ALL USERS FROM SERVER::>>>', data?.data);
      if (data?.status === 200) {
        store.dispatch(saveAllUsers({allUsers: data?.data?.data}));
        // return data.data;
      }
    })
    .catch(error => {
      console.log('ALL USERS FROM SERVER-ERROR:>>>>', error?.response?.data);
      // return error.response.data;
    });
};
