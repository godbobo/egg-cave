'use strict';

module.exports = {

  /**
   * 检查token是否有效
   * @param {String} token 授权token
   */
  checkToken(token) {
    if (token) {
      const jwt = require('jsonwebtoken');
      jwt.verify(token, this.app.config.token.secret);
      return true;
    }
    return false;
  },

  /**
   * 生成token
   * @param {Object} payload token存储信息
   */
  signToken(payload) {
    const jwt = require('jsonwebtoken');
    return jwt.sign(payload, this.app.config.token.secret, this.app.config.token.options);
  },

  /**
   * 返回错误
   * @param {String} msg 错误信息
   */
  returnError(msg) {
    return {
      status: 'error',
      message: msg,
    };
  },

};
