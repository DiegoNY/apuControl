/*
 Navicat Premium Data Transfer

 Source Server         : connnecion1
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : control_empresas

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 17/10/2022 17:05:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accesos
-- ----------------------------
DROP TABLE IF EXISTS `accesos`;
CREATE TABLE `accesos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sucursal` int(255) NULL DEFAULT NULL,
  `nombreAcceso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `idAcceso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `contraseña` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accesos
-- ----------------------------
INSERT INTO `accesos` VALUES (1, 123, 'Acceso', '12', 'Contrasena', '0');
INSERT INTO `accesos` VALUES (2, 123, 'accesoi', '123213123', 'ccooonnnnstta', '0');
INSERT INTO `accesos` VALUES (3, 0, 'fsaf', 'fasfsf', 'asfaf', '0');
INSERT INTO `accesos` VALUES (4, 123, 'asdad', 'fasfaf', 'fsfasf', '0');
INSERT INTO `accesos` VALUES (5, 0, 'dsadasd', 'dasdad', 'dsadads', '0');
INSERT INTO `accesos` VALUES (6, 12, '12414', '12', 'sdaadasd', '0');
INSERT INTO `accesos` VALUES (7, 1213, 'nombre editado', 'dasdas', 'contraseñas', '1');
INSERT INTO `accesos` VALUES (8, 0, 'adsasdas', 'dasdd', 'dsadad', '0');
INSERT INTO `accesos` VALUES (9, 0, 'adsdasd', 'dasdas', 'dadasda', '0');
INSERT INTO `accesos` VALUES (10, 123, 'adsdasd', 'dasdas', 'dadasda', '0');
INSERT INTO `accesos` VALUES (11, 125, 'adsdasd', 'dasdas', 'dadasda', '0');
INSERT INTO `accesos` VALUES (12, 1213, 'Nombre', 'dasdas', 'contra', '0');
INSERT INTO `accesos` VALUES (13, 123, 'dsad', 'dsada', 'dsada', '1');
INSERT INTO `accesos` VALUES (14, 12441, 'sa', 'fsafasas', 'fsafaf', '1');

-- ----------------------------
-- Table structure for bandera
-- ----------------------------
DROP TABLE IF EXISTS `bandera`;
CREATE TABLE `bandera`  (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `logo` mediumblob NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bandera
-- ----------------------------

-- ----------------------------
-- Table structure for contactos
-- ----------------------------
DROP TABLE IF EXISTS `contactos`;
CREATE TABLE `contactos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre_contacto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cargo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono` int(11) NULL DEFAULT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contactos
-- ----------------------------
INSERT INTO `contactos` VALUES (1, '123', 'Nuevo Contacto', 'GERENte', 9845143, 'nalvartediego40@gmail.com ', '1');
INSERT INTO `contactos` VALUES (2, '123', 'dsada', 'asdsad', 2147483647, 'dasdfa sfasfsa', '1');

-- ----------------------------
-- Table structure for empresa
-- ----------------------------
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE `empresa`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_grupo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tipo_persona` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ruc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `razon_social` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nom_comercial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_ubigeo` int(255) NULL DEFAULT NULL,
  `id_rubro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_tipo_sistema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_tipo_integracion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tipo_envio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_registro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `eliminada` int(2) NULL DEFAULT NULL,
  `estado_comercial` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of empresa
-- ----------------------------
INSERT INTO `empresa` VALUES (1, '1', '1', 'das', 'das', 'dsa', 'das', 0, '1', '1', '1', '2', '1', 'das', 0, '0');
INSERT INTO `empresa` VALUES (2, '0', '2', '', '', '', '', 0, '2', '2', '2', '2', '1', '', 0, '1');
INSERT INTO `empresa` VALUES (3, '0', '2', '', '', '', '', 0, '2', '2', '2', '2', '1', '', 0, '1');
INSERT INTO `empresa` VALUES (4, '1', '1', '75447008', 'sdasdd', 'Empresa', 'asdasd', 1, '1', '1', '1', '1', '1', '12/12/12/12', 0, '0');
INSERT INTO `empresa` VALUES (5, '1', '1', '121212', 'RAZON SOCIAL', 'EmpresaSAC', 'MZ K2 LT 29929', 2, '1', '1', '1', '1', '1', 'FECHA', 0, '0');
INSERT INTO `empresa` VALUES (6, '1', 'JURIDICA', '1231231', 'adsda', 'ddasd', 'asddasad', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', '1212', 1, '1');
INSERT INTO `empresa` VALUES (7, '1', 'JURIDICA', 'dasd', 'asdasd', 'dasda', 'asdasd', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', 'dasda', 0, '1');
INSERT INTO `empresa` VALUES (8, '1', 'JURIDICA', 'das', 'dasd', 'dsadad', 'dasd', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', 'dsad', 0, '1');
INSERT INTO `empresa` VALUES (9, '1', 'JURIDICA', '123124', 'sadad', 'dasdas', 'dsadasds', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', '121212', 0, '1');
INSERT INTO `empresa` VALUES (10, '1', 'JURIDICA', '12321', 'afsfsa', 'dasd', 'afafwafa', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', 'afsfa', 0, '1');
INSERT INTO `empresa` VALUES (11, '2', 'JURIDICA', '121212', 'DROGUERIa', 'EmpresaSAC', 'MZ ESTA DIRECCIOIN', 164, 'EDS', 'APUGESCOM', 'TXT', 'SUNAT', '1', '12/12/12', 0, '1');
INSERT INTO `empresa` VALUES (12, '2', 'NATURAL', '1231231312', 'esat', 'Nuve empresa', 'asdadasdsa', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', '12121212', 0, '0');
INSERT INTO `empresa` VALUES (13, '2', 'JURIDICA', '1231242', 'dsada', 'dsadas', 'dsadad', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', 'sadasd', 0, '1');
INSERT INTO `empresa` VALUES (14, 'Diego', 'JURIDICA', '1241', 'asfsaf', 'fasf', 'fasfaf', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', 'safafs', 1, '1');
INSERT INTO `empresa` VALUES (15, 'das', 'JURIDICA', '1212121', 'sadasd', 'Empresa', 'saddadas', 164, 'BOTICAS', 'APUGESCOM', 'TXT', 'SUNAT', '1', '121212', 1, '1');

-- ----------------------------
-- Table structure for grupo
-- ----------------------------
DROP TABLE IF EXISTS `grupo`;
CREATE TABLE `grupo`  (
  `id` int(225) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `descripcion` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` int(255) NULL DEFAULT NULL,
  `usuarioCreacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fechaCreacion` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grupo
-- ----------------------------
INSERT INTO `grupo` VALUES (1, 'Diego', 'ds', 1, 'ds', '0000-00-00');
INSERT INTO `grupo` VALUES (2, 'ad', 'das', 1, 'sdas', '0000-00-00');
INSERT INTO `grupo` VALUES (3, 'das', 'sda', 1, 'da', '0000-00-00');
INSERT INTO `grupo` VALUES (4, 'das', 'das', 1, 'das', '0000-00-00');
INSERT INTO `grupo` VALUES (5, 'huerfanitos', 'ven todas la empresas', 1, 'usuari1', '2012-12-11');

-- ----------------------------
-- Table structure for rubro
-- ----------------------------
DROP TABLE IF EXISTS `rubro`;
CREATE TABLE `rubro`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` int(255) NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rubro
-- ----------------------------

-- ----------------------------
-- Table structure for sucursal
-- ----------------------------
DROP TABLE IF EXISTS `sucursal`;
CREATE TABLE `sucursal`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_cofide` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ubigeo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` int(2) NULL DEFAULT NULL,
  `id_empresa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sucursal
-- ----------------------------
INSERT INTO `sucursal` VALUES (1, 'cod', 'Nombre', 'Direccion', '1', 0, '123');
INSERT INTO `sucursal` VALUES (2, 'dasda', 'dasd', 'dasd', '2', 0, 'dasasd');
INSERT INTO `sucursal` VALUES (3, 'dsad', 'dasd', 'dsad', '2', 0, 'dasd');
INSERT INTO `sucursal` VALUES (4, 'dsad', 'dasd', 'dsad', '2', 0, 'dasd');
INSERT INTO `sucursal` VALUES (5, 'dsad', 'dsa', 'dsa', '2', 0, 'dasd');
INSERT INTO `sucursal` VALUES (6, 'dsad', 'dsa', 'dasd', '2', 0, '123');
INSERT INTO `sucursal` VALUES (7, '144', 'nuevo nombre', 'Nueva direccion', '2', 1, 'dasdas');
INSERT INTO `sucursal` VALUES (8, 'dasdas', 'dasd', 'adsd', '1', 0, 'dsada');
INSERT INTO `sucursal` VALUES (9, 'sada', 'dasd', 'dsad', '2', 0, 'dasda');
INSERT INTO `sucursal` VALUES (10, 'dsada', 'dasd', 'dasd', '2', 0, 'asda');
INSERT INTO `sucursal` VALUES (11, '1212', 'dasd', 'asdd', '2', 1, 'dasdad');
INSERT INTO `sucursal` VALUES (12, 'asdda', 'dasd', 'sadda', '2', 0, 'asdad');
INSERT INTO `sucursal` VALUES (13, 'asdad', 'dasd', 'asd', '2', 0, 'asd');
INSERT INTO `sucursal` VALUES (14, '123', 'dasd', 'ads', '2', 1, 'dsada');
INSERT INTO `sucursal` VALUES (15, '', 'dasdas', 'dsadasds', '164', 0, '123124');
INSERT INTO `sucursal` VALUES (16, '', 'dasd', 'afafwafa', '164', 0, '12321');
INSERT INTO `sucursal` VALUES (17, '', 'EmpresaSAC', 'MZ ESTA DIRECCIOIN', '164', 0, '121212');
INSERT INTO `sucursal` VALUES (18, '', 'Nuve empresa', 'asdadasdsa', '164', 1, '1231231312');
INSERT INTO `sucursal` VALUES (19, '', 'dsadas', 'dsadad', '164', 1, '1231242');
INSERT INTO `sucursal` VALUES (20, '', 'fasf', 'fasfaf', '164', 1, '1241');
INSERT INTO `sucursal` VALUES (21, '124', 'Empresa', 'saddadas', '1', 1, '1212121');

-- ----------------------------
-- Table structure for tipo_integracion
-- ----------------------------
DROP TABLE IF EXISTS `tipo_integracion`;
CREATE TABLE `tipo_integracion`  (
  `id` int(225) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` int(2) NULL DEFAULT NULL,
  `fecha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_integracion
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_sistema
-- ----------------------------
DROP TABLE IF EXISTS `tipo_sistema`;
CREATE TABLE `tipo_sistema`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_sistema
-- ----------------------------

-- ----------------------------
-- Table structure for ubigeo
-- ----------------------------
DROP TABLE IF EXISTS `ubigeo`;
CREATE TABLE `ubigeo`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `codigo` int(4) NULL DEFAULT NULL,
  `departamento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `provincia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `distrito` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` int(255) NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ubigeo
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
