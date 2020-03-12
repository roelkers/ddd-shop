DROP TABLE IF EXISTS order CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS manufacturer CASCADE;
DROP TABLE IF EXISTS order_product CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS shipment CASCADE; 
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS stock CASCADE;

CREATE TABLE customer (
    id serial PRIMARY KEY ,
    name text NOT NULL
);

CREATE TABLE orders (
    customer_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(id), 
    id serial PRIMARY KEY ,
    creation_date DATE NOT NULL 
);

CREATE TABLE manufacturer (
    id serial PRIMARY KEY ,
    name text NOT NULL
);

CREATE TABLE product (
    id serial PRIMARY KEY ,
    price money NOT NULL,
    name text NOT NULL,
    manufacturer_id INTEGER NOT NULL,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturer(id)
);

CREATE TABLE order_product (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE shipment (
    id serial PRIMARY KEY,
    fulfillment_date date NOT NULL, 
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE stock (
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ,
    quantity int NOT NULL
)
