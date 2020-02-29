/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580326927122_3146';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // 管理员账号密码
    admin: [
      {
        username: 'bobo',
        password: '123',
      },
    ],
  };

  const mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '121.41.36.181',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'bobozuihao',
      // 数据库名
      database: 'cave',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 调试模式
    debug: false,
  };

  const cluster = {
    listen: {
      port: 8010,
      hostname: '0.0.0.0',
    },
  };

  const security = {
    domainWhiteList: [ 'http://121.41.36.181/' ],
    csrf: {
      enable: false,
    },
  };

  const cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
    mysql,
    security,
    cluster,
    cors,
    middleware: [ 'auth', 'log', 'result' ],
  };
};
