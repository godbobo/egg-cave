'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async login({ username, password }) {

    // 查找用户是否存在
    let currentUser = null;
    this.config.admin.some(user => {
      if (user.username === username && user.password === password) {
        currentUser = user;
        return true;
      }
      return false;
    });

    // 存在则生成token并返回
    if (currentUser) {
      const payload = {
        username,
      };
      return this.ctx.helper.signToken(payload);
    }
    throw new Error('用户不存在');
  }
}

module.exports = UserService;
