'use strict';

const Service = require('egg').Service;

class MoodsService extends Service {

  async index() {
    const { ctx } = this;
    let { page, rows, email } = ctx.request.query;
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
    const moodList = await this.app.mysql.query('select distinct a.*, b.star_num star, if( d.email = ?, 1, 0 ) has_star  from mood a left join (select mood, count(visitor) star_num from star group by mood) b on a.id = b.mood left join star c on b.mood = c.mood left join visitor d on c.visitor = d.id order by create_time desc limit ?, ?', [ email || '', param.offset || 0, param.limit || 1000 ]);
    const cmtIst = async mood => {
      mood.commentList = await ctx.service.comment.index(mood.id);
    };
    const promiseQueue = moodList.map(mood => {
      return cmtIst(mood);
    });
    await Promise.all(promiseQueue);
    return moodList;
  }

  async create(params) {
    params.create_time = new Date();
    await this.app.mysql.insert('mood', params);
  }

  async starMood({ mood, email }) {
    // 获取游客主键
    const user = await this.app.mysql.get('visitor', { email });
    if (!user) {
      throw new Error('未找到该用户');
    }
    const params = {
      mood,
      visitor: user.id,
    };
    try {
      await this.app.mysql.insert('star', params);
    } catch (err) {
      throw new Error('主人不允许你取消点赞哦');
    }
  }

}

module.exports = MoodsService;
