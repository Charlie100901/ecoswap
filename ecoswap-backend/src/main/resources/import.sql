
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('las gaviotas', 31221412, 'ruben@gmail.com', 'ruben castaño', '$2a$13$m/QSNMw.ByxHDsldjtsrSuSAqso6tc/Aal66eoAkc58YsxXbb7blm');
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('san jose', 4545, 'carlos@gmail.com', 'carlos de la rosa', '$2a$13$jxv0cSccbCbGx0MXGXcdJe7MaBhIwCR98qP39fc17kVO3eFqv7fRS');
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('simom bolivar', 31221412, 'jesus@gmail.com', 'jesus santana', '$2a$13$SX/Y0ryLLUJWvQBOt6Agd.CmtDFLwk2nXy2NElxwZrcxmkyFbqlsa');
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('el pozon', 4545, 'daniel@gmail.com', 'daniel', '$2a$13$JDAJvtPEM7cXoA3.LrZK6.sGdjoh8RKDzDXPKV9SVQmi0FL17P2qC');


INSERT INTO products(category, condition_product ,description, product_status, title, user_id, release_date, image_product) VALUES ('tecnologia','nuevo' , 'pc gamer', 'activo', 'pc gamer', 1, '2024-05-05', 'http://localhost:8080/images/pc-gamer.jpeg' );
INSERT INTO products(category, condition_product ,description, product_status, title, user_id, release_date, image_product) VALUES ('hogar', 'usado' ,'nochero', 'activo', 'nochero', 2, '2024-05-05', 'http://localhost:8080/images/nochero.jpg');
INSERT INTO products(category, condition_product ,description, product_status, title, user_id, release_date, image_product) VALUES ('tecnologia','usado' , 'monitor', 'activo', 'monitor', 3, '2024-05-05', 'http://localhost:8080/images/monitor.jpg');
INSERT INTO products(category, condition_product ,description, product_status, title, user_id, release_date, image_product) VALUES ('hogar', 'usado' ,'mesa', 'activo', 'mesa', 4, '2024-05-05', 'http://localhost:8080/images/mesa-gamer.jpg');

INSERT INTO roles(name) VALUES ('ADMIN');
INSERT INTO roles(name) VALUES ('USER');

INSERT INTO role_user(user_id, role_id) VALUES (1,1);
INSERT INTO role_user(user_id,  role_id) VALUES (2,2);
INSERT INTO role_user(user_id, role_id) VALUES (3,2);
INSERT INTO role_user(user_id,  role_id) VALUES (4,2);


