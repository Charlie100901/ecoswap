
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('las gaviotas', 31221412, 'ruben@gmail.com', 'ruben castaño', 'ruben');
INSERT INTO users(address, cellphone_number, email, name, password) VALUES ('san jose', 4545, 'carlos@gmail.com', 'carlos de la rosa', 'carlos');


INSERT INTO products(category, condition_product ,description, product_status, title, user_id) VALUES ('tecnologia','nuevo' , 'pc gamer', 'activo', 'pc gamer', 1);
INSERT INTO products(category, condition_product ,description, product_status, title, user_id) VALUES ('hogar', 'usado' ,'nochero', 'activo', 'nochero', 2);

INSERT INTO roles(name) VALUES ('ADMIN');
INSERT INTO roles(name) VALUES ('USER');

INSERT INTO role_user(user_id, role_id) VALUES (1,1);
INSERT INTO role_user(user_id,  role_id) VALUES (2,2);
