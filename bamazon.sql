CREATE DATABASE bamazon_db; 

USE bamazon_db; 

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(100) NOT NULL, 
	department_name VARCHAR(100) NOT NULL, 
	price DECIMAL(11, 2) NOT NULL, 
	stock_quantity INTEGER NOT NULL, 
	PRIMARY KEY (item_id)
);
USE bamazon_db; 
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Rolex", "Watch", 10000, 50); 


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Printed Summer Tee", "Tops", 120, 100); 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Matte Black Blazer", "Tops", 300, 50); 
 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Distressed Jeans", "Bottoms", 250, 100); 


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Classic Tanks", "Tops", 40, 500); 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Panerai", "Watch", 20000, 30); 


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Printed Shorts", "Bottoms", 80, 100); 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Button Down Shirt", "Tops", 140, 60); 
 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Classic Trousers", "Bottoms", 180, 200); 


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Frat Tanks", "Tops", 60, 200); 
SELECT * FROM products; 

USE bamazon_db;
ALTER TABLE products
  ADD product_sales INTEGER NOT NULL;
SELECT * FROM products; 

USE bamazon_db;
ALTER TABLE products
  DROP product_sales;
SELECT * FROM products; 

USE bamazon_db;
ALTER TABLE products
  ADD product_sales INTEGER NOT NULL DEFAULT 0;
SELECT * FROM products;

USE bamazon_db;
CREATE TABLE departments (
	department_id INTEGER AUTO_INCREMENT NOT NULL, 
    department_name VARCHAR(100) NOT NULL, 
    over_head_costs DECIMAL(11, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
); 
SELECT * FROM departments; 

USE bamazon_db;
INSERT INTO departments(department_name, over_head_costs)
VALUES("Watch", 1000000), ("Tops", 80000), ("Bottoms", 80000), ("Other", 50000);
SELECT * FROM departments;

USE bamazon_db;
DROP TABLE departments;

USE bamazon_db;
CREATE TABLE departments (
	department_id INTEGER AUTO_INCREMENT NOT NULL, 
    department_name VARCHAR(100) NOT NULL, 
    over_head_costs DECIMAL(11, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
); 

USE bamazon_db;
INSERT INTO departments(department_name, over_head_costs)
VALUES("Watch", 20000), ("Tops", 10000), ("Bottoms", 10000), ("Other", 5000);
SELECT * FROM departments;
