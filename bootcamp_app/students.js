const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'vagrant',
  password: '123',
  database: 'bootcampx'
})

const input1 = process.argv[2];
const input2 = process.argv[3];

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like '%${input1}%'
LIMIT ${input2 || 5}` 
)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of  ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('querry error', err.stack));