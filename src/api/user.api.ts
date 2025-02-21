import { BASE_URL } from '../constants';
import { RegisteredFormValues } from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { securityAxios } from './securityAxios';

const USER_URL = `${BASE_URL}/users`;

export class UserApi {
  static async getCurrentUser(): Promise<RegisteredFormValues> {
    const response = await securityAxios(`${USER_URL}/me`);
    return response.data;
  }
}
