-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: localhost    Database: app-tickets
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_by` int NOT NULL,
  `assigned_to` int DEFAULT NULL,
  `status` enum('open','in-progress','resolved','closed') NOT NULL DEFAULT 'open',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'low',
  PRIMARY KEY (`id`),
  KEY `fk_created_by_idx` (`created_by`),
  KEY `fk_assigned_to_idx` (`assigned_to`),
  CONSTRAINT `fk_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (5,'Problema con notificaciones','Las notificaciones no aparecen en tiempo real.',6,1,'closed','medium'),(10,'Actualización de términos y condiciones','Se necesita actualizar los términos del servicio.',1,NULL,'closed','low'),(11,'Integración con API externa','Falla al conectar con servicio externo.',2,7,'in-progress','medium'),(12,'Problema con exportación de datos','Los reportes no se generan correctamente.',3,9,'resolved','high'),(14,'Correo de confirmación no llega','Los nuevos usuarios no reciben confirmación por correo.',5,1,'closed','medium'),(15,'Lentitud en el sistema','El sistema tarda en responder en ciertas secciones.',6,5,'open','high'),(16,'Error en generación de PDF','No se pueden generar archivos PDF.',7,NULL,'in-progress','medium'),(17,'Solicitud de acceso a logs','Necesito acceso a los logs del sistema.',8,9,'resolved','low'),(18,'Fallo en autenticación con redes sociales','No se puede iniciar sesión con Google.',9,7,'open','high'),(20,'Bug en filtrado de resultados','Los filtros no aplican correctamente.',1,5,'resolved','medium'),(21,'Inconsistencia en datos de facturación','Datos incorrectos en las facturas.',2,9,'closed','high'),(22,'Optimización de imágenes','Mejorar la carga de imágenes.',3,NULL,'open','low'),(23,'Revisión de logs de errores','Se reportan errores en producción.',4,1,'in-progress','medium'),(24,'Corrección de traducciones','Errores en traducción al inglés.',5,7,'resolved','low'),(25,'Error en módulo de comentarios','No se pueden publicar comentarios.',6,NULL,'open','high'),(26,'Problema con horarios de soporte','Los horarios no se actualizan correctamente.',7,5,'closed','medium'),(27,'Fallo en verificación de email','Los emails no son validados correctamente.',8,9,'open','high'),(28,'Inconsistencia en dashboard de usuario','Los datos no coinciden con la base de datos.',9,NULL,'resolved','medium'),(29,'Configuración de permisos','Se requiere una mejor gestión de permisos.',10,1,'open','low'),(30,'Implementación de nueva funcionalidad','Agregar opción de recordatorios automáticos.',1,NULL,'open','low'),(31,'Corrección de estilos CSS','Algunos elementos se ven mal en móvil.',2,7,'in-progress','medium'),(32,'Revisión de seguridad','Posible vulnerabilidad en autenticación.',3,5,'resolved','high'),(33,'Migración de datos','Necesitamos migrar datos antiguos.',4,9,'closed','medium'),(34,'Fallo en descarga de archivos','Los usuarios reportan errores al descargar.',5,NULL,'open','high'),(35,'Integración con sistema de analíticas','Solicito integración con Google Analytics.',6,1,'in-progress','low'),(36,'Revisión de logs de error','Errores recurrentes en el sistema.',7,5,'resolved','medium'),(37,'Corrección de validaciones','Errores en validación de formularios.',8,9,'closed','high'),(38,'Actualización de documentación','La documentación está desactualizada.',9,NULL,'open','low'),(39,'Fallo en carga de recursos','Los archivos CSS no cargan en algunos navegadores.',10,1,'in-progress','medium'),(40,'Errores en reportes generados','Los datos en los reportes no son correctos.',1,7,'resolved','high'),(41,'Optimización del servidor','Reducir tiempos de carga en la web.',2,NULL,'open','medium'),(42,'Configuración de backups','Se requiere una mejor estrategia de backup.',3,9,'closed','low'),(43,'Error en cálculo de estadísticas','Las métricas no son correctas.',4,5,'in-progress','high'),(44,'Soporte para nuevo navegador','Compatibilidad con Microsoft Edge.',5,NULL,'open','low'),(45,'Error en sistema de roles','Los permisos no se aplican correctamente.',6,1,'resolved','medium'),(46,'Solicitud de nueva funcionalidad','Agregar soporte para exportación CSV.',7,NULL,'open','low'),(47,'Fallo en integración con API','El sistema no recibe respuesta de API externa.',8,9,'in-progress','high'),(48,'Error en generación de informes','Los informes financieros tienen errores.',9,5,'resolved','medium'),(49,'Problema con carga de dashboard','El dashboard no carga correctamente.',10,NULL,'open','high'),(50,'Tarea para mañana','Tenemos que hacer el deploy',1,NULL,'open','low'),(51,'Tarea super urgente','Cambiar los botones del formulario',2,NULL,'open','low'),(52,'Tarea super urgente','Cambiar los botones del formulario',2,NULL,'open','low'),(53,'Estudiar mucho','Hay que aprender Go y Rust',1,NULL,'open','low'),(55,'Prueba redirección','A ver si ya tira',1,NULL,'open','low'),(56,'Prueba de Alerta','A ver cómo sale la alerta',1,NULL,'open','low'),(59,'Prueba definitiva','Probando si salen los nombres',5,NULL,'open','low');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-30 20:14:10
