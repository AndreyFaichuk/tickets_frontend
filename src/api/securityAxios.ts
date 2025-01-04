import axios from 'axios';

export const securityAxios = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
