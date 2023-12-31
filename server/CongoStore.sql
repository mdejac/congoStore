CREATE DATABASE  IF NOT EXISTS `congo_schema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `congo_schema`;
-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: congo_schema
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `isPaid` tinyint DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_carts_users1_idx` (`user_id`),
  CONSTRAINT `fk_carts_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (3,3,0,'2023-08-22 02:40:14','2023-08-22 02:40:14');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_products_users_idx` (`user_id`),
  CONSTRAINT `fk_products_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (58,3,'TCK 55\" Class S4 4K LED Smart TV w Fire TV','TCL 55-Inch Class S4 4K LED Smart TV with Fire TV (55S450F, 2023 Model), Dolby Vision HDR, Dolby Atmos, Alexa Built-in, Apple Airplay Compatibility, Streaming UHD Television, Black','Electronics, Televison, tv',50,299.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(59,3,'TCL 85\" Q6 QLED 4K Smart TV w/ Google TV','TCL 85-Inch Q6 QLED 4K Smart TV with Google TV (85Q650G, 2023 Model) Dolby Vision, Dolby Atmos, HDR Pro+, Game Accelerator Enhanced Gaming, Voice Remote, Works with Alexa, Streaming ','Electronics, Television, tv',100,1299.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(60,3,'VIZIO 24\" D-Series Full HD 1080p Smart TV','VIZIO 24-inch D-Series Full HD 1080p Smart TV with Apple AirPlay and Chromecast Built-in, Alexa Compatibility, D24f-J09, 2022 Model','Electronics, Television, tv',30,128,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(61,3,'INSIGNIA 24\" Class F20 Series Smart HD TV','INSIGNIA 24-inch Class F20 Series Smart HD 720p Fire TV (NS-24F201NA23, 2022 Model)','Electronics, Television, tv',70,64.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(62,3,'Smart Watch, 44mm Fitness Tracker Watch','Smart Watch, 44mm Fitness Tracker Watch with 24 Sports Modes, 5ATM Swimming Waterproof, Sleep Monitor Step Calorie Counter, 1.7\" HD Touchscreen Smartwatch for Men Women iPhone iOS ','Electronics, Watches, Gadgets',50,29.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(63,3,'Iaret Smart Watch for Women','Iaret Smart Watch for Women(Call Receive/Dial), Fitness Tracker Waterproof Smartwatch for Android iOS Phones 1.7\" HD Full Touch Screen Digital Watches with Heart Rate Sleep Monitor Pedometer','Electronics, Watches, Gadgets',100,49.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(64,3,'Smart Watch for Men Women','Smart Watch for Men Women with Bluetooth Call, Alexa Built-in1.8 DIY Dial with Blood Oxygen Heart Rate Sleep Fitness Tracker Notification Weather 100 Sport Modes Smartwatch for Android iOS ','Electronics, Watches, Gadgets',30,49.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(65,3,'LIVIKEY Smart Watch','LIVIKEY Smart Watch, Fitness Tracker with Heart Rate Monitor, Blood Oxygen, Sleep Tracking, 41mm Smartwatch 5ATM Waterproof with Pedometer for Women Men Compatible with Android iPhone iOS','Electronics, Watches, Gadgets',70,64.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(66,3,'Rivet Aiden Mid Centry couch','Amazon Brand – Rivet Aiden Mid-Century Modern Sofa Couch','Home Decor, Furniture, Living Room',10,1014.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(67,3,'COOSLEEP Modern sofa couch','COOSLEEP Modern Sofas Couches for Living Room, Loveseat Sofas','Home Decor, Furniture, Living Room',19,399.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(68,3,'VanAcc 89\" Sofa','VanAcc 89\" Sofa, Comfy Sofa Couch with Extra Deep Seats,','Home Decor, Furniture, Living Room',41,349.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(69,3,'Karl home L-Shape Sectional Sofa','Karl home L-Shape Sectional Sofa Chenille Fabric Sofa Couch Living ','Home Decor, Furniture, Living Room',61,399.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(70,3,'VASAGLE Side Table, End table, Nightstand','VASAGLE Side Table, Small End Table, Nightstand for Living Room, Bedroom, Office, Bathroom, Rustic Brown and Black ULET271B01, 5.7 ','Home Decor, Furniture, Living Room',17,19.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(71,3,'CubiCubi Computer Desk','CubiCubi Computer Desk, 40 inch Home Office Desk, Modern Simple Style PC Table for Home, Office, Study, Writing, Brown','Home Decor, Furniture, Office',71,49.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(72,3,'WXBOOM 3 Pack Artificial Hanging Plants','WXBOOM 3 Pack Artificial Hanging Plants Fake Potted Greenery Eucalyptus ,Faux Mandala Vine in Pot for Home Room Indoor ','Home Decor, Plants',41,19.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(73,3,'CODACE 5 Tier Metal Plant Stand Indoor','CODACE 5 Tier Metal Plant Stand Indoor - Heart Shaped Plant Shelf Rack Flower Stand with Grow Lights - Multi Planter Display ','Home Decor, Plants',71,159.98,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(74,3,'Miracliy 4 Packs Mini Fake Plants','Miracliy 4 Packs Mini Fake Plants Artificial Potted Eucalyptus Faux Plants for Home Office Farmhouse Bathroom Table Shelf Decor ','Home Decor, Plants',21,11.49,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(75,3,'Oxford Two-Pocket Folders','Oxford Two-Pocket Folders, Assorted Colors, Letter Size, 25 per box (57513)','Back to School, Office',7101,11.04,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(76,3,'BIC Xtra-Strong Thick Lead Mechanical Pencil','BIC Xtra-Strong Thick Lead Mechanical Pencil, With Colorful Barrel Thick Point (0.9mm), 24-Count Pack, With Erasers ','Back to School, Office',981,4.67,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(77,3,'Mead Spiral Notebooks','Mead Spiral Notebooks, 6 Pack, 1 Subject, College Ruled Paper, 7-1/2\" x 10-1/2\", 70 Sheets per Notebook, Assorted Colors (73065)','Back to School, Office',3341,13.16,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(78,3,'Lenovo IdeaPad','Lenovo IdeaPad, 20GB RAM, 1TB SSD, AMD Dual-core Processor, 15.6 Inch HD Anti-Glare Display, Long Battery Life Up to 9.5Hr, HDMI, SD Card Reader, Windows 11, 1 Year Microsoft 365','Electronics, Computers, Laptop',61,464.66,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(79,3,'HP 2021 Stream','HP 2021 Stream 14\" HD SVA Laptop Computer, Intel Celeron N4000 Processor, 4GB RAM, 64GB eMMC Flash Memory, Webcam, 1-Year Office, Intel UHD Graphics 600, Win 10S, Rose Pink, 32GB ','Electronics, Computers, Laptop',1,259.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(80,3,'HP Elite Desktop Computer','HP Elite Desktop Computer PC, 3.1 GHz, Intel Core i5, 16GB, RAM, 2TB HDD, New 22 inch LED Monitor, RGB Speaker and Keyboard Mouse, WiFi, Windows 10 Pro (Renewed)','Electronics, Computers, Desktop PC',651,195.82,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(81,3,'Dell Vostro 3910 Business Desktop Computer','Dell Vostro 3910 Business Desktop Computer, 12th Gen Intel 4-Core Processor(Up to 4.3Ghz), 16GB DDR4 RAM, 1TB NVMe SSD, WiFi 6, DVD-RW, Display Port, HDMI, SD Card Reader, Windows 11 Pro','Electronics, Computers, Desktop PC',81,559.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(82,3,'Hiware 24 Pieces Matte Black Silverware Set','Hiware 24 Pieces Matte Black Silverware Set with Steak Knives for 4, Stainless Steel Flatware Utensils Set, Hand Wash ','Houseware, Kitchen, Flatware, Utensils',341,26.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13'),(83,3,'Nintendo NES','Original Nintendo NES. Includes two controllers and TECMO Super Bowl.','electronics, gadgets, gaming, retro',2,149.99,'img/default.png','2023-08-22 02:32:48','2023-08-22 02:33:13');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_in_carts`
