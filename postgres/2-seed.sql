TRUNCATE TABLE orders, manufacturer, order_product, product, shipment, customer, stock;
ALTER SEQUENCE customer_id_seq RESTART WITH 1; 
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE product_id_seq RESTART WITH 1;
ALTER SEQUENCE manufacturer_id_seq RESTART WITH 1; 
ALTER SEQUENCE shipment_id_seq RESTART WITH 1;

INSERT INTO customer(name) VALUES 
        ('Mike'),
        ('Joe'),
        ('Erica')
;

SELECT * FROM customer;

INSERT INTO orders(customer_id, creation_date) VALUES 
        ( 1, '2020-01-01' ),
        ( 2, '2020-01-02' ),
        ( 3, '2020-01-07' )
;

INSERT INTO manufacturer(name) VALUES
        ( 'Behringer' ),
        ( 'Yamaha' ),
        ( 'Roland' )
;

INSERT INTO product(price, name, manufacturer_id) VALUES 
        ( 700.00, 'Deepmind 12', 1 ),
        ( 329.00, 'Reface CS' , 2),
        ( 599.00, 'TR-8S', 3)
;

INSERT INTO order_product (order_id, product_id) VALUES 
        ( 1, 1 ),
        ( 2, 2 ),
        ( 3, 3 )
;

INSERT INTO stock (product_id, quantity) VALUES
        (1, 5),
        (2, 10),
        (3, 4)
;

