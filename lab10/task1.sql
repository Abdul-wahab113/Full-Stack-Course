-- Task 1: PostgreSQL installation and SQL
SELECT version();

-- Run the next line from the default "postgres" database, then connect: \c task1_db
CREATE DATABASE task1_db;
\c task1_db

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
  id           SERIAL PRIMARY KEY,
  code         VARCHAR(10)  UNIQUE NOT NULL,
  title        VARCHAR(100) NOT NULL,
  credit_hours INTEGER CHECK (credit_hours BETWEEN 1 AND 4)
);

INSERT INTO courses (code, title, credit_hours) VALUES
  ('CS-301', 'Full Stack Web Development', 3),
  ('CS-302', 'Database Systems', 4),
  ('CS-303', 'Operating Systems', 3),
  ('CS-304', 'Technical Writing', 2),
  ('CS-305', 'Computer Networks Lab', 1),
  ('CS-306', 'Artificial Intelligence', 3);

-- Check constraint test: PostgreSQL must reject this (credit_hours = 9)
INSERT INTO courses (code, title, credit_hours) VALUES ('CS-999', 'Invalid Course', 9);

-- (a) all courses ordered by title
SELECT * FROM courses ORDER BY title;

-- (b) courses with 3 or more credit hours
SELECT * FROM courses WHERE credit_hours >= 3;

-- (c) change the title of one course
UPDATE courses SET title = 'Advanced Database Systems' WHERE code = 'CS-302';

-- (d) delete one course by code
DELETE FROM courses WHERE code = 'CS-305';

-- (e) number of courses for each credit_hours value
SELECT credit_hours, COUNT(*) AS total_courses
FROM courses
GROUP BY credit_hours
ORDER BY credit_hours;
