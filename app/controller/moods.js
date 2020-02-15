'use strict';

const Controller = require('egg').Controller;

const createRule = {
  content: 'string',
};

class MoodController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.moods.index(ctx.request.body);
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.moods.create(ctx.request.body);
    ctx.body = {
      message: '操作成功',
    };
  }

}


module.exports = MoodController;
