DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Fitbit", "Electronics", 100, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Laptop", "Electronics", 900, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("T-shirt", "Clothing", 10, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Sweathsirt", "Clothing", 15, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Hoodie", "Clothing", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Underwear", "Clothing", 10, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Socks", "Clothing", 5, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pillow case", "Home", 20, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Painting", "Home", 200, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Bed Sheet", "Home", 50, 75);