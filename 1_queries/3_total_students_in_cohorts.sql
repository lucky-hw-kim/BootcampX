SELECT COUNT(id) AS total_students
FROM students
WHERE cohort_id IN (1, 2, 3);
