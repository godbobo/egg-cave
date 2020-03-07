'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/visitor/login', controller.user.visitorLogin);
  router.get('/api/user/token', controller.user.userinfo);
  router.post('/api/moods/star', controller.moods.starMood);
  router.resources('/api/moods', controller.moods);
  router.resources('/api/message-boards', controller.messageBoard);
  router.resources('/api/comments', controller.comment);
};
