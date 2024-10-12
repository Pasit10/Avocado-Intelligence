CREATE DATABASE Ethnicity_Detection_Model;

USE Ethnicity_Detection_Model;

DROP TABLE transaction;
DROP TABLE product;
DROP TABLE customer;

CREATE TABLE customer (
    customer_id INT NOT NULL,
    sex VARCHAR(255),
    age INT,
    race VARCHAR(255),
    PRIMARY KEY (customer_id)
);

CREATE TABLE product (
    product_id INT NOT NULL,
    name VARCHAR(255),
    price FLOAT,
    detail VARCHAR(255),
    product_img LONGBLOB,
    PRIMARY KEY (product_id)
);

CREATE TABLE transaction (
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT,
    transaction_date date,
    PRIMARY KEY (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- test data part
-- table product
USE Ethnicity_Detection_Model;
DELETE FROM transaction;
DELETE FROM customer;
DELETE FROM product;

INSERT INTO product (product_id, name, price, detail, product_img) VALUES
(1, 'Product A', 100, 'Details for Product A', NULL),
(2, 'Product B', 150, 'Details for Product B', NULL),
(3, 'Product C', 200, 'Details for Product C', NULL),
(4, 'Product D', 250, 'Details for Product D', NULL),
(5, 'Product E', 300, 'Details for Product E', NULL),
(6, 'Product F', 350, 'Details for Product F', NULL),
(7, 'Product G', 400, 'Details for Product G', NULL),
(8, 'Product H', 450, 'Details for Product H', NULL),
(9, 'Product I', 500, 'Details for Product I', NULL),
(10, 'Product J', 550, 'Details for Product J', NULL);

SELECT * FROM transaction
INNER JOIN customer ON transaction.customer_id = customer.customer_id
INNER JOIN product ON transaction.product_id = product.product_id
ORDER BY transaction.customer_id, transaction_date;

SELECT sex,count(sex) FROM customer
GROUP BY sex;

INSERT INTO transaction (customer_id, product_id, qty, transaction_date) VALUES
(1, 10, 2, '2024-10-08'),
(1, 9, 4, '2024-10-07'),
(1, 8, 5, '2024-10-06'),
(1, 7, 6, '2024-10-05'),
(1, 6, 7, '2024-10-04');


-- SELECT * FROM transaction
-- INNER JOIN customer on transaction.customer_id == customer_id
-- WHERE

UPDATE transaction
SET transaction_date = "2024-10-9"
WHERE customer_id > 1;

SELECT sex as sex,count(sex) FROM transaction
INNER JOIN customer ON transaction.customer_id = customer.customer_id
WHERE product_id = 2
GROUP BY sex;

SELECT * FROM customer
INNER JOIN transaction ON customer.customer_id = transaction.customer_id
WHERE transaction_date = '2024-10-8';
--GROUP BY sex;--, transaction_date;

SELECT customer_id FROM transaction WHERE product_id = 2

SELECT sex As category, COUNT(*) AS count
FROM customer
GROUP BY sex
UNION ALL
SELECT race AS category, COUNT(*) AS count
FROM customer
GROUP BY race;

SELECT product.name, SUM(transaction.qty)
FROM product INNER JOIN transaction ON product.product_id = transaction.product_id
GROUP BY product.product_id


SELECT * FROM product
WHERE product_id LIKE '%query%' OR name LIKE '%query%'