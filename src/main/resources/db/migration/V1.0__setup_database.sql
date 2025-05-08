-- Create `accounts` table
CREATE TABLE bky_accounts
(
    id             bigint(11) PRIMARY KEY,
    name           VARCHAR(255)   NOT NULL,
    short_name     VARCHAR(3)     NOT NULL,
    color          VARCHAR(6)     NOT NULL,
    initial_amount DECIMAL(15, 2) NOT NULL,
    type           varchar(255)   NOT NULL -- SAVING, CHECKING, MARKET
);

-- Create `category` table
CREATE TABLE bky_category
(
    id              bigint(11) PRIMARY KEY,
    name            VARCHAR(255)   NOT NULL,
    budgeted_amount DECIMAL(15, 3) NOT NULL
);

-- Create `sub_category` table
CREATE TABLE bky_sub_category
(
    id          bigint(11) PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    category_id bigint(11) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES bky_category (id)
);

-- Create `ticker` table
CREATE TABLE bky_ticker
(
    id         bigint(11) PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    short_name VARCHAR(50)  NOT NULL,
    category   VARCHAR(255) NOT NULL -- capitalizing, non-capitalizing, guaranteed, blocked-guaranteed
);

-- Create `transfert` table
CREATE TABLE bky_transfert
(
    id              bigint(11) PRIMARY KEY,
    from_account_id bigint(11),
    to_account_id   bigint(11),
    amount          DECIMAL(15, 3) NOT NULL,
    date            DATE           NOT NULL,
    FOREIGN KEY (from_account_id) REFERENCES bky_accounts (id),
    FOREIGN KEY (to_account_id) REFERENCES bky_accounts (id)
);

-- Create `transactions` table
CREATE TABLE bky_transactions
(
    id                  bigint(11) PRIMARY KEY,
    date                DATE           NOT NULL,
    in_bank_date        DATE NULL,
    amount              DECIMAL(15, 3) NOT NULL,
    account_id          bigint(11) NOT NULL,
    from_to_person_name VARCHAR(255)   NOT NULL,
    sub_category_id     bigint(11) NOT NULL,
    comment             VARCHAR(255) NULL,
    tag                 VARCHAR(255) NULL,
    side                VARCHAR(255)   NOT NULL, -- DEBIT OR CREDIT
    FOREIGN KEY (account_id) REFERENCES bky_accounts (id),
    FOREIGN KEY (sub_category_id) REFERENCES bky_sub_category (id),
    CHECK (amount >= 0)
);

-- Create `orders` table
CREATE TABLE bky_orders
(
    id         bigint(11) PRIMARY KEY,
    date       DATE           NOT NULL,
    amount     DECIMAL(15, 3) NOT NULL,
    quantity   INT            NOT NULL,
    charges    DECIMAL(15, 3) NOT NULL,
    account_id bigint(11) NOT NULL,
    ticker_id  bigint(11) NOT NULL,
    side       VARCHAR(255), -- BUY OR SELL
    FOREIGN KEY (account_id) REFERENCES bky_accounts (id),
    FOREIGN KEY (ticker_id) REFERENCES bky_ticker (id)
);
