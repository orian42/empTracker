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

const deleteDeptData = async (dept_id) => {
    pool.query('UPDATE roles SET dept_id = 0 WHERE dept_id = $1', [dept_id]);
    pool.query(`DELETE FROM departments WHERE id = $1`, [dept_id]);
    console.log('Department successfully deleted.  Some roles may need to be reassigned to other departments.');
    
}

const deleteRolesData = async (role_id) => {
    pool.query('UPDATE employees SET role_id = 0 WHERE role_id = $1', [role_id]);
    pool.query(`DELETE FROM roles WHERE id = $1`, [role_id]);
    console.log('Role successfully deleted.  Some employees may need to be reassigned to other departments.');
}

const deleteEmpData = async (emp_id) => {
    pool.query('UPDATE employees SET manager_id = null WHERE manager_id = $1', [emp_id]);
    pool.query(`DELETE FROM employees WHERE id = $1`, [emp_id]);
    console.log('Employee successfully deleted.  If this employee was a manager, their subordinates will need to be reassigned to other managers.');
}

module.exports = {
    deleteDeptData,
    deleteRolesData,
    deleteEmpData
}