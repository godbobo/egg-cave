'use strict';

const Service = require('egg').Service;

class MessageBoardService extends Service {

  async index() {
    const { ctx } = this;
    let { page, rows } = ctx.request.query;
    const param = {};
    try {
      if (rows && page) {
        page = Number(page);
        rows = Number(rows);
        param.limit = rows;
        param.offset = (page - 1) * rows;
      }
    } catch (error) {
      this.logger.error('页码转换失败', error);
    }
    const messages = await this.app.mysql.query('select a.*, b.nickname from message_board a left join visitor b on a.author = b.email order by create_time desc limit ?, ?', [ param.offset || 0, param.limit || 100000 ]);
    return messages;
  }

  async create(params) {
    params.create_time = new Date();
    const { affectedRows } = await this.app.mysql.insert('message_board', params);
    return affectedRows > 0;
  }
}

module.exports = MessageBoardService;
