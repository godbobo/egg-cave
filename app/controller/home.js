'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async aliyunTest() {
    const { ctx, config } = this;

    ctx.body = JSON.stringify(config);

  }
}

module.exports = HomeController;
