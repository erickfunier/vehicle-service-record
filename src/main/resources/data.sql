INSERT INTO user(name, email, pass) VALUES('User', 'user@email.com', '$2a$10$sFKmbxbG4ryhwPNx/l3pgOJSt.fW1z6YcUnuE2X8APA/Z3NI/oSpq');
INSERT INTO user(name, email, pass) VALUES('Moderador', 'moderador@email.com', '$2a$10$sFKmbxbG4ryhwPNx/l3pgOJSt.fW1z6YcUnuE2X8APA/Z3NI/oSpq');

INSERT INTO profile(id, name) VALUES(1, 'ROLE_USER');
INSERT INTO profile(id, name) VALUES(2, 'ROLE_MODERADOR');

INSERT INTO user_profiles(user_id, profiles_id) VALUES(1, 1);
INSERT INTO user_profiles(user_id, profiles_id) VALUES(2, 2);

INSERT INTO make(id, name) VALUES(1, 'Chevrolet');
INSERT INTO make(id, name) VALUES(2, 'Honda');

INSERT INTO model(id, make_id, name, year) VALUES(1, 1, 'Corsa', 1999);
INSERT INTO model(id, make_id, name, year) VALUES(2, 2, 'Civic', 2000);

INSERT INTO vehicle(name, make_id, model_id, created_date, status) VALUES('Carro 1', 1, 1, '2022-09-16 10:00:00', 'ACTIVE');
INSERT INTO vehicle(name, make_id, model_id, created_date, status) VALUES('Carro 2', 2, 2, '2022-09-16 10:00:00', 'ACTIVE');
INSERT INTO vehicle(name, make_id, model_id, created_date, status) VALUES('Carro 3', 1, 1, '2022-09-16 10:00:00', 'ACTIVE');

INSERT INTO service(id, name, description, vehicle_id, created_date) VALUES(1, 'Oil Change', 'Full Motor Oil Change', 1, '2022-09-16 10:00:00');
INSERT INTO service(id, name, description, vehicle_id, created_date) VALUES(2, 'Oil Change', 'Full Motor Oil Change', 2, '2022-09-16 10:00:00');
INSERT INTO service(id, name, description, vehicle_id, created_date) VALUES(3, 'Filter Change', 'All filters changed', 2, '2022-09-16 10:00:00');
INSERT INTO service(id, name, description, vehicle_id, created_date) VALUES(4, 'Filter Change', 'All filters changed', 3, '2022-09-16 10:00:00');
INSERT INTO service(id, name, description, vehicle_id, created_date) VALUES(5, 'Filter Change', 'All filters changed', 1, '2022-09-16 10:00:00');
