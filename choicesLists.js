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

const getDeptData = async () => {
    try {
        const { rows } = await pool.query('SELECT name, id FROM departments ORDER BY name');
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

const getRoleData = async () => {
    try {
        const { rows } = await pool.query('SELECT title, id FROM roles ORDER BY title');
        const data = rows.map(row => ({
            name: row.title,
            value: row.id,
        }));
        return data;
    } catch (error) {
        console.error('Error fetching role data:', error);
        return [];
    }
}

const getEmpData = async () => {
    try {
        const { rows } = await pool.query(`SELECT CONCAT(first_name, ' ', last_name) AS manager, id FROM employees ORDER BY manager`);
        const data = rows.map(row => ({
            name: row.manager,
            value: row.id,
        }));
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return [];
    }
}

module.exports = {
    getDeptData,
    getRoleData,
    getEmpData
};