/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : cave

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 07/03/2020 11:08:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '评论主键',
  `content` varchar(1000) NOT NULL COMMENT '评论内容',
  `ext_id` bigint(20) NOT NULL COMMENT '外键主键',
  `author` varchar(255) NOT NULL COMMENT '评论人',
  `target` varchar(255) DEFAULT NULL COMMENT '针对人编号',
  `create_time` datetime NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for message_board
-- ----------------------------
DROP TABLE IF EXISTS `message_board`;
CREATE TABLE `message_board` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `author` varchar(255) NOT NULL COMMENT '留言人',
  `content` varchar(1000) NOT NULL COMMENT '留言内容',
  `create_time` datetime NOT NULL COMMENT '留言时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for mood
-- ----------------------------
DROP TABLE IF EXISTS `mood`;
CREATE TABLE `mood` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `images` text COMMENT '图片地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for star
-- ----------------------------
DROP TABLE IF EXISTS `star`;
CREATE TABLE `star` (
  `mood` bigint(20) NOT NULL COMMENT '心情主键',
  `visitor` bigint(20) NOT NULL COMMENT '游客主键',
  PRIMARY KEY (`mood`,`visitor`),
  UNIQUE KEY `mood` (`mood`,`visitor`),
  KEY `star_visitor_id` (`visitor`),
  CONSTRAINT `star_mood_id` FOREIGN KEY (`mood`) REFERENCES `mood` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `star_visitor_id` FOREIGN KEY (`visitor`) REFERENCES `visitor` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `nickname` varchar(30) DEFAULT NULL COMMENT '昵称',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_email` (`email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
