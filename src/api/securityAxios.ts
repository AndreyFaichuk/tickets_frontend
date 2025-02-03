import axios, { AxiosInstance } from 'axios';

type SecurityAxiosProps = {
  isFormData?: boolean;
};

const createAxiosInstance = ({
  isFormData = false,
}: SecurityAxiosProps = {}): AxiosInstance => {
  return axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  });
};

export const securityAxios = Object.assign(createAxiosInstance({}), {
  create: createAxiosInstance,
});
