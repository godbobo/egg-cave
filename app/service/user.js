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
      return {
        token: this.ctx.helper.signToken(payload),
        admin: true,
        nickname: currentUser.nickname,
        email: currentUser.email,
      };
    }
    throw new Error('用户不存在');
  }

  async visitorLogin(param) {

    let visitor = await this.app.mysql.get('visitor', { email: param.email });
    if (!visitor) {
      // 不存在则创建用户
      param.create_time = new Date();
      const result = await this.app.mysql.insert('visitor', param);
      if (result.affectedRows === 1) {
        visitor = param;
      } else {
        throw new Error('创建用户失败');
      }
    }

    const payload = {
      username: visitor.email,
    };
    return {
      token: this.ctx.helper.signToken(payload),
      admin: false,
      nickname: visitor.nickname,
      email: visitor.email,
    };
  }

  async userinfo(token) {
    const jwt = require('jsonwebtoken');
    const payload = jwt.verify(token, this.app.config.token.secret);

    // 查询用户是不是管理员
    let currentUser = null;
    this.config.admin.some(user => {
      if (user.username === payload.username) {
        currentUser = user;
        return true;
      }
      return false;
    });

    if (currentUser) {
      return {
        nickname: currentUser.nickname,
        email: currentUser.email,
        admin: true,
      };
    }

    // 查询用户是不是游客
    const visitor = await this.app.mysql.get('visitor', { email: payload.username });
    if (visitor) {
      return {
        nickname: visitor.nickname,
        email: visitor.email,
        admin: false,
      };
    }
    return null;
  }
}

module.exports = UserService;
