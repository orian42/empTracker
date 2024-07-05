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
    pool.query('SELECT name AS "Department Name", id AS "Department ID" FROM departments', function (err, { rows }) {
        console.table(rows);
    });
}

const viewRoles = () => {
    pool.query('SELECT roles.title AS "Job Title", roles.id AS "Role ID", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.dept_id = departments.id', function (err, { rows }) {
        console.table(rows);
    });
}

const viewEmp = () => {
    pool.query(`SELECT employees.id AS 'Employee ID', employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Title', departments.name AS 'Department', roles.salary AS 'Salary', CONCAT(B.first_name, ' ', B.last_name) AS 'Manager' FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees B ON employees.manager_id = B.id`, function (err, { rows }) {
        console.table(rows);
    });
}

const addDept = async (name) => {
    pool.query('INSERT INTO departments(name) VALUES($1) RETURNING *', [name]);
    console.log('Success!');
}

const addRole = async (name, salary, dept) => {
    pool.query('INSERT INTO roles(title, salary, dept_id) VALUES($1, $2, $3) RETURNING *', [name, salary, dept]);
    console.log('Success!');
}

const getDeptData = async () => {
    try {
        const { rows } = await pool.query('SELECT name, id FROM departments');
        const data = rows.map(row => ({
            name: row.name,
            value: row.id,
        }));
        return data;
    } catch (error) {
        console.error('Error fetching department data:', error);
        return [];
    }
}

module.exports = {
    viewDept,
    viewRoles,
    viewEmp,
    addDept,
    addRole,
    getDeptData
};