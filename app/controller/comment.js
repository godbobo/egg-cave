'use strict';

const Controller = require('egg').Controller;

const createRule = {
  content: 'string',
  ext_id: 'number',
  author: 'email',
};

class CommentController extends Controller {

  async create() {
    const { ctx } = this;
    ctx.validate(createRule, ctx.request.body);
    ctx.response.body = await ctx.service.comment.create(ctx.request.body);
  }

}

module.exports = CommentController;
