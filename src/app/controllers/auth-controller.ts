import { useAuthService } from '~/app';

export class AuthController {
  private authService = useAuthService();

  async login(): Promise<object> {
    return null;
  }
}
