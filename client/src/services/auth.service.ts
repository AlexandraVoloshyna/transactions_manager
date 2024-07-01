import { apiUser } from '@/const';
import axios from './config';
import { IResponse, User } from '@/types';

class AuthService {
  async register(user: User): Promise<IResponse<void> | undefined> {
    try {
      const response = await axios.post(apiUser.register, user);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async login(user: User): Promise<IResponse<void> | undefined> {
    try {
      const response = await axios.post(apiUser.login, user);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const authService = new AuthService();
