const { prompt } = require('inquirer');
const {viewDept, viewRoles, viewEmp, addDept, addRole, getDeptData} = require('./sqlFunctions.js');

const interface = () => {
    prompt([
        {
            type: 'list',
            message: `\n\nWhat would you like to do?\n\n`,
            name: 'dbTask',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            switch (dbTask) {
                case 'View all departments':
                    viewDept();
                    break;
                case 'View all roles':
                    viewRoles();                    
                    break;
                case 'View all employees':
                    viewEmp();
                    break;
                case 'Add a department':
                    addDeptInfo();
                    break;
                case 'Add a role':
                    addRoleInfo();
                    break;
                case 'Add an employee':
                    console.log(`\nYou would like to add an employee.\n`);
                    
                    break;
                case 'Update an employee role':
                    console.log(`\nYou would like to update an employee role.\n`);
                    
                    break;
                case 'Exit':
                    console.log(`\nGoodbye!\n`);
                    process.exit(0);
            }
        })
}

const addDeptInfo = () => {
    prompt([
        {
            type: 'input',
            message: `\n\nPlease enter the name of the new department:\n\n`,
            name: 'deptName'
        }
    ])
    .then((response) => {
        addDept(response.deptName);
    })
}

const addRoleInfo = async () => {
    try {
        const deptChoices = await getDeptData();
        
        const response = await prompt([
            {
                type: 'input',
                message: `\n\nPlease enter the name of the new role:`,
                name: 'roleName'
            },
            {
                type: 'input',
                message: `\n\nPlease enter the salary for the new role:`,
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: `\n\nPlease choose the department of the new role:`,
                name: 'roleDept',
                choices: deptChoices
            },
        ]);

        addRole(response.roleName, response.roleSalary, response.roleDept);
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

module.exports = interface;