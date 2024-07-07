const { prompt } = require('inquirer');
const { Pool } = require('pg');
const {getRoleData, getEmpData} = require('./choicesLists.js');

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

const updateEmployeeInfo = async () => {
    try {
        const roleChoices = await getRoleData();
        const empChoices = await getEmpData();

        const response = await prompt([
            {
                type: 'list',
                message: `Please choose the employee to update:`,
                name: 'employee',
                choices: empChoices
            },
            {
                type: 'list',
                message: `Please choose the employee's new role:`,
                name: 'role',
                choices: roleChoices
            },
        ]);

        updateEmployee(response.employee, response.role);
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}

const updateEmployee = async (employee, role) => {
    pool.query('UPDATE employees SET role_id = $2 WHERE id = $1', [employee, role]);
    console.log('Employee was successfully updated with the new role!');
}

module.exports = {
    updateEmployeeInfo
};