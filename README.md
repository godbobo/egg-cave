# 小窝（后端）

这是一个类似QQ空间的个人叙事情感网站，主要适配手机端，对桌面端也有一定的支持。管理员可以在网站中发表自己的动态，游客可以点赞、评论，也可以给管理员留言。

做这个项目的意义是让自己傲娇的心有所安放，筛选出真正关心自己的人来看自己的心情。

## 快速开始

项目采用 egg-js 框架进行开发，详细配置请查看官方文档。[传送门](https://eggjs.org/)

本项目对应的前端项目在这里。[传送门](https://github.com/godbobo/quasar-cave)

### 配置

项目中用到了Mysql作为数据库，数据表可在项目根目录找到：**cave.sql**。

配置文件在 **/config** 目录下，开发时需要配置 default.js, 生产环境需要配置prod.js的内容。

由于配置项 Egg 官网都有介绍，这里只介绍自己自定义的配置项：

```js
const userConfig = {
    // 管理员账号密码昵称及邮箱配置
    admin: [
      {
        username: 'admin',
        password: '123',
        nickname: '博博',
        email: 'admin@qq.com',
      },
    ],
  
  	// 应用token签名密钥
    token: {
      secret: 'ctaovken',
      options: {
        // token过期时间
        expiresIn: '7d',
      },
    },

  };
```

在数据库及上面的配置都配置好之后，就可以开发了。

### 开发

```bash
# 国内建议使用 cnpm 安装依赖
$ cnpm i
$ npm run dev
$ open http://localhost:7001/
```

### 发布

```bash
$ npm start
$ npm stop
```

> 项目中用到的东西基本上都是很简单的东西，就不多加介绍了。里面肯定有很多不成熟的设计方式，但至少是可以运行的项目嘛～后面可以慢慢修改。