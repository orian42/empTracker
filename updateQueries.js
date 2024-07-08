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

const updateEmployee = async (employee, role) => {
    pool.query('UPDATE employees SET role_id = $2 WHERE id = $1', [employee, role]);
    console.log('Employee was successfully updated with the new role!');
}

module.exports = {
    updateEmployee
};