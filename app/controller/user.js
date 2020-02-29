'use strict';

const Controller = require('egg').Controller;

const loginRule = {
  username: 'string',
  password: 'string',
};

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.body);
    ctx.body = await ctx.service.user.login(ctx.request.body);
  }

}

module.exports = UserController;
