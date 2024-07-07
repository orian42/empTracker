const { Pool } = require('pg');
const { mainMenu } = require('./index.js');

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

const viewDept = async () => {
    pool.query(`
        SELECT 
            name AS "Department Name", 
            id AS "Department ID" 
        FROM departments 
        ORDER BY name
        `, function (err, { rows }) {
        console.table(rows);
    });
}

const viewRoles = async () => {
    pool.query(`
        SELECT 
            roles.title AS "Job Title", 
            roles.id AS "Role ID", 
            departments.name AS "Department", 
            roles.salary AS "Salary" 
        FROM roles
        JOIN departments ON roles.dept_id = departments.id 
        ORDER BY "Job Title"
        `, function (err, { rows }) {
        console.table(rows);
    });
}

const viewEmp = async () => {
    pool.query(`
        SELECT 
            employees.id AS "Employee ID", 
            employees.first_name AS "First Name", 
            employees.last_name AS "Last Name", 
            roles.title AS "Title",
            roles.salary AS "Salary",
            departments.name AS "Department",
            CONCAT(B.first_name, ' ', B.last_name) AS "Manager"
        FROM employees 
        JOIN roles ON employees.role_id = roles.id 
        JOIN departments ON roles.dept_id = departments.id
        LEFT JOIN employees B ON employees.manager_id = B.id
        ORDER BY "Last Name"
        `, function (err, { rows }) {
        console.table(rows);
    });
}

module.exports = {
    viewDept,
    viewRoles,
    viewEmp
}