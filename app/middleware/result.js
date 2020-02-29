'use strict';

module.exports = () => {
  return async function log(ctx, next) {

    await next();

    // 暂时先不判断 没有这方面需要 判断body内容是否已经是转换后的信息
    ctx.response.body = {
      status: 'ok',
      message: '操作成功',
      returnValue: ctx.response.body,
    };
    // ctx.logger.info('结果：' + JSON.stringify(ctx.response.body));
  };
};

