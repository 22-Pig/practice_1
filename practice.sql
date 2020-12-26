/*
 Navicat Premium Data Transfer

 Source Server         : practice
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : practice

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 26/12/2020 21:57:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `id` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES (1, 'humd', '湿度传感器1', '43.4', '男厕');
INSERT INTO `device` VALUES (2, 'temp', '温度传感器1', '23.2', '男厕');
INSERT INTO `device` VALUES (3, 'led', '灯2', '1', '男厕');
INSERT INTO `device` VALUES (4, 'CO', 'CO传感器1', '2.3', '男厕');
INSERT INTO `device` VALUES (5, 'door', '门1', '1', '女厕');
INSERT INTO `device` VALUES (6, 'temp', '温度传感器2', '19.2', '女厕');
INSERT INTO `device` VALUES (7, 'humd', '湿度传感器2', '42.1', '女厕');
INSERT INTO `device` VALUES (8, 'CO', 'CO传感器2', '2.4', '女厕');
INSERT INTO `device` VALUES (9, 'led', '灯1', '1', '女厕');
INSERT INTO `device` VALUES (10, 'door', '门2', '0', '男厕');
INSERT INTO `device` VALUES (11, 'infrared', '红外1', '1', '男厕');
INSERT INTO `device` VALUES (12, 'infrared', '红外2', '0', '男厕');
INSERT INTO `device` VALUES (13, 'fan', '风扇1', '0', '男厕');
INSERT INTO `device` VALUES (14, 'fan1', '风扇1', '0', '男厕');
INSERT INTO `device` VALUES (15, 'led', '123', '0', '213123');
INSERT INTO `device` VALUES (16, '3123', '123', '0', '123');
INSERT INTO `device` VALUES (17, 'dasd', 'dasda', '0', 'dasda');
INSERT INTO `device` VALUES (18, '3123', '123123', '0', '123123');
INSERT INTO `device` VALUES (19, '12', '12', '0', NULL);

-- ----------------------------
-- Table structure for distance
-- ----------------------------
DROP TABLE IF EXISTS `distance`;
CREATE TABLE `distance`  (
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `distance` double(10, 0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of distance
-- ----------------------------

-- ----------------------------
-- Table structure for humd
-- ----------------------------
DROP TABLE IF EXISTS `humd`;
CREATE TABLE `humd`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` bigint(20) UNSIGNED ZEROFILL NOT NULL,
  `humd` float NOT NULL,
  PRIMARY KEY (`id`, `time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of humd
-- ----------------------------

-- ----------------------------
-- Table structure for luminance
-- ----------------------------
DROP TABLE IF EXISTS `luminance`;
CREATE TABLE `luminance`  (
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `illumination` double(10, 0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of luminance
-- ----------------------------

-- ----------------------------
-- Table structure for smoke
-- ----------------------------
DROP TABLE IF EXISTS `smoke`;
CREATE TABLE `smoke`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` bigint(20) UNSIGNED ZEROFILL NOT NULL,
  `smoke` float NOT NULL,
  PRIMARY KEY (`id`, `time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of smoke
-- ----------------------------

-- ----------------------------
-- Table structure for temp
-- ----------------------------
DROP TABLE IF EXISTS `temp`;
CREATE TABLE `temp`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` bigint(20) UNSIGNED ZEROFILL NOT NULL,
  `temp` float NOT NULL,
  PRIMARY KEY (`id`, `time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of temp
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `message` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `username`) USING BTREE,
  UNIQUE INDEX `uname`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_esperanto_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123123', '管理员');
INSERT INTO `user` VALUES (2, 'ashaun', '123123', '沈轶东');
INSERT INTO `user` VALUES (3, 'aMurphy', '123123', '矿老板');
INSERT INTO `user` VALUES (4, 'asmg', '123123', '我是卷王');
INSERT INTO `user` VALUES (5, 'asfdfsadf', '123123', 'sadasd');
INSERT INTO `user` VALUES (6, 'ajinglanfan', '123123', '大卷王');
INSERT INTO `user` VALUES (7, 'awang', '123123', '王宇弘');
INSERT INTO `user` VALUES (8, 'awanmgwamh', '321312', '31231312');

SET FOREIGN_KEY_CHECKS = 1;
