SELECT sum(duration) as total_duration
FROM assignment_submissions
JOIN students ON student_id = students.Id 
JOIN cohorts ON cohort_id = cohorts.id 
WHERE cohorts.name = 'FEB12';

