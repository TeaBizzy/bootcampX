SELECT avg(total_times.total_assistance_time) as average_total_duration
  FROM (SELECT cohorts.name, sum(completed_at - started_at) as total_assistance_time
  FROM assistance_requests 
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = cohort_id
  GROUP BY cohorts.id) AS total_times;