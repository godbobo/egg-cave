'use strict';

const Controller = require('egg').Controller;

// 用户登录参数验证
const loginRule = {
  username: 'string',
  password: 'string',
};

// 游客登录参数验证
const visitorLoginRule = {
  email: 'email',
};

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.body);
    ctx.body = await ctx.service.user.login(ctx.request.body);
  }

  async visitorLogin() {
    const { ctx } = this;
    ctx.validate(visitorLoginRule, ctx.request.body);
    ctx.body = await ctx.service.user.visitorLogin(ctx.request.body);
  }

  async userinfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.userinfo(ctx.request.headers.authorization);
  }

}

module.exports = UserController;
