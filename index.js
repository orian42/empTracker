const { prompt } = require('inquirer');
const {
    getDeptData,
    getRoleData,
    getEmpData,
    updateEmployee } = require('./choicesLists.js');
    const { viewDept, viewRoles, viewEmp } = require('./viewFunc.js');
    const { addDeptInfo, addRoleInfo, addEmployeeInfo } = require('./addFunc.js');
    const { updateEmployeeInfo } = require('./updateFunc.js');

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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])
        .then((response) => {
            let dbTask = response.dbTask;
            console.clear();
            title();
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
            }
        })
}

// const updateEmployeeInfo = async () => {
//     try {
//         const roleChoices = await getRoleData();
//         const empChoices = await getEmpData();

//         const response = await prompt([
//             {
//                 type: 'list',
//                 message: `Please choose the employee to update:`,
//                 name: 'employee',
//                 choices: empChoices
//             },
//             {
//                 type: 'list',
//                 message: `Please choose the employee's new role:`,
//                 name: 'role',
//                 choices: roleChoices
//             },
//         ]);

//         updateEmployee(response.employee, response.role);
//     } catch (error) {
//         console.error('Error updating employee:', error);
//     }
// }

module.exports = {
    title,
    mainMenu
};
