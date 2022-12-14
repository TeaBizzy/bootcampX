const { Pool } = require('pg');
const fs = require('fs');

const args = process.argv.slice(2);
const cohortName = args[0];
const limit = args[1];
const values = [`%${cohortName}%`, limit]

const q = fs.readFileSync('../0_selects/1_students_without_github.sql').toString();

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
  console.log(res.rows);
})
.catch(err => 
  console.error('querry error', err.stack)
);