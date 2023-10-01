-- MySQL dump 10.13  Distrib 5.7.42, for osx10.18 (x86_64)
--
-- Host: staaus001    Database: ext_studio_analytics_v2
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EventLog`
--

DROP TABLE IF EXISTS `EventLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actionTime` timestamp NULL DEFAULT NULL,
  `idStudioSoftwareRef` int(11) NOT NULL,
  `idStudioUserRef` int(11) DEFAULT NULL,
  `idStudioLocationRef` int(11) NOT NULL,
  `action` varchar(45) NOT NULL,
  `result` varchar(21000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_studiosw_idx` (`idStudioSoftwareRef`),
  KEY `fk_studiouser_idx` (`idStudioUserRef`),
  KEY `fk_location_idx` (`idStudioLocationRef`),
  KEY `action_idx` (`action`),
  KEY `actionTime_idx` (`actionTime`),
  CONSTRAINT `fk_location` FOREIGN KEY (`idStudioLocationRef`) REFERENCES `StudioLocation` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_studiosw` FOREIGN KEY (`idStudioSoftwareRef`) REFERENCES `StudioSoftware` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_studiouser` FOREIGN KEY (`idStudioUserRef`) REFERENCES `StudioUser` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=298968623 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(64) DEFAULT NULL,
  `region` varchar(45) NOT NULL,
  `isp` varchar(128) DEFAULT NULL,
  `domain` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79922 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Software`
--

DROP TABLE IF EXISTS `Software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Software` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `version` varchar(45) NOT NULL,
  `validFrom` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudioInstance`
--

DROP TABLE IF EXISTS `StudioInstance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudioInstance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `computerID` varchar(45) NOT NULL,
  `lastActive` timestamp NULL DEFAULT NULL,
  `firstActive` timestamp NULL DEFAULT NULL,
  `computerOS` varchar(45) NOT NULL,
  `computerOSVersion` varchar(45) NOT NULL,
  `computerCPU` varchar(256) DEFAULT NULL,
  `computerHDDSize` bigint(20) DEFAULT NULL,
  `computerOSArch` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=546536 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudioLocation`
--

DROP TABLE IF EXISTS `StudioLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudioLocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStudioRef` int(11) NOT NULL,
  `date` date NOT NULL,
  `idLocationRef` int(11) NOT NULL,
  `ipAddress` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studiolocation_UNIQUE` (`idStudioRef`,`date`,`idLocationRef`,`ipAddress`),
  KEY `idStudio_idx` (`idStudioRef`),
  KEY `date_idx` (`date`),
  KEY `idLocationRef_idx` (`idLocationRef`),
  KEY `ipAddress_idx` (`ipAddress`),
  CONSTRAINT `fk_idLocationRef` FOREIGN KEY (`idLocationRef`) REFERENCES `Location` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_idStudioRef` FOREIGN KEY (`idStudioRef`) REFERENCES `StudioInstance` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5508187 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudioSoftware`
--

DROP TABLE IF EXISTS `StudioSoftware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudioSoftware` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStudioRef` int(11) NOT NULL,
  `idSoftwareRef` int(11) NOT NULL,
  `synthesized` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `studiosoftware_UNIQUE` (`idStudioRef`,`idSoftwareRef`,`synthesized`),
  KEY `fk_software_idx` (`idSoftwareRef`),
  KEY `fk_studio_idx` (`idStudioRef`),
  KEY `synthesized_idx` (`synthesized`),
  CONSTRAINT `fk_software` FOREIGN KEY (`idSoftwareRef`) REFERENCES `Software` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_studio` FOREIGN KEY (`idStudioRef`) REFERENCES `StudioInstance` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=851979 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudioUser`
--

DROP TABLE IF EXISTS `StudioUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudioUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStudioRef` int(11) NOT NULL,
  `idUserRef` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_idx` (`idUserRef`),
  KEY `fk_studio_idx` (`idStudioRef`),
  CONSTRAINT `fk_studio_` FOREIGN KEY (`idStudioRef`) REFERENCES `StudioInstance` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_user` FOREIGN KEY (`idUserRef`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=668297 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sfId` varchar(45) DEFAULT NULL,
  `userId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55492 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-28 15:17:11
