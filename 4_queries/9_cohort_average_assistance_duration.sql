SELECT avg(total_duration) as average_total_duration
FROM(SELECT
sum(assistance_requests.completed_at - assistance_requests.started_at) as total_duration
FROM cohorts JOIN students  ON cohorts.id = cohort_id
             JOIN assistance_requests ON students.id = student_id
GROUP BY cohorts.NAME
ORDER BY total_duration
) as total_duration;

