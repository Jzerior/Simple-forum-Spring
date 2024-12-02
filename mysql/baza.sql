CREATE DATABASE IF NOT EXISTS projekt;
USE projekt;

-- Możesz dodać tu dodatkowe instrukcje, np. tworzenie tabel
CREATE TABLE IF NOT EXISTS example_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

INSERT INTO example_table (name) VALUES ('Example 1'), ('Example 2');