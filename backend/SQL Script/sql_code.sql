USE Ethnicity_Detection_Model;

CREATE TABLE customer_transaction (
    customer_id INT AUTO_INCREMENT NOT NULL,
    sex VARCHAR(255),
    age INT,
    race VARCHAR(255),
    PRIMARY KEY (customer_id)
);

CREATE TABLE product (
    product_id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    price FLOAT,
    detail VARCHAR(255),
    product_img LONGBLOB
);

CREATE TABLE transaction (
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT,
    transaction_date date,
    PRIMARY KEY (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES customer_transaction(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- test data part
-- table product
USE Ethnicity_Detection_Model;

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