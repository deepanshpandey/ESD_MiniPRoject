create table department
(
    id       bigint auto_increment
        primary key,
    capacity int          not null,
    name     varchar(255) null
);

create table employee
(
    id            bigint auto_increment
        primary key,
    employee_id   varchar(255) not null,
    first_name    varchar(255) null,
    last_name     varchar(255) null,
    department_id bigint       null,
    title         varchar(255) null,
    photo_path    varchar(255) null,
    constraint employee_id
        unique (employee_id),
    constraint FKbejtwvg9bxus2mffsm3swj3u9
        foreign key (department_id) references department (id)
);

create table user
(
    id       bigint auto_increment
        primary key,
    password varchar(255) not null,
    role     varchar(255) not null,
    username varchar(255) not null,
    constraint UKsb8bbouer5wak8vyiiy4pf2bx
        unique (username)
);


