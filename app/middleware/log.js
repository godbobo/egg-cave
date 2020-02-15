'use strict';

module.exports = () => {
  return async function log(ctx, next) {
    // 记录请求参数
    ctx.logger.info('参数：' + JSON.stringify(ctx.request.body || ctx.request.query));

    await next();

    // 记录响应参数
    ctx.logger.info('结果：' + JSON.stringify(ctx.response.body));
  };
};

