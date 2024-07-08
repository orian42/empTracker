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

//This query displays all information in the departments table 
//except id 0 which is designated as unassigned
const viewDept = async () => {
    pool.query(`
        SELECT 
            name AS "Department Name", 
            id AS "Department ID" 
        FROM departments 
        WHERE id > 0
        ORDER BY name
        `, function (err, { rows }) {
        console.table(rows);
    });
}

//This query displays all information in the roles table joined with the departments table
//except the role with id 0 which is designated as unassigned
const viewRoles = async () => {
    pool.query(`
        SELECT 
            roles.title AS "Job Title", 
            roles.id AS "Role ID", 
            departments.name AS "Department", 
            roles.salary AS "Salary" 
        FROM roles
        JOIN departments ON roles.dept_id = departments.id 
                WHERE roles.id > 0
        ORDER BY "Job Title"
        `, function (err, { rows }) {
        console.table(rows);
    });
}

//This query displays all information in the employees table joined with the departments and roles tables
const viewEmp = async () => {
    pool.query(`
        SELECT 
            employees.id AS "Employee ID", 
            employees.first_name AS "First Name", 
            employees.last_name AS "Last Name", 
            roles.title AS "Job Title",
            departments.name AS "Department",
            roles.salary AS "Salary",
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

//This query displays information in the employees table joined with the departments and roles tables
//for employees assigned to the user-selected manager
const empByMgrData = async (mgr_id) => {
    console.log(mgr_id);
    pool.query(`
        SELECT 
            employees.id AS "Employee ID", 
            employees.first_name AS "First Name", 
            employees.last_name AS "Last Name", 
            roles.title AS "Title",
            departments.name AS "Department",
            roles.salary AS "Salary",
            CONCAT(B.first_name, ' ', B.last_name) AS "Manager"
        FROM employees
        JOIN roles ON employees.role_id = roles.id 
        JOIN departments ON roles.dept_id = departments.id
        LEFT JOIN employees B ON employees.manager_id = B.id
        WHERE employees.manager_id = $1
        ORDER BY "Last Name"
        `, [mgr_id], function (err, { rows }) {
        console.table(rows);
    });
}

//This query displays information in the employees table joined with the departments and roles tables
//for employees assigned to the user-selected department
const empByDeptData = async (dept_id) => {
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
        WHERE roles.dept_id = $1
        ORDER BY "Last Name"
        `, [dept_id], function (err, { rows }) {
        console.table(rows);
    });
}

//This query finds the sum of all salaries from a user-selected department
const viewBudget = async (dept_id) => {
    pool.query(`
        SELECT SUM(roles.salary) AS total_salary
        FROM employees
        JOIN roles ON employees.role_id = roles.id 
        JOIN departments ON roles.dept_id = departments.id
        WHERE departments.id = $1;
    `, [dept_id], function (err, res) {
        const totalSalary = res.rows[0].total_salary;
        console.log(`The total utilized budget for this department is $${totalSalary}.`);
    });
}

module.exports = {
    viewDept,
    viewRoles,
    viewEmp,
    empByMgrData,
    empByDeptData, 
    viewBudget
}