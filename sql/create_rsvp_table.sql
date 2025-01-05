use events;
CREATE TABLE IF NOT EXISTS `rsvp` (
    `rsvp_id` integer PRIMARY KEY AUTO_INCREMENT,
    `event_id` int NOT NULL,
    `first_name` text NOT NULL,
    `last_name` text NOT NULL, 
    `phone_number` text NOT NULL, 
    `email` text NOT NULL, 
    `rsvp_response` text NOT NULL
) DEFAULT CHARSET=utf8;