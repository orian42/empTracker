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

const addDept = async (name) => {
    pool.query('INSERT INTO departments(name) VALUES($1) RETURNING *', [name]);
    console.log('Department successfully added to the database!');
}

const addRole = async (name, salary, dept) => {
    pool.query('INSERT INTO roles(title, salary, dept_id) VALUES($1, $2, $3) RETURNING *', [name, salary, dept]);
    console.log('Role successfully added to the database!');
}

const addEmployee = async (first_name, last_name, role, manager) => {
    pool.query(`
        INSERT INTO 
            employees(first_name, last_name, role_id, manager_id) 
        VALUES
            ($1, $2, $3, $4) 
        RETURNING *
        `, [first_name, last_name, role, manager]);
    console.log('Employee successfully added to the database!');
}

module.exports = {
    addDept,
    addRole,
    addEmployee
};