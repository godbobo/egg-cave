'use strict';

const Service = require('egg').Service;

class MoodsService extends Service {

  async index() {
    const { ctx } = this;
    let { page, rows } = ctx.request.query;
    const param = {
      orders: [[ 'create_time', 'desc' ]],
    };
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
    const user = await this.app.mysql.select('mood', param);
    return user;
  }

  async create(params) {
    params.create_time = new Date();
    const { affectedRows } = await this.app.mysql.insert('mood', params);
    return affectedRows > 0;
  }
}

module.exports = MoodsService;
