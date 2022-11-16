const { Pool } = require('pg');
const fs = require('fs');

const args = process.argv.slice(2);
const cohort = args[0];
const values = [`%${cohort}%`]

const q = fs.readFileSync('../0_selects/1_students_without_github.sql').toString();

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`, values)
.then(res => {
  console.log(res.rows);
})
.catch(err => 
  console.error('querry error', err.stack)
);