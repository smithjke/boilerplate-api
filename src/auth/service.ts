import { Auth } from '@smithjke/boilerplate-schema';
import { useSessionService } from '~/session';

export class Service implements Auth.Service {
  private sessionService = useSessionService();

  async login(data: Auth.Login): Promise<Auth.Result> {
    throw new Error('Not Implemented');
  }

  async refresh(data: Auth.Refresh): Promise<Auth.Result> {
    const sessions = await this.sessionService.findAll({
      filter: {
        refreshToken: data.refreshToken,
      },
    });
    if (sessions?.total) {
      const session = sessions.list[0];
      const accessToken = String(Math.random());
      const refreshToken = String(Math.random());
      await this.sessionService.update({
        ...session,
        accessToken,
        refreshToken,
      }, { id: session.id });
      return {
        accessToken,
        refreshToken,
      };
    }
    throw new Error('Not Found');
  }
}
