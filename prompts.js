//This file contains all of the inquirer prompt functions

//Dependencies for this file
const { prompt } = require('inquirer');
const { viewDept, viewRoles, viewEmp, empByMgrData, empByDeptData, viewBudget } = require('./viewQueries.js');
const { addDept, addRole, addEmployee } = require('./addQueries.js');
const { updateEmployee, updateManager } = require('./updateQueries.js');
const { deleteDeptData, deleteRolesData, deleteEmpData } = require('./deleteQueries.js');
const { getEmpData, getDeptData, getRoleData } = require('./choicesLists.js');

//Clears the console prior to beginning the application
const blank = '\n'.repeat(process.stdout.rows);
console.log(blank);

//Generates the title of the app
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

//This is the main menu of the app.  There are many options and 
//a switch method directs the flow of the app.
const mainMenu = () => {
    prompt([
        {
            type: 'list',
            message: `What would you like to do?`,
            name: 'dbTask',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department', 'View the total utilized budget of a department', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager', 'Delete a department', 'Delete a role', 'Delete an employee', 'Exit']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            console.clear();
            title();
            //The user-selected option drives what function will be called
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
                case 'View the total utilized budget of a department':
                    viewBudgetInfo();
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
                case 'Update an employee manager':
                    updateManagerInfo();
                    break;
                case 'Delete a department':
                    deleteDeptInfo();
                    break;
                case 'Delete a role':
                    deleteRoleInfo();
                    break;
                case 'Delete an employee':
                    deleteEmployeeInfo();
                    break;
                case 'Exit':
                    console.log(`Goodbye!`);
                    process.exit();
            }
        })
}

//This function creates a 1/4 second wait before re-running the main menu
let menuTimeout = () => {
    setTimeout(() => {
        mainMenu();
    }, 250);
}

//This function allows the user to view the employees of a selected manager
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
        //The query is called from the viewQueries.js file
        empByMgrData(response.selMgr).then(menuTimeout());
    } catch (error) {
        console.error('Error viewing employee by manager:', error);
    }
}

//This function allows the user to view employees assigned to
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
        //The query is called from the viewQueries.js file
        empByDeptData(response.selDept).then(menuTimeout());
    } catch (error) {
        console.error('Error viewing employee by manager:', error);
    }
}

//This function allows the user to select a department 
//and view the sum of the salaries paid out
const viewBudgetInfo = async () => {
    try {
        const deptChoices = await getDeptData();

        const response = await prompt([
            {
                type: 'list',
                message: `Select department to view the total utilized budget:`,
                name: 'selDeptBudget',
                choices: deptChoices
            },
        ]);
        //The query is called from the viewQueries.js file
        viewBudget(response.selDeptBudget).then(menuTimeout());
    } catch (error) {
        console.error('Error viewing departmental budget:', error);
    }
}

//This function allows the user to add a department
const addDeptInfo = () => {
    prompt([
        {
            type: 'input',
            message: `Please enter the name of the new department:`,
            name: 'deptName'
        }
    ])
        .then((response) => {
            //The query is called from the addQueries.js file
            addDept(response.deptName).then(menuTimeout());
        })
}

//This function allows the user to add a role
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
        //The query is called from the addQueries.js file
        addRole(response.roleName, response.roleSalary, response.roleDept).then(menuTimeout());
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

//This function allows the user to add an employee
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
        //The query is called from the addQueries.js file
        addEmployee(response.first_name, response.last_name, response.role, response.manager).then(menuTimeout());
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

//This function allows the user to update an employee's role
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
        //The query is called from the updateQueries.js file
        updateEmployee(response.employee, response.role).then(menuTimeout());
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}

//This function allows the user to update an employee's manager
const updateManagerInfo = async () => {
    try {
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
                message: `Please choose a manger for this employee:`,
                name: 'manager',
                choices: empChoices
            },
        ]);
        //The query is called from the updateQueries.js file
        updateManager(response.employee, response.manager).then(menuTimeout());
    } catch (error) {
        console.error('Error updating manager:', error);
    }
}

//This function allows the user to delete a department
const deleteDeptInfo = async () => {
    try {
        const deptChoices = await getDeptData();

        const response = await prompt([
            {
                type: 'list',
                message: `Select department to delete`,
                name: 'selDept',
                choices: deptChoices
            },
        ]);
        //The query is called from the deleteQueries.js file
        deleteDeptData(response.selDept).then(menuTimeout());
    } catch (error) {
        console.error('Error deleting department:', error);
    }
}

//This function allows the user to delete a role
const deleteRoleInfo = async () => {
    try {
        const roleChoices = await getRoleData();

        const response = await prompt([
            {
                type: 'list',
                message: `Select role to delete`,
                name: 'selRole',
                choices: roleChoices
            },
        ]);
        //The query is called from the deleteQueries.js file
        deleteRolesData(response.selRole).then(menuTimeout());
    } catch (error) {
        console.error('Error deleting role:', error);
    }
}

//This function allows the user to delete an employee
const deleteEmployeeInfo = async () => {
    try {
        const empChoices = await getEmpData();

        const response = await prompt([
            {
                type: 'list',
                message: `Select employee to delete`,
                name: 'selEmp',
                choices: empChoices
            },
        ]);
        //The query is called from the deleteQueries.js file
        deleteEmpData(response.selEmp).then(menuTimeout());
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
}

module.exports = {
    title,
    mainMenu
};
