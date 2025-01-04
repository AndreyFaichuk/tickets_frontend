import {
  RegisteredFormValues,
  RegisterNewUserValues,
} from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { ApiResponse } from '../types';
import { securityAxios } from './securityAxios';

const BASE_URL = 'http://localhost:3000/auth';

export class AuthApi {
  static async registerUser(
    newUser: RegisterNewUserValues,
  ): ApiResponse<RegisteredFormValues> {
    const response = await securityAxios.post(
      `${BASE_URL}/registration`,
      newUser,
    );

    return response.data;
  }
}
