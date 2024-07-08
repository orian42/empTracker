//This file contains queries to populate the inquirer prompt options in the prompts.js file
//Note that the name and value properties are defines to allow the user to set the property
//by name but the database is actually populated with a number value

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

//Department data list
//id 0 in this table is an unassigned department which will come into play during a delete query
const getDeptData = async () => {
    try {
        const { rows } = await pool.query('SELECT name, id FROM departments WHERE id > 0 ORDER BY name'); //<---Note that id 0 will not be shown
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

//Role data list
//id 0 in this table is an unassigned role which will come into play during a delete query
const getRoleData = async () => {
    try {
        const { rows } = await pool.query('SELECT title, id FROM roles WHERE id > 0 ORDER BY title'); //<---Note that id 0 will not be shown
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

//Employee data list
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