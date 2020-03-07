'use strict';

const Controller = require('egg').Controller;

const createRule = {
  author: 'email',
  content: 'string',
};

class MessageBoardController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.messageBoard.index(ctx.request.body);
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.messageBoard.create(ctx.request.body);
  }

}


module.exports = MessageBoardController;
