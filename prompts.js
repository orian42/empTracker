const { prompt } = require('inquirer');

//This function is the highest level of the nested questions
const interface = () => {
    prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'dbTask',
            choices: ['View Information', 'Add Information', 'Update Information']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            switch (dbTask) {
                case 'View Information':
                    console.log(`\nYou would like to view information.\n`);
                    viewInfo();
                    break;
                case 'Add Information':
                    console.log(`\nYou would like to add information.\n`);
                    addInfo();
                    break;
                case 'Update Information':
                    console.log(`\nYou would like to update information.\n`);
                    updateInfo();
                    break;
            }
        })
}

//This function handles requests to view information in the database
const viewInfo = () => {
    prompt([
        {
            type: 'list',
            message: 'What information would you like to view?',
            name: 'dbTask',
            choices: ['Departments', 'Roles', 'Employees']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            switch (dbTask) {
                case 'Departments':
                    console.log(`\nYou would like to view department information.\n`)
                    break;
                case 'Roles':
                    console.log(`\nYou would like to view role information.\n`)
                    break;
                case 'Employees':
                    console.log(`\nYou would like to view employee information.\n`)
                    break;
            }
            interface();
        })
}

//This function handles requests to add information to the database
const addInfo = () => {
    prompt([
        {
            type: 'list',
            message: 'What information would you like to add?',
            name: 'dbTask',
            choices: ['Department', 'Role', 'Employee']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            switch (dbTask) {
                case 'Department':
                    console.log(`\nYou would like to add a department.\n`)
                    break;
                case 'Role':
                    console.log(`\nYou would like to add a role.\n`)
                    break;
                case 'Employee':
                    console.log(`\nYou would like to add an employee.\n`)
                    break;
            }
            interface();
        })
}

//This function handles requests to update information in the database
const updateInfo = () => {
    console.log (`\nOnly updating of employee roles is currently available.\n`);
    interface();
}

module.exports = interface;