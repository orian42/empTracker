const { prompt } = require('inquirer');
const {viewDept, viewRoles, viewEmp} = require('./sqlFunctions.js');

//This function is the highest level of the nested questions
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
                    console.log(`\nYou would like to add a department.\n`);
                    
                    break;
                case 'Add a role':
                    console.log(`\nYou would like to add a role.\n`);
                    
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

module.exports = interface;