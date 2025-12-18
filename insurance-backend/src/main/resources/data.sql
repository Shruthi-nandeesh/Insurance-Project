-- ======================
-- ROLES
-- ======================
INSERT INTO roles (id, name)
VALUES 
(1, 'ADMIN'),
(2, 'AGENT'),
(3, 'CUSTOMER');

-- ======================
-- USERS
-- User.password = BCrypt hashes
-- user_id = business id, not primary key
-- ======================
INSERT INTO users (
    id, user_id, full_name, email, password, phone, street, city, state, zip_code,
    date_of_birth, gender, profile_image_url, status, created_at
) VALUES
(
  1, 'USR1001', 'Shruthi', 'admin@insure.com',
  '$2a$10$gq8wH1f1cW9PqE6XwNlZkOMk/xkQX5r3F7gIfI4S8ed9hRz9JxGKS',
  '9999999999', 'MG Road', 'Bangalore', 'KA', '560001',
  '1999-01-01', 'Female', NULL, 'ACTIVE', NOW()
),
(
  2, 'USR1002', 'Agent One', 'agent1@insure.com',
  '$2a$10$3eTq7rlKkEo3Y9vLcJGEHe3h7b8XJ0H9yGkHk2zu1u8tQ8pZMTT1C',
  '9888888888', 'JP Nagar', 'Bangalore', 'KA', '560078',
  '1995-04-10', 'Male', NULL, 'ACTIVE', NOW()
),
(
  3, 'USR1003', 'Customer One', 'customer1@insure.com',
  '$2a$10$Dq4F8Ce0UvtmH2kE/6Ju6e0vaymYFmD7xQ3DBKk6HSpZ8Fz1uOj6O',
  '9777777777', 'Indiranagar', 'Bangalore', 'KA', '560038',
  '1998-09-22', 'Male', NULL, 'ACTIVE', NOW()
);

-- ======================
-- USER ROLES
-- ======================
INSERT INTO user_roles (user_id_fk, role_id_fk)
VALUES 
(1, 1),  -- Shruthi -> ADMIN
(2, 2),  -- Agent -> AGENT
(3, 3);  -- Customer -> CUSTOMER


-- ======================
-- INSURANCE TYPES
-- ======================
INSERT INTO insurance_types (id, name, description)
VALUES
(1, 'Life', 'Life insurance'),
(2, 'Health', 'Health insurance');


-- ======================
-- POLICIES
-- ======================
INSERT INTO policies (
  id, policy_number, start_date, end_date, premium_amount, coverage_amount,
  type_id, user_id
) VALUES
(
  1, 'POL1001', '2024-01-01', '2025-01-01',
  2500, 100000, 1, 3
),
(
  2, 'POL1002', '2024-03-10', '2025-03-10',
  1800, 50000, 2, 3
);

-- ======================
-- BENEFICIARIES
-- ======================
INSERT INTO beneficiaries (id, beneficiary_name, relationship, share_percentage, policy_id)
VALUES
(1, 'Ravi', 'Father', 60, 1),
(2, 'Meena', 'Mother', 40, 1);


-- ======================
-- CLAIMS
-- ======================
INSERT INTO claims (
  id, claim_number, claim_date, claim_amount, status, description, policy_id
) VALUES
(
  1, 'CLM9001', '2024-02-20', 15000, 'APPROVED', 'Surgery', 2
),
(
  2, 'CLM9002', '2024-04-15', 8000, 'PENDING', 'Accident', 1
);

-- ======================
-- PAYMENTS
-- ======================
INSERT INTO payments (
  id, amount, method, transaction_id, status, payment_time, policy_id, user_id
) VALUES
(
  1, 2500, 'CASH', 'TXN1', 'SUCCESS', '2024-03-01 10:00:00', 1, 3
);


-- ======================
-- AUDIT LOGS
-- ======================
INSERT INTO audit_logs (id, action, timestamp, user_id, details)
VALUES
(1, 'ADMIN_CREATED', '2024-01-01 10:00:00', 1, 'Seed data created');
