'use strict';

const Controller = require('egg').Controller;

const createRule = {
  content: 'string',
};

const starRule = {
  email: 'email',
  mood: 'number',
};

class MoodController extends Controller {

  async index() {
    const { ctx } = this;
    // ctx.validate(queryRule, ctx.request.query);
    ctx.body = await ctx.service.moods.index();
  }

  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    await ctx.service.moods.create(ctx.request.body);
  }

  async starMood() {
    const { ctx } = this;
    ctx.validate(starRule, ctx.request.body);
    await ctx.service.moods.starMood(ctx.request.body);
  }

}


module.exports = MoodController;
