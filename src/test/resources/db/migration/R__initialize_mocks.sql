INSERT INTO bky_category (id, name)
VALUES
    (1, 'Épargne'),
    (2, 'Abonnement'),
    (3, 'Logement & Charges'),
    (4, 'Assurances'),
    (5, 'Culture & Sport'),
    (6, 'Voyages'),
    (7, 'Santé & Bien-être'),
    (8, 'Vêtements'),
    (9, 'Divers'),
    (10, 'Alimentaire'),
    (11, 'Impôts & Amendes'),
    (12, 'Revenus'),
    (13, 'Frais Bancaires'),
    (14, 'Voiture & Vélo')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO bky_sub_category (id, name, category_id)
VALUES
    (1, 'Abondement', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (2, 'Abonnement Internet', (SELECT id FROM bky_category WHERE name = 'Abonnement')),
    (3, 'Abonnement Téléphone', (SELECT id FROM bky_category WHERE name = 'Abonnement')),
    (4, 'Abonnement Netflix', (SELECT id FROM bky_category WHERE name = 'Abonnement')),
    (5, 'Abonnement électricité', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (6, 'Accidents de la Vie', (SELECT id FROM bky_category WHERE name = 'Assurances')),
    (7, 'Achat Appartement', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (8, 'Adhésions', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (9, 'Assurance santé', (SELECT id FROM bky_category WHERE name = 'Assurances')),
    (10, 'Assurance habitation', (SELECT id FROM bky_category WHERE name = 'Assurances')),
    (11, 'Avion', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (12, 'Bijoux', (SELECT id FROM bky_category WHERE name = 'Santé & Bien-être')),
    (13, 'Cadeaux & Dons', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (14, 'Chaussures', (SELECT id FROM bky_category WHERE name = 'Vêtements')),
    (15, 'Compte Courant', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (16, 'Courrier', (SELECT id FROM bky_category WHERE name = 'Divers')),
    (17, 'Cinéma', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (18, 'Coiffeur', (SELECT id FROM bky_category WHERE name = 'Santé & Bien-être')),
    (19, 'Course', (SELECT id FROM bky_category WHERE name = 'Alimentaire')),
    (20, 'Divers', (SELECT id FROM bky_category WHERE name = 'Divers')),
    (21, 'Dividendes', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (22, 'Électroménager', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (23, 'Équilibrage', (SELECT id FROM bky_category WHERE name = 'Divers')),
    (24, 'Hôtel', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (25, 'Informatique', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (26, 'Impôts', (SELECT id FROM bky_category WHERE name = 'Impôts & Amendes')),
    (27, 'Intérêts', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (28, 'Jeux Vidéos', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (29, 'Loisir', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (30, 'Livres', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (31, 'Livret A', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (32, 'Livret Jeune', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (33, 'Linxea Avenir 2', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (34, 'Linxea Spirit 2', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (35, 'LLDS', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (36, 'PEA', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (37, 'Loyer', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (38, 'Médecin', (SELECT id FROM bky_category WHERE name = 'Santé & Bien-être')),
    (39, 'Médicaments', (SELECT id FROM bky_category WHERE name = 'Santé & Bien-être')),
    (40, 'Meubles & Mobilier', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (41, 'Musée & simili', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (42, 'Musique', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (43, 'Navigo', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (44, 'Notes de Frais', (SELECT id FROM bky_category WHERE name = 'Revenus')),
    (45, 'Nourriture', (SELECT id FROM bky_category WHERE name = 'Alimentaire')),
    (46, 'Ouverture Compte', (SELECT id FROM bky_category WHERE name = 'Frais Bancaires')),
    (47, 'Parking', (SELECT id FROM bky_category WHERE name = 'Voiture & Vélo')),
    (48, 'Péage', (SELECT id FROM bky_category WHERE name = 'Voiture & Vélo')),
    (49, 'Pharmacie', (SELECT id FROM bky_category WHERE name = 'Santé & Bien-être')),
    (50, 'PV Stationnement', (SELECT id FROM bky_category WHERE name = 'Impôts & Amendes')),
    (51, 'PV Transports', (SELECT id FROM bky_category WHERE name = 'Impôts & Amendes')),
    (52, 'Remboursement', (SELECT id FROM bky_category WHERE name = 'Divers')),
    (53, 'Repas', (SELECT id FROM bky_category WHERE name = 'Alimentaire')),
    (54, 'Restaurant & Bar', (SELECT id FROM bky_category WHERE name = 'Alimentaire')),
    (55, 'Retrait ATM', (SELECT id FROM bky_category WHERE name = 'Divers')),
    (56, 'Salaire', (SELECT id FROM bky_category WHERE name = 'Revenus')),
    (57, 'Soirée', (SELECT id FROM bky_category WHERE name = 'Alimentaire')),
    (58, 'Spectacle', (SELECT id FROM bky_category WHERE name = 'Culture & Sport')),
    (59, 'Taxe d habitation & Redevance audio-visuelle', (SELECT id FROM bky_category WHERE name = 'Impôts & Amendes')),
    (60, 'Taxe foncière & Enlèvement Ordures', (SELECT id FROM bky_category WHERE name = 'Impôts & Amendes')),
    (61, 'Tenue de Compte', (SELECT id FROM bky_category WHERE name = 'Frais Bancaires')),
    (62, 'Ticket Restaurant', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (63, 'Train', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (64, 'Transports en commun', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (65, 'Travaux', (SELECT id FROM bky_category WHERE name = 'Logement & Charges')),
    (66, 'Vêtements', (SELECT id FROM bky_category WHERE name = 'Vêtements')),
    (67, 'Vente', (SELECT id FROM bky_category WHERE name = 'Revenus')),
    (68, 'Virement', (SELECT id FROM bky_category WHERE name = 'Épargne')),
    (69, 'Voiture', (SELECT id FROM bky_category WHERE name = 'Voyages')),
    (70, 'Vélo', (SELECT id FROM bky_category WHERE name = 'Voyages'))
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO bky_accounts (id, name, short_name, color, initial_amount, type)
VALUES (1, 'Crédit Agricole', 'CA', '008A91', 1000.00, 'CHECKING'),
       (2, 'Portefeuille', 'PF', '000000', 0.00, 'CHECKING'),
       (3, 'Ticket Restaurant', 'TR', 'FF6200', 0.00, 'CHECKING'),
       (4, 'Carte Cadeaux', 'CC', 'E2010F', 0.00, 'CHECKING'),
       (5, 'Fortuneo', 'FTO', '5865F2', 0.00, 'CHECKING'),
       (6, 'Livret A', 'LA', '1E90FF', 500.00, 'SAVINGS'),
       (7, 'Livret Jeune', 'LJ', '32CD32', 0.00, 'SAVINGS'),
       (8, 'Linxea Avenir 2', 'LA2', 'FFA500', 0.00, 'MARKET'),
       (9, 'Linxea Spirit 2', 'LS2', 'FF1493', 0.00, 'MARKET'),
       (10, 'LLDS', 'LDS', '8B0000', 0.00, 'SAVINGS'),
       (11, 'PEA', 'PEA', '4682B4', 0.00, 'MARKET'),
       (12, 'CTO', 'CTO', '4682B4', 0.00, 'MARKET');

-- Test data for DashboardTest
-- DEBIT transactions for account ID 1 (Crédit Agricole)
INSERT INTO bky_transactions (id, account_id, amount, comment, date, in_bank_date, side, sub_category_id, from_to_person_name)
VALUES 
    (1001, 1, 100.00, 'Debit Transaction 1', '2025-01-01', '2025-01-02', 'DEBIT', 20, ''),
    (1002, 1, 50.25, 'Debit Transaction 2', '2025-01-05', '2025-01-06', 'DEBIT', 20, ''),
    (1003, 1, 75.50, 'Debit Transaction 3', '2025-01-10', '2025-01-11', 'DEBIT', 20, ''),
    (1004, 1, 200.00, 'Debit Transaction 4', '2025-01-15', null, 'DEBIT', 20, ''),
    (1005, 1, 125.75, 'Debit Transaction 5', '2025-01-20', '2025-01-21', 'DEBIT', 20, '');

-- CREDIT transactions for account ID 1 (Crédit Agricole)
INSERT INTO bky_transactions (id, account_id, amount, comment, date, in_bank_date, side, sub_category_id, from_to_person_name)
VALUES 
    (1006, 1, 1000.00, 'Credit Transaction 1', '2025-01-02', '2025-01-03', 'CREDIT', 56, ''),
    (1007, 1, 200.50, 'Credit Transaction 2', '2025-01-07', '2025-01-08', 'CREDIT', 56, ''),
    (1008, 1, 150.25, 'Credit Transaction 3', '2025-01-12', '2025-01-13', 'CREDIT', 56, ''),
    (1009, 1, 300.00, 'Credit Transaction 4', '2025-01-17', '2025-01-18', 'CREDIT', 56, ''),
    (1010, 1, 250.75, 'Credit Transaction 5', '2025-01-22', '2025-01-23', 'CREDIT', 56, ''),
    (1011, 1, 175.50, 'Credit Transaction 6', '2025-01-27', null, 'CREDIT', 56, ''),
    (1012, 1, 225.25, 'Credit Transaction 7', '2025-02-01', '2025-02-02', 'CREDIT', 56, ''),
    (1013, 1, 190.00, 'Credit Transaction 8', '2025-02-06', '2025-02-07', 'CREDIT', 56, ''),
    (1014, 1, 215.50, 'Credit Transaction 9', '2025-02-11', '2025-02-12', 'CREDIT', 56, ''),
    (1015, 1, 280.25, 'Credit Transaction 10', '2025-02-16', '2025-02-17', 'CREDIT', 56, ''),
    (1016, 1, 195.75, 'Credit Transaction 11', '2025-02-21', '2025-02-22', 'CREDIT', 56, ''),
    (1017, 1, 210.50, 'Credit Transaction 12', '2025-02-26', null, 'CREDIT', 56, ''),
    (1018, 1, 230.00, 'Credit Transaction 13', '2025-03-03', '2025-03-04', 'CREDIT', 56, ''),
    (1019, 1, 205.25, 'Credit Transaction 14', '2025-03-08', '2025-03-09', 'CREDIT', 56, ''),
    (1020, 1, 270.50, 'Credit Transaction 15', '2025-03-13', '2025-03-14', 'CREDIT', 56, '');

-- DEBIT transaction for account ID 6 (Livret A)
INSERT INTO bky_transactions (id, account_id, amount, comment, date, in_bank_date, side, sub_category_id, from_to_person_name)
VALUES 
    (1021, 6, 50.00, 'Debit Transaction Livret A', '2025-01-25', '2025-01-26', 'DEBIT', 20, '');

-- Transfers from account ID 1 to account ID 6
INSERT INTO bky_transfert (id, from_account_id, to_account_id, amount, date)
VALUES 
    (101, 1, 6, 100.00, '2025-01-05'),
    (102, 1, 6, 150.00, '2025-01-15'),
    (103, 1, 6, 200.00, '2025-01-25'),
    (104, 1, 6, 120.00, '2025-02-05'),
    (105, 1, 6, 180.00, '2025-02-15'),
    (106, 1, 6, 250.00, '2025-02-25'),
    (107, 6, 1, 75.00, '2025-02-25');