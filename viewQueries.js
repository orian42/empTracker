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

const empByMgrData = async (mgr_id) => {
    console.log(mgr_id);
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
        WHERE employees.manager_id = $1
        ORDER BY "Last Name"
        `, [mgr_id], function (err, { rows }) {
        console.table(rows);
    });
}

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