USE `event-databases`;

-- Ajoutez les inserts pour initialiser les types d'événements

INSERT INTO `event_types` (id, libelle, avatarSrc, createdAt, updatedAt)
VALUES
  (1, 'Concert', 'concert.png', NOW(), NOW()),
  (2, 'Meeting', 'meeting.png', NOW(), NOW()),
  (3, 'Exposition', 'exposition.png', NOW(), NOW()),
  (4, 'Festival', 'festival.png', NOW(), NOW()),
  (5, 'Conférence', 'conference.png', NOW(), NOW()),
  (6, 'Spectacle', 'spectacle.png', NOW(), NOW()),
  (7, 'Sport', 'sport.png', NOW(), NOW()),
  (8, 'Cinéma', 'cinema.png', NOW(), NOW()),
  (9, 'Atelier', 'atelier.png', NOW(), NOW()),
  (10, 'Foire', 'foire.png', NOW(), NOW());