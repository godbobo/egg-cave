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
    aliyun: {
      accessKeyId: 'LTAI4FikXtX6ynNYgDdkvZZ4',
      accessKeySecret: 'TCYLCRyvq5voXALPCSQ9MIt6QzUzAz',
    },

  };

  const mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'cave',
      // 编码
      charset: 'utf8mb4',
      // 打印日志
      debug: true,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  const security = {
    domainWhiteList: [ '*' ],
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
    mysql,
    security,
    middleware: [ 'log' ],
  };
};
