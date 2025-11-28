import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as Useragent from 'useragent';
import { GetNowDate } from 'src/common/utils';

export const ClientInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const agent = Useragent.parse(request.headers['user-agent']);
  const os = agent.os.toJSON().family;
  const browser = agent.toAgent();

  const clientInfo = {
    ipaddr: request.ip,
    browser: browser,
    os: os,
    loginLocation: '',
    userName: request.user?.user?.userName,
  };

  return clientInfo;
});

export type ClientInfoDto = {
  ipaddr: string;
  browser: string;
  os: string;
  loginLocation: string;
  userName?: string;
};
