import { BASE_URL } from '../constants';
import {
  RegisteredFormValues,
  RegisterNewUserValues,
} from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { LoginFormValues } from '../pages/LoginPage/components/LoginForm/LoginForm.shema';
import { ApiResponse } from '../types';
import { securityAxios } from './securityAxios';

const AUTH_URL = `${BASE_URL}/auth`;

export class AuthApi {
  static async registerUser(
    newUser: RegisterNewUserValues,
  ): ApiResponse<RegisteredFormValues> {
    const response = await securityAxios.post(
      `${AUTH_URL}/registration`,
      newUser,
    );

    return response.data;
  }

  static async loginUser(
    user: LoginFormValues,
  ): ApiResponse<RegisteredFormValues> {
    const response = await securityAxios.post(`${AUTH_URL}/login`, user);

    return response.data;
  }
}