--

DROP TABLE IF EXISTS `products_in_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_in_carts` (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity_to_purchase` int DEFAULT NULL,
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `fk_carts_has_products_products1_idx` (`product_id`),
  KEY `fk_carts_has_products_carts1_idx` (`cart_id`),
  CONSTRAINT `fk_carts_has_products_carts1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `fk_carts_has_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_in_carts`
--

LOCK TABLES `products_in_carts` WRITE;
/*!40000 ALTER TABLE `products_in_carts` DISABLE KEYS */;
INSERT INTO `products_in_carts` VALUES (3,76,1),(3,77,1);
/*!40000 ALTER TABLE `products_in_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `content` text,
  `rating` varchar(5) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_reviews_users1_idx` (`user_id`),
  KEY `fk_reviews_products1_idx` (`product_id`),
  CONSTRAINT `fk_reviews_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,3,76,'Leaving a review on these thick lead pencils','****','2023-08-22 02:46:00','2023-08-22 02:46:00');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(72) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'CongoStore','Corporation','44 Congo Way','congostore@gmail.com','$2b$12$v/OqGIECLFi7bCK.NxpHY.k6ueWkeGOx.E5qGQpGAplFAWsB1p.SS','2023-08-22 02:05:32','2023-08-22 02:05:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-22 18:37:47
