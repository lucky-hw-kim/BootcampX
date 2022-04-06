SELECT teachers.name as teacher, 
       students.name as student,
       assignments.content as assignment,
       assistance_requests.completed_at - assistance_requests.started_at as duration
FROM teachers JOIN assistance_requests ON teachers.id = teacher_id
              JOIN students ON student_id = students.id 
              JOIN assignments ON assignments.id = assignment_id
ORDER BY duration;
