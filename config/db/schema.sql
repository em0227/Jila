
DROP DATABASE IF EXISTS jila;
CREATE DATABASE jila;

\c jila;

DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets(
    id VARCHAR PRIMARY KEY NOT NULL,
    created_by VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    status VARCHAR NOT NULL,
    created TIMESTAMP NOT NULL,
    updated_by VARCHAR,
    updated TIMESTAMP
);

INSERT into tickets(id, created_by, email, title, description, status, created) 
VALUES('1', 'emily', 'emily@test.com', 'need reset password', 'forgot password need reset link', 'new', NOW());

CREATE TABLE replies(
    id VARCHAR PRIMARY KEY NOT NULL,
    ticket_id VARCHAR NOT NULL,
    response TEXT NOT NULL,
    created_by VARCHAR NOT NULL,
    created TIMESTAMP NOT NULL,
    CONSTRAINT fk_ticket_id FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

INSERT into replies(id, ticket_id, created_by, response, created) 
VALUES('1', '1', 'admin', 'solved', NOW())