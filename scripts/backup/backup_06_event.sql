-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: event-databases
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `baskets`
--

DROP TABLE IF EXISTS `baskets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baskets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientUuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `nbItem` int DEFAULT NULL,
  `nbSubItem` int DEFAULT NULL,
  `waitPayment` tinyint(1) DEFAULT NULL,
  `billed` tinyint(1) DEFAULT NULL,
  `orderUuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billingDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baskets`
--

LOCK TABLES `baskets` WRITE;
/*!40000 ALTER TABLE `baskets` DISABLE KEYS */;
/*!40000 ALTER TABLE `baskets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_items`
--

DROP TABLE IF EXISTS `event_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `localtion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `place` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventId` int DEFAULT NULL,
  `basketId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  KEY `basketId` (`basketId`),
  CONSTRAINT `event_items_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_items_ibfk_2` FOREIGN KEY (`basketId`) REFERENCES `baskets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_items`
--

LOCK TABLES `event_items` WRITE;
/*!40000 ALTER TABLE `event_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_types`
--

DROP TABLE IF EXISTS `event_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_types` (
  `id` int NOT NULL,
  `libelle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatarSrc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_types`
--

LOCK TABLES `event_types` WRITE;
/*!40000 ALTER TABLE `event_types` DISABLE KEYS */;
INSERT INTO `event_types` VALUES (1,'Concert','concert.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(2,'Meeting','meeting.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(3,'Exposition','exposition.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(4,'Festival','festival.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(5,'Conférence','conference.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(6,'Spectacle','spectacle.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(7,'Sport','sport.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(8,'Cinéma','cinema.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(9,'Atelier','atelier.png','2023-05-14 19:42:42','2023-05-14 19:42:42'),(10,'Foire','foire.png','2023-05-14 19:42:42','2023-05-14 19:42:42');
/*!40000 ALTER TABLE `event_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerUuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `place` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventTypeId` (`eventTypeId`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`eventTypeId`) REFERENCES `event_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','n','c','d','2023-05-16 21:11:22','2023-05-19 21:11:22',12.00,12,'2023-05-14 19:43:29','2023-05-14 19:43:29',3),(2,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A','A','A','2023-05-17 00:00:00','2023-05-03 00:00:00',12.00,0,'2023-05-15 17:23:31','2023-05-15 17:23:31',2),(3,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','E','E','E','2023-05-19 00:00:00','2023-05-03 00:00:00',1.00,0,'2023-05-15 17:23:41','2023-05-15 17:23:41',10),(4,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','C','AZ','A','2023-06-01 00:00:00','2023-05-12 00:00:00',12.00,12,'2023-05-15 17:23:56','2023-05-15 17:23:56',5),(5,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','T','T','T','2023-05-24 00:00:00','2023-05-26 00:00:00',2.00,2,'2023-05-15 17:24:09','2023-05-15 17:24:09',10),(6,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','Y','Y','Y','2023-05-20 00:00:00','2023-05-03 00:00:00',43.00,0,'2023-05-15 17:24:23','2023-05-15 17:24:23',2),(7,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','U','U','U','2023-06-01 00:00:00','2023-05-17 00:00:00',12.00,100,'2023-05-15 18:00:02','2023-05-15 18:00:02',3),(8,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A1','A1','A1','2023-05-16 20:00:34','2023-05-11 20:00:34',1.00,1,'2023-05-15 18:00:33','2023-05-15 18:00:33',2),(9,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A3','A3','A3','2023-05-16 20:01:38','2023-05-11 20:01:38',4.00,4,'2023-05-15 18:01:38','2023-05-15 18:01:38',4),(10,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A4','A4','A4','2023-05-09 20:02:00','2023-05-20 20:02:00',3.00,3,'2023-05-15 18:02:00','2023-05-15 18:02:00',2),(11,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A5','A5','A5','2023-05-16 21:11:22','2023-05-10 21:15:41',1.00,2,'2023-05-15 18:02:52','2023-05-15 18:02:52',4),(12,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A6','A6','A6','2023-05-30 20:02:52','2023-05-17 21:15:41',5.00,5,'2023-05-15 18:02:52','2023-05-15 18:02:52',8),(13,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A71','A7','A7','2023-05-11 21:11:22','2023-05-19 21:11:22',12.00,21,'2023-05-15 18:04:05','2023-05-15 18:10:15',10),(14,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A8','A8','A8','2023-05-02 21:15:41','2023-05-17 21:15:41',5.00,2,'2023-05-15 18:04:05','2023-05-15 18:04:05',5),(15,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A11','A11','A11','2023-05-16 20:04:16','2023-05-23 20:04:16',1.00,1,'2023-05-15 18:04:05','2023-05-15 18:04:05',3),(16,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A12','A12','A12','2023-05-24 20:04:16','2023-05-09 20:04:16',4.00,4,'2023-05-15 18:04:05','2023-05-15 18:04:05',7),(17,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A13','A13','A13','2023-05-23 20:04:16','2023-05-17 20:04:16',5.00,5,'2023-05-15 18:04:05','2023-05-15 18:04:05',10),(18,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A15','A15','A15','2023-05-20 20:04:16','2023-05-15 20:04:16',15.00,15,'2023-05-15 18:04:05','2023-05-15 18:04:05',9),(19,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A16','A16','A16','2023-05-19 20:04:16','2023-05-13 20:04:16',4.00,5,'2023-05-15 18:04:05','2023-05-15 18:04:05',6),(20,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A111','A111','A111','2023-05-17 20:04:16','2023-05-09 20:04:16',6.00,6,'2023-05-15 18:04:05','2023-05-15 18:04:05',5),(21,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A121','A121','A121','2023-05-17 20:04:16','2023-05-17 20:04:16',1.00,1,'2023-05-15 18:04:05','2023-05-15 18:04:05',7),(22,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A123','A123','A123','2023-05-18 20:04:16','2023-05-19 20:04:16',5.00,5,'2023-05-15 18:04:05','2023-05-15 18:04:05',4),(23,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A222','A222','A222','2023-05-28 20:11:42','2023-05-24 20:11:42',21.00,21,'2023-05-15 18:11:36','2023-05-15 18:11:36',5),(24,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A333','A333','A333','2023-05-02 21:15:41','2023-05-17 21:15:41',5.00,1,'2023-05-15 18:11:36','2023-05-15 18:11:36',2),(25,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A444','A444','A444','2023-05-08 20:11:42','2023-05-17 20:11:42',31.00,31,'2023-05-15 18:11:36','2023-05-15 18:11:36',9),(26,'gkRJocAhhsgwck7fXLDtP9i3rLrXZgf489cb3a286577c38850b4d20cc7a92d808413b2fd031ca6ee235421981bcebc','A312','A312','A312','2023-05-25 20:11:42','2023-05-16 20:11:42',21.00,21,'2023-05-15 18:11:36','2023-05-15 18:11:36',10);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 18:21:37
