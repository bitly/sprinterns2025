use events;
CREATE TABLE IF NOT EXISTS `host` (
    `host_id` integer PRIMARY KEY AUTO_INCREMENT,
    `first_name` text NOT NULL,
    `last_name` text NOT NULL,
    `email` text NOT NULL,
    `image_url` text NOT NULL
) DEFAULT CHARSET=utf8;