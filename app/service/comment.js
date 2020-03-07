'use strict';

const Service = require('egg').Service;

class CommentService extends Service {

  async index(id) {
    return await this.app.mysql.query('select a.*, b.nickname author_name, c.nickname target_name from comment a left join visitor b on a.author = b.email left join visitor c on a.target = c.email where ext_id = ? order by a.create_time asc', [ id ]);
    // return await this.app.mysql.select('comment', {
    //   where: { ext_id: id },
    //   orders: [[ 'create_time', 'asc' ]],
    // });
  }

  async create(params) {
    params.create_time = new Date();
    return await this.app.mysql.insert('comment', params);
  }

}

module.exports = CommentService;
