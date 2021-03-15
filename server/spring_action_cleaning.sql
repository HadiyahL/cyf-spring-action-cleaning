ALTER TABLE if exists customers DROP COLUMN if exists main_branch_id;
drop table if exists jobs;
drop table if exists branches;
drop table if exists workers;
drop table if exists customers;

CREATE TABLE workers (
  id                    SERIAL PRIMARY KEY,
  name                  VARCHAR(100) NOT NULL,
  address               VARCHAR(100) NOT NULL,
  email                 VARCHAR(60) NOT NULL UNIQUE,
  phone_number          VARCHAR(50) NOT NULL,
  whatsapp              VARCHAR(50) NOT NULL,
  permanent_contract    BOOLEAN NOT NULL,
  languages             VARCHAR(50) DEFAULT '',
  archived              BOOLEAN DEFAULT FALSE
);

CREATE TABLE customers (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(60) NOT NULL,
  phone_number    VARCHAR(50) NOT NULL,
  contact_name    VARCHAR(100) NOT NULL,
  archived        BOOLEAN DEFAULT FALSE
);

CREATE TABLE branches (
  id              SERIAL PRIMARY KEY,
  address         VARCHAR(100) NOT NULL,
  contact_name    VARCHAR(100) NOT NULL,
  contact_phone   VARCHAR(50) NOT NULL,
  details         VARCHAR(250) DEFAULT '',
  customer_id     INT REFERENCES customers(id),
  worker_id       INT REFERENCES workers(id),
  visit_time      TIME,
  duration        INT NOT NULL DEFAULT 1
);

ALTER TABLE customers ADD COLUMN main_branch_id INT REFERENCES branches(id);

CREATE TABLE jobs (
  unit_price           FLOAT NOT NULL,
);

insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Kathe Henniger', 'khenniger0@mayoclinic.com', '01482-822945', '34409 La Follette Pass', '852-452-4383', false, 'French');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Codie Bamfield', 'worker@dot.com', '01439-292569', '4 Continental Lane', '144-207-5560', true, 'French');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Marrilee MacCole', 'mmaccole2@rakuten.co.jp', '01536-339567', '87 John Wall Road', '207-855-1099', false, 'English');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Marylou Alltimes', 'malltimes3@mac.com', '01320-784607', '7245 Beilfuss Road', '479-778-2850', true, 'English, French');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Doralynne Harrad', 'dharrad4@netscape.com', '01622-060686', '43 Birchwood Circle', '405-368-4404', false, 'Hindi');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract, languages) values ('Jeanelle Faragan', 'jfaragan5@bigcartel.com', '01260-379573', '9 Blackbird Alley', '138-391-3086', true, 'Arabic');
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract) values ('Klement Criple', 'kcriple6@ycombinator.com', '01942-002359', '38 Talmadge Way', '242-778-2477', false);
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract) values ('Fara Pettyfer', 'fpettyfer7@businessinsider.com', '01253-282148', '4048 Heffernan Road', '565-970-1133', false);
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract) values ('Haroun Croci', 'hcroci8@ustream.tv', '01833-827387', '542 Huxley Crossing', '729-529-3467', true);
insert into workers (name, email, phone_number , address, whatsapp, permanent_contract) values ('Meryl Windrass', 'mwindrass9@ustream.tv', '07516-351366', '235 Susan Point', '864-737-0454', false);

insert into customers (name, email, phone_number, contact_name ) values ('Kwinu', 'vcassam0@umn.edu', '01837-339296', 'Keely Ross');
insert into customers (name, email, phone_number, contact_name ) values ('Thoughtbeat', 'mdeandisie1@g.co', '01747-934670', 'Billy Fields');
insert into customers (name, email, phone_number, contact_name ) values ('Latz', 'rnapolione2@mozilla.com', '02881-885056', 'Jordan Patton');
insert into customers (name, email, phone_number, contact_name ) values ('Jayo', 'hhowselee3@omniture.com', '01988-301630', 'Cristofer Mathews');
insert into customers (name, email, phone_number, contact_name ) values ('Jaxspan', 'agoodman4@yahoo.co.jp', '01773-655113', 'Dayami Curry');
insert into customers (name, email, phone_number, contact_name ) values ('Avamm', 'dpapps5@seattletimes.com', '01752-246276', 'Shea Lutz');
insert into customers (name, email, phone_number, contact_name ) values ('Jabbersphere', 'ghaselhurst6@networkadvertising.org', '07861-725864', 'Karley Larson');
insert into customers (name, email, phone_number, contact_name ) values ('Realblab', 'rtemblett7@uol.com.br', '07864-444105', 'Dawson Booker');
insert into customers (name, email, phone_number, contact_name ) values ('Flipbug', 'ebrou8@imageshack.us', '07710-846296', 'Cheyanne Sheppard');
insert into customers (name, email, phone_number, contact_name ) values ('Zooveo', 'dpittel9@amazon.de', '07640-123068', 'Genesis Gillespie');

insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Gan Clerc', '9404 Manley Lane', '07406-490770', 1, 1, '15:20', 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Israel Devericks', '88 Eliot Avenue', '07549-792459', 2, 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Cecily Eastment', '2139 Monument Center', '07771-332310', 3, 3);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Tim Portman', '539 Schurz Parkway', '07440-639613', 4, 4, '12:20', 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Kylen Landy', '9845 Mccormick Terrace', '07805-965227', 5, 5);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Kelcey Chastenet', '94199 Westport Avenue', '07398-583491', 6, 6, '13:20', 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Jermayne Tumility', '38022 Straubel Way', '07440-229821', 7, 7);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Pearl Ksandra', '28996 Sunfield Pass', '07643-338171', 8, 8);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Donielle Bondar', '29950 Karstens Lane', '07377-402432', 9, 9, '07:20', 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Phebe Brussell', '3666 Menomonie Drive', '07778-146012', 10, 10);

insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Amos Cavy', '98017 Westport Drive', '07458-023982', 1, 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Sephira Varran', '6 Buhler Pass', '07978-922245', 2, 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Josey Boseley', '221 Meadow Ridge Street', '07561-137365', 3, 3, '07:20', 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Cosimo Norvel', '8 Starling Hill', '07941-536949', 4, 4);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Annalee MacBrearty', '7 Hoepker Crossing', '07669-247252', 5, 5, '07:20', 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Cass Conradsen', '73 Towne Drive', '07874-386408', 6, 6);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Jerry Vose', '4 Novick Junction', '07644-579602', 7, 7, '08:20', 3);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Drucill Aickin', '14 Wayridge Pass', '07951-926449', 8, 8);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Mirelle Girodin', '73412 Fieldstone Trail', '07520-328673', 9, 9);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Rubia Masselin', '938 Garrison Parkway', '07773-043447', 10, 10, '09:20', 2);

insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Darcie Morkham', '3 Prairieview Way', '07522-263449', 1, 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Hatty Roon', '0299 La Follette Trail', '07749-848645', 2, 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Kendall Brotheridge', '40494 Mayfield Road', '07419-764939', 3, 3);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Maurie Males', '44145 Bartelt Alley', '07760-431299', 4, 4);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id, visit_time, duration) values ('Ermanno Eliff', '723 Eggendart Road', '07893-860394', 5, 5, '07:20', 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Kalina Sahnow', '255 Merchant Pass', '07589-377741', 6, 6);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Misty MacPaden', '25365 Comanche Street', '07666-218003', 7, 7);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Lenci Grayne', '70 Weeping Birch Plaza', '07520-397844', 1, 1);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Horatio Mascall', '590 Schurz Place', '07949-594898', 2, 2);
insert into branches (contact_name, address, contact_phone, customer_id, worker_id) values ('Haley Beldan', '757 Mayfield Court', '07880-210207', 3, 3);

UPDATE customers SET main_branch_id=1 WHERE id=1;
UPDATE customers SET main_branch_id=2 WHERE id=2;
UPDATE customers SET main_branch_id=3 WHERE id=3;
UPDATE customers SET main_branch_id=4 WHERE id=4;
UPDATE customers SET main_branch_id=5 WHERE id=5;
UPDATE customers SET main_branch_id=6 WHERE id=6;
UPDATE customers SET main_branch_id=7 WHERE id=7;
UPDATE customers SET main_branch_id=8 WHERE id=8;
UPDATE customers SET main_branch_id=9 WHERE id=9;
UPDATE customers SET main_branch_id=10 WHERE id=10;

insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2020-12-09', 1, 1, 1, '2021-02-21', '15:20', 10, 1);
insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2020-12-09', 2, 22, 2, '2021-02-26', '12:10', 10, 3);
insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2021-01-15', 2, 2, 2, '2021-03-08', '10:00', 10, 1);
insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2021-01-15', 3, 23, 2, '2021-03-04', '12:45', 10, 1);
insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2020-12-09', 3, 3, 7, '2021-03-12', '15:20', 10.5, 2);
insert into jobs (date_created, customer_id, branch_id , worker_id, visit_on, visit_time, unit_price, duration) values ('2020-12-09', 4, 4, 3, '2021-03-02', '15:20', 10.5, 2);
