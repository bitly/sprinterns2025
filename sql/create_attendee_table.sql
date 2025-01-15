USE events;

CREATE TABLE IF NOT EXISTS attendees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    image_url VARCHAR(2048)
) DEFAULT CHARSET=utf8;