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

//Updates an employee with a selected new role
const updateEmployee = async (employee, role) => {
    pool.query('UPDATE employees SET role_id = $2 WHERE id = $1', [employee, role]);
    console.log('Employee was successfully updated with the new role!');
}

//Updates an employee with a selected new manager
const updateManager = async (employee, manager) => {
    pool.query('UPDATE employees SET manager_id = $2 WHERE id = $1', [employee, manager]);
    console.log('Employee was successfully updated with the new manager!');
}

module.exports = {
    updateEmployee,
    updateManager
};