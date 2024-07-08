const { prompt } = require('inquirer');
const { viewDept, viewRoles, viewEmp, empByMgrData, empByDeptData } = require('./viewQueries.js');
const { addDept, addRole, addEmployee } = require('./addQueries.js');
const { updateEmployee } = require('./updateQueries.js');
const { getEmpData, getDeptData, getRoleData } = require('./choicesLists');

const blank = '\n'.repeat(process.stdout.rows);
console.log(blank);

const title = () => {
    console.clear();
    console.log(`
8""""                                            
8     eeeeeee eeeee e     eeeee e    e eeee eeee 
8eeee 8  8  8 8   8 8     8  88 8    8 8    8    
88    8e 8  8 8eee8 8e    8   8 8eeee8 8eee 8eee 
88    88 8  8 88    88    8   8   88   88   88   
88eee 88 8  8 88    88eee 8eee8   88   88ee 88ee 
                                                 
""8""                                            
  8   eeeee  eeeee eeee e   e  eeee eeeee        
  8e  8   8  8   8 8  8 8   8  8    8   8        
  88  8eee8e 8eee8 8e   8eee8e 8eee 8eee8e       
  88  88   8 88  8 88   88   8 88   88   8       
  88  88   8 88  8 88e8 88   8 88ee 88   8
  
  \n\n`);
}

const mainMenu = () => {
    prompt([
        {
            type: 'list',
            message: `What would you like to do?`,
            name: 'dbTask',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            console.clear();
            title();
            switch (dbTask) {
                case 'View all departments':
                    viewDept().then(menuTimeout());
                    break;
                case 'View all roles':
                    viewRoles().then(menuTimeout());
                    break;
                case 'View all employees':
                    viewEmp().then(menuTimeout());
                    break;
                case 'View employees by manager':
                    viewEmpByMgr();
                    break;
                case 'View employees by department':
                    viewEmpByDept();
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
                    process.exit();
            }
        })
}

let menuTimeout = () => {
    setTimeout(() => {
        mainMenu();
    }, 250);
}

const viewEmpByMgr = async () => {
    try {
        const empChoices = await getEmpData();

        const response = await prompt([
        {
                type: 'list',
                message: `Select manager to view their employees:`,
                name: 'selMgr',
                choices: empChoices
            },
        ]);

        empByMgrData(response.selMgr).then(menuTimeout());
    } catch (error) {
        console.error('Error viewing employee by manager:', error);
    }
}

const viewEmpByDept = async () => {
    try {
        const deptChoices = await getDeptData();

        const response = await prompt([
        {
                type: 'list',
                message: `Select department to view assigned employees:`,
                name: 'selDept',
                choices: deptChoices
            },
        ]);

        empByDeptData(response.selDept).then(menuTimeout());
    } catch (error) {
        console.error('Error viewing employee by manager:', error);
    }
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
            addDept(response.deptName).then(menuTimeout());
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

        addRole(response.roleName, response.roleSalary, response.roleDept).then(menuTimeout());
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

        addEmployee(response.first_name, response.last_name, response.role, response.manager).then(menuTimeout());
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

        updateEmployee(response.employee, response.role).then(menuTimeout());
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}

module.exports = {
    title,
    mainMenu
};
