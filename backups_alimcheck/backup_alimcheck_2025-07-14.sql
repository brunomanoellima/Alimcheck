-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: alimcheck_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,6,'2025-07-14 05:11:43');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nota` int NOT NULL,
  `comentario` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int NOT NULL,
  `estabelecimento_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_avaliacoes_usuario_idx` (`usuario_id`),
  KEY `fk_avaliacoes_estabelecimento_idx` (`estabelecimento_id`),
  CONSTRAINT `fk_avaliacoes_estabelecimento` FOREIGN KEY (`estabelecimento_id`) REFERENCES `estabelecimentos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_avaliacoes_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,5,NULL,'2025-07-14 05:16:54',1,1),(2,5,NULL,'2025-07-14 05:17:03',1,2),(3,5,NULL,'2025-07-14 05:17:10',1,3),(4,4,NULL,'2025-07-14 05:17:25',1,4),(5,5,NULL,'2025-07-14 05:17:36',1,5),(6,5,NULL,'2025-07-14 05:17:57',1,6),(7,5,NULL,'2025-07-14 05:18:04',1,7),(8,5,NULL,'2025-07-14 05:18:20',1,8),(9,5,NULL,'2025-07-14 05:18:42',1,9),(10,5,NULL,'2025-07-14 05:18:50',1,10),(11,5,NULL,'2025-07-14 05:20:04',7,1),(12,4,NULL,'2025-07-14 05:20:13',7,2),(14,5,NULL,'2025-07-14 05:20:30',7,7),(15,5,NULL,'2025-07-14 05:20:44',7,4),(16,5,NULL,'2025-07-14 05:21:51',3,1),(17,5,NULL,'2025-07-14 05:22:05',3,2),(18,5,NULL,'2025-07-14 05:22:23',3,3);
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Brasileira'),(7,'Cafeteria'),(4,'Hamburgueria'),(2,'Italiana'),(3,'Japonesa'),(5,'Pizzaria'),(6,'Saudável');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  CONSTRAINT `fk_clientes_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,1,'2025-07-14 05:10:08'),(2,2,'2025-07-14 05:10:26'),(3,3,'2025-07-14 05:10:41'),(4,7,'2025-07-14 05:19:51');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denuncias`
--

DROP TABLE IF EXISTS `denuncias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `denuncias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avaliacao_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `motivo` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendente',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_denuncias_avaliacao_idx` (`avaliacao_id`),
  KEY `fk_denuncias_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_denuncias_avaliacao` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_denuncias_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denuncias`
--

LOCK TABLES `denuncias` WRITE;
/*!40000 ALTER TABLE `denuncias` DISABLE KEYS */;
INSERT INTO `denuncias` VALUES (2,12,3,NULL,'pendente','2025-07-14 05:22:02'),(3,3,3,NULL,'pendente','2025-07-14 05:22:15'),(5,11,3,NULL,'pendente','2025-07-14 05:22:36'),(6,1,4,NULL,'rejeitada','2025-07-14 05:27:17');
/*!40000 ALTER TABLE `denuncias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donos_estabelecimento`
--

DROP TABLE IF EXISTS `donos_estabelecimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donos_estabelecimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  CONSTRAINT `fk_donos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donos_estabelecimento`
--

