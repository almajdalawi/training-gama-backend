DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bank_account;


CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    bank_account_id INTEGER,
);

CREATE TABLE IF NOT EXISTS bank_account (
    id SERIAL PRIMARY KEY,
    cash_balance INTEGER,
    credit_balance INTEGER,
);