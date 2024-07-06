const { prompt } = require('inquirer');
const { viewDept,
    viewRoles,
    viewEmp,
    addDept,
    addRole,
    getDeptData,
    addEmployee,
    getRoleData,
    getEmpData,
    updateEmployee } = require('./sqlFunctions.js');

const mainMenu = () => {
    prompt([
        {
            type: 'list',
            message: `What would you like to do?`,
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
                    addEmployeeInfo();
                    break;
                case 'Update an employee role':
                    updateEmployeeInfo();
                    break;
                case 'Exit':
                    console.log(`Goodbye!`);
                    process.exit(0);
            }
        })
}

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

module.exports = mainMenu;