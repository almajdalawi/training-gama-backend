DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS bank_account;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
);

CREATE TABLE IF NOT EXISTS bank_account (
    id SERIAL PRIMARY KEY,
    cash_balance INTEGER,
    credit_balance INTEGER,
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,eslintignore
    bank_account_id FOREIGN KEY REFERENCES bank_account(id),
    name VARCHAR(255),
);
