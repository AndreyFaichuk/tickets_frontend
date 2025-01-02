import {
  RegisteredFormValues,
  RegisterNewUserValues,
} from '../pages/AuthPage/components/RegistrationForm/RegistrationForm.schema';
import { ApiResponse } from '../types';

const BASE_URL = 'http://localhost:3000/auth';

export class AuthApi {
  static async registerUser(
    newUser: RegisterNewUserValues,
  ): ApiResponse<RegisteredFormValues> {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const todo: RegisteredFormValues = await response.json();
    return todo;
  }
}