LOCK TABLES `donos_estabelecimento` WRITE;
/*!40000 ALTER TABLE `donos_estabelecimento` DISABLE KEYS */;
INSERT INTO `donos_estabelecimento` VALUES (1,4,'2025-07-14 05:11:00'),(2,5,'2025-07-14 05:11:19');
/*!40000 ALTER TABLE `donos_estabelecimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estabelecimentos`
--

DROP TABLE IF EXISTS `estabelecimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estabelecimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagem_url` text COLLATE utf8mb4_unicode_ci,
  `dono_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estabelecimentos_dono_idx` (`dono_id`),
  KEY `fk_estabelecimentos_categoria_idx` (`categoria_id`),
  CONSTRAINT `fk_estabelecimentos_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_estabelecimentos_dono` FOREIGN KEY (`dono_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estabelecimentos`
--

LOCK TABLES `estabelecimentos` WRITE;
/*!40000 ALTER TABLE `estabelecimentos` DISABLE KEYS */;
INSERT INTO `estabelecimentos` VALUES (1,'pizza','rua sei la n°0','/uploads/imagem-1752469924745-152713505.jpg',4,5),(2,'saudavel','rua sei la n°0','/uploads/imagem-1752469941680-194948902.jpg',4,6),(3,'japonesa','rua sei la n°0','/uploads/imagem-1752469965600-85079314.jpg',4,3),(4,'italiano','rua sei la n°0','/uploads/imagem-1752469982630-525238470.jpg',4,2),(5,'lanche','rua sei la n°0','/uploads/imagem-1752470000903-375935072.jpg',4,4),(6,'cafe','rua sei la n°0','/uploads/imagem-1752470063552-479805662.jpg',5,7),(7,'brasileiro','rua sei la n°0','/uploads/imagem-1752470076614-3640068.jpg',5,1),(8,'saudavel 2','rua sei la n°0','/uploads/imagem-1752470096456-96974.jpg',5,6),(9,'pizza 2','rua sei la n°0','/uploads/imagem-1752470119161-766035052.jpg',5,5),(10,'pizza 3','rua sei la n°0','/uploads/imagem-1752470138657-171955455.jpg',5,5);
/*!40000 ALTER TABLE `estabelecimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas_dono`
--

DROP TABLE IF EXISTS `respostas_dono`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respostas_dono` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resposta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `avaliacao_id` int NOT NULL,
  `dono_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_avaliacao_id` (`avaliacao_id`),
  KEY `fk_respostas_avaliacao_idx` (`avaliacao_id`),
  KEY `fk_respostas_dono_idx` (`dono_id`),
  CONSTRAINT `fk_respostas_avaliacao` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_respostas_dono` FOREIGN KEY (`dono_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas_dono`
--

LOCK TABLES `respostas_dono` WRITE;
/*!40000 ALTER TABLE `respostas_dono` DISABLE KEYS */;
INSERT INTO `respostas_dono` VALUES (1,'obrigado',5,4,'2025-07-14 05:24:37');
/*!40000 ALTER TABLE `respostas_dono` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ativo',
  `avaliacoes_excluidas` int NOT NULL DEFAULT '0',
  `avatar_url` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'c1','c1@gmail.com','$2b$10$g8eY8VYYUQHkZgQVuHZVi..ixa/i/EfmYSai8T287AXywBtGH6yiS','cliente','ativo',0,'/uploads/imagem-1752470351505-258737150.jpg'),(2,'c2','c2@gmail.com','$2b$10$wwPcrO7sePL7pHKnViHG0ubb8WoojsDOCf4cOgYTOy9LfyRYQu9Ke','cliente','ativo',0,NULL),(3,'c3','c3@gmail.com','$2b$10$qwLD18V8snDzi67HGjqbTOp.nt75WFqMlCENyNSgrnMLsx.wzLXWG','cliente','ativo',0,'/uploads/imagem-1752470646539-884577880.jpg'),(4,'d1','d1@gmail.com','$2b$10$OF5/DCHFS81jE8zJ6iIO4ea1p8R7UOAjehYgPL1TsoTO0M9EiaA.i','dono_estabelecimento','ativo',0,'/uploads/imagem-1752470805042-333338858.jpg'),(5,'d2','d2@gmail.com','$2b$10$OwtjizmplMXOe0ldaF9/BOWBNS0.8IC4qDnAwZMp/tjheaLVmLPU6','dono_estabelecimento','ativo',0,'/uploads/imagem-1752470186547-907111645.jpg'),(6,'adm','adm@gmail.com','$2b$10$8tyVoAo/tpUVaefiW2VaD.UPXfvrg01nHoqPR2abV.6f9N198U4f2','admin','ativo',0,NULL),(7,'cb','cb@gmail.com','$2b$10$pQjHxo.dGPbF8luAH7t6CODLNEQlJR0dcqIZ1TfnpTvoj3TNISInm','cliente','banido',1,'/uploads/imagem-1752470494827-704611792.jpg');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14  3:19:36
