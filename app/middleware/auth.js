'use strict';

module.exports = () => {

  return async function log(ctx, next) {

    const requestMethod = ctx.request.method.toLowerCase();

    // 跳过验证白名单请求
    if (ctx.request.path.indexOf(ctx.app.config.authWhiteList[requestMethod]) >= 0) {
      await next();
    } else if (ctx.helper.checkToken(ctx.request.headers.authorization)) {
      await next();
    } else {
      // 返回错误信息
      throw new Error('未传入Token或Token已过期');
    }

  };
};

