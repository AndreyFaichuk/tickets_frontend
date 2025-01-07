import { RegisteredFormValues } from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { ApiResponse } from '../types';
import { securityAxios } from './securityAxios';

const BASE_URL = 'http://localhost:3000/users';

export class UserApi {
  static async getCurrentUser(): ApiResponse<RegisteredFormValues> {
    const response = await securityAxios(`${BASE_URL}/me`);
    return response.data;
  }
}
