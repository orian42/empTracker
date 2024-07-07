const { prompt } = require('inquirer');
const { Pool } = require('pg');
const { getDeptData, getRoleData, getEmpData } = require('./choicesLists.js');

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

const addDeptInfo = () => {
    prompt([
        {
            type: 'input',
            message: `Please enter the name of the new department:`,
            name: 'deptName'
        }
    ])
        .then((response) => {
            addDept(response.deptName);
        })
}

const addDept = async (name) => {
    pool.query('INSERT INTO departments(name) VALUES($1) RETURNING *', [name]);
    console.log('Department successfully added to the database!');
}

const addRoleInfo = async () => {
    try {
        const deptChoices = await getDeptData();

        const response = await prompt([
            {
                type: 'input',
                message: `Please enter the name of the new role:`,
                name: 'roleName'
            },
            {
                type: 'input',
                message: `Please enter the salary for the new role:`,
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: `Please choose the department of the new role:`,
                name: 'roleDept',
                choices: deptChoices
            },
        ]);

        addRole(response.roleName, response.roleSalary, response.roleDept);
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

const addRole = async (name, salary, dept) => {
    pool.query('INSERT INTO roles(title, salary, dept_id) VALUES($1, $2, $3) RETURNING *', [name, salary, dept]);
    console.log('Role successfully added to the database!');
}

const addEmployeeInfo = async () => {
    try {
        const roleChoices = await getRoleData();
        const mgrChoices = await getEmpData();

        const response = await prompt([
            {
                type: 'input',
                message: `Please enter the first name of the new employee:`,
                name: 'first_name'
            },
            {
                type: 'input',
                message: `Please enter the last name of the new employee:`,
                name: 'last_name'
            },
            {
                type: 'list',
                message: `Please choose the new employee's role:`,
                name: 'role',
                choices: roleChoices
            },
            {
                type: 'list',
                message: `Please choose the new employee's manager:`,
                name: 'manager',
                choices: mgrChoices
            },
        ]);

        addEmployee(response.first_name, response.last_name, response.role, response.manager);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
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
    addDeptInfo,
    addRoleInfo,
    addEmployeeInfo
};