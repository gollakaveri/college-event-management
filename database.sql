CREATE DATABASE IF NOT EXISTS college;
USE college;
CREATE TABLE IF NOT EXISTS events (
  event_id INT NOT NULL PRIMARY KEY,
  event_name VARCHAR(150) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  venue VARCHAR(150) NOT NULL,
  description TEXT NULL
);
-- Optional test row:
-- INSERT INTO events(event_id,event_name,event_type,event_date,venue,description)
-- VALUES (1,'Tech Fest','Technical','2026-11-15','Main Auditorium','Annual college technology festival');
