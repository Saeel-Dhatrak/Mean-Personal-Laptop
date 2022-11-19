create database mystore;

use mystore;


create table user(
	id integer PRIMARY KEY auto_increment,
    firstName varchar(100),
    lastName varchar(100),
    address varchar(100),
    city varchar(100),
    country varchar(100),
    zip varchar(100),
    phone varchar(100),
    email varchar(100),
    password varchar(100),
    createdOn timestamp default current_timestamp,
    active integer default 1
    );


create table admin(
	id integer PRIMARY KEY auto_increment,
    firstName varchar(100),
    lastName varchar(100),
    phone varchar(100),
    email varchar(100),
    password varchar(100),
    createdOn timestamp default current_timestamp,
    active integer default 1
);
    
    desc user;
    
    create table category(
    id integer PRIMARY KEY auto_increment,
    title varchar(50),
    description varchar(200),
    createdOn timestamp default current_timestamp
    );
    desc category;
    
    create table brand(
    id integer PRIMARY KEY auto_increment,
    title varchar(100),
    description varchar(200),
    createdOn timestamp default current_timestamp
    );
    desc brand;
    
    create table product(
    id integer PRIMARY KEY auto_increment,
    title varchar(100),
    description varchar(10000),
    category integer,
    price decimal,
    brand integer,
    image varchar(100),
    createdOn timestamp default current_timestamp
    );



    alter table product add column isActive INTEGER DEFAULT 1;
    
    desc product;
    
    create table userOrder (
	id integer PRIMARY KEY auto_increment,
	userId integer,
	totalAmount decimal,
    tax varchar(10),
    paymentType varchar(10),
    paymentStatus varchar(10),
	deliveryStatus varchar(10),
	createdOn timestamp default current_timestamp
	);

    
    create table orderDetails (
	id integer PRIMARY KEY auto_increment,
	orderId integer,
	productId integer,
    price decimal,
    quantity integer,
    totalAmount decimal,
	createdOn timestamp default current_timestamp
	);
    
	create table productReviews(
    id integer PRIMARY KEY auto_increment,
    review varchar(1000),
    userId integer,
    productId integer,
    rating decimal,
    createdOn timestamp default current_timestamp
    );
     drop table productReviews;
    desc productReviews;

    insert into productreviews (review, userId, productId, rating) values ('This is a worst product ever seen', 2, 1, 2);
    insert into productreviews (review, userId, productId, rating) values ('This is a nice product1', 1, 1, 4);
    
		