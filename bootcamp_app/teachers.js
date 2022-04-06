const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'vagrant',
    password: '123',
    database: 'bootcampx'
})

const input1 = process.argv[2];
const input2 = process.argv[3];

pool.query(`
SELECT DISTINCT cohorts.name as cohort,
teachers.name as teacher
FROM assistance_requests 
JOIN teachers
ON teacher_id = teachers.id 
JOIN students 
ON students.id = assistance_requests.student_id
JOIN cohorts
ON cohort_id = cohorts.id
WHERE assistance_requests.teacher_id = teachers.id AND cohorts.name like '%${input1}%'
ORDER BY cohort, teacher
LIMIT ${input2 || 8} 
`)
.then ((res) => {
  console.log('connected');
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch (err => {
  console.error('querry error: ', err.stack);
})