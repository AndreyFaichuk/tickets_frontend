import { BASE_BACKEND_URL } from '../constants';
import {
  RegisteredFormValues,
  RegisterNewUserValues,
} from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { AuthUserCheckResponse } from '../pages/AuthPage/hooks/useAuthUserCheck';
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

  static async checkAuth(): Promise<AuthUserCheckResponse> {
    const response = await securityAxios.get(`${AUTH_URL}/check`);

    return response.data;
  }

  static async logoutUser(): Promise<void> {
    const response = await securityAxios.post(`${AUTH_URL}/logout`);

    return response.data;
  }
}
