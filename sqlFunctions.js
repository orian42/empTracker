const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: '12345',
        host: 'localhost',
        database: 'business'
    },
    console.log('Connected to the business database!')
)

pool.connect();

const viewDept = () => {
    pool.query('SELECT name AS "Department Name", id AS "Department ID" FROM departments', function (err, {rows}) {
        console.table(rows);
      });
}

const viewRoles = () => {
    pool.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.dept_id = departments.id', function (err, {rows}) { 
        console.table(rows);
    });
}

const viewEmp = () => {
    pool.query('SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", departments.name AS "Department", roles.salary AS "Salary", employees.manager_id AS "Manager ID" FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.dept_id = departments.id', function (err, {rows}) {
        console.table(rows);
      });
}

module.exports = {
    viewDept,
    viewRoles,
    viewEmp
};