CREATE DATABASE IF NOT EXISTS `event-databases`;
GRANT ALL ON `event-databases`.* TO 'databases'@'%';
CREATE DATABASE IF NOT EXISTS `databases`;
GRANT ALL ON `databases`.* TO 'databases'@'%';
