import { BASE_BACKEND_URL } from '../constants';
import {
  RegisteredFormValues,
  RegisterNewUserValues,
} from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { LoginFormValues } from '../pages/LoginPage/components/LoginForm/LoginForm.shema';
import { securityAxios } from './securityAxios';

const AUTH_URL = `${BASE_BACKEND_URL}/auth`;

export class AuthApi {
  static async registerUser(
    newUser: RegisterNewUserValues,
  ): Promise<RegisteredFormValues> {
    const response = await securityAxios.post(
      `${AUTH_URL}/registration`,
      newUser,
    );

    return response.data;
  }

  static async loginUser(user: LoginFormValues): Promise<RegisteredFormValues> {
    const response = await securityAxios.post(`${AUTH_URL}/login`, user);

    return response.data;
  }
}
