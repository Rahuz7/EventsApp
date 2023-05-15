CREATE DATABASE IF NOT EXISTS `event-databases` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL ON `event-databases`.* TO 'databases'@'%';
CREATE DATABASE IF NOT EXISTS `user-databases` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL ON `user-databases`.* TO 'databases'@'%';
CREATE DATABASE IF NOT EXISTS `payment-databases` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL ON `payment-databases`.* TO 'databases'@'%';


-- Ajoutez les inserts pour initialiser les types d'événements

