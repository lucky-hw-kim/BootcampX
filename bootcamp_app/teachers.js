const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'vagrant',
    password: '123',
    database: 'bootcampx'
})
const queryString = `
SELECT DISTINCT cohorts.name as cohort,
teachers.name as teacher
FROM assistance_requests 
JOIN teachers
ON teacher_id = teachers.id 
JOIN students 
ON students.id = assistance_requests.student_id
JOIN cohorts
ON cohort_id = cohorts.id
WHERE assistance_requests.teacher_id = teachers.id AND cohorts.name like $1
ORDER BY cohort, teacher
LIMIT $2
`
const cohort_name = process.argv[2];
const limit = process.argv[3] || 8;

const values = [`%${cohort_name}%`, limit]

pool.query(queryString, values)
.then ((res) => {
  console.log('connected');
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch (err => {
  console.error('querry error: ', err.stack);
})