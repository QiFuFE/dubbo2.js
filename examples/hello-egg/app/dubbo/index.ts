import {Context, Dubbo, setting} from 'dubbo2.js';
import {EggApplication} from 'egg';
import service from './service';

declare module 'egg' {
  export interface EggApplication {
    dubbo: Dubbo<typeof service>;
  }
}

export default (app: EggApplication) => {
  const dubboSetting = setting
    .match(
      [
        'com.alibaba.dubbo.demo.DemoProvider',
        'com.alibaba.dubbo.demo.ErrorProvider',
      ],
      {
        version: '1.0.0',
      },
    )
    .match('com.alibaba.dubbo.demo.BasicTypeProvider', {version: '2.0.0'});

  const dubbo = new Dubbo<typeof service>({
    application: {name: 'node-egg-bff'},
    register: 'localhost:2181',
    service,
    dubboSetting,
  });

  // extends middleware
  dubbo.use(async (ctx: Context, next: any) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    app.coreLogger.info(
      `${ctx.dubboInterface} was invoked, cost-time ${end - start}`,
    );
  });

  app.dubbo = dubbo;
};
