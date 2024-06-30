import { apiUser } from '@/const';
import axios from './config';

class AuthService {
  async register<T>(user: T) {
    const response = await axios.post(apiUser.register, user);
    return response.data;
  }

  async login<T>(user: T) {
    const response = await axios.post(apiUser.login, user);
    return response.data;
  }
}

export const authService = new AuthService();
