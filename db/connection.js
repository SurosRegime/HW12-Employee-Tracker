const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db',
};

async function main() {
  const connection = await mysql.createConnection(dbConfig);
  
  // Prompt the user to choose an action
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
    ],
  });

  switch (action) {
    case 'View all departments':
      await viewAllDepartments(connection);
      break;
    case 'View all roles':
      await viewAllRoles(connection);
      break;
    case 'View all employees':
      await viewAllEmployees(connection);
      break;
    case 'Add a department':
      await addDepartment(connection);
      break;
    case 'Add a role':
      await addRole(connection);
      break;
    case 'Add an employee':
      await addEmployee(connection);
      break;
    case 'Update an employee role':
      await updateEmployeeRole(connection);
      break;
    default:
      console.log('Invalid action');
      break;
  }

  connection.end();
}

async function viewAllDepartments(connection) {
  const [rows] = await connection.query('SELECT id, name FROM departments');
  console.table(rows);
}

async function viewAllRoles(connection) {
  const [rows] = await connection.query(`
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `);
  console.table(rows);
}

async function viewAllEmployees(connection) {
  const [rows] = await connection.query(
    SELECT
      employees.id,
      employees.first_name,
      employees.last_name,
      roles.title,
      departments.name AS department,
      roles.salary,
      CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees managers ON employees.manager_id = managers.id
  );
  console.table(rows);
}

async function addDepartment(connection) {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });

  await connection.query('INSERT INTO departments (name) VALUES (?)', [name]);
  console.log(`Department "${name}" added`);
}

async function addRole(connection) {
  const [departments] = await connection.query('SELECT id, name FROM departments');

  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departments.map(({ id, name }) => ({ value: id, name })),
    },
  ]);

  await connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
  console.log(Role `${title}` added);
  }
  
  async function addEmployee(connection) {
  const [roles] = await connection.query('SELECT id, title FROM roles');
  const [managers] = await connection.query( SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees JOIN roles ON employees.role_id = roles.id WHERE roles.title LIKE '%manager%' );
  
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
  {
  type: 'input',
  name: 'first_name',
  message: 'Enter the first name of the employee:',
  },
  {
  type: 'input',
  name: 'last_name',
  message: 'Enter the last name of the employee:',
  },
  {
  type: 'list',
  name: 'role_id',
  message: 'Select the role for the employee:',
  choices: roles.map(({ id, title }) => ({ value: id, name: title })),
  },
  {
  type: 'list',
  name: 'manager_id',
  message: 'Select the manager for the employee:',
  choices: [{ value: null, name: 'None' }, ...managers.map(({ id, name }) => ({ value: id, name }))],
  },
  ]);
  
  await connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
  console.log(Employee `${first_name} ${last_name}` added);
  }
  
  async function updateEmployeeRole(connection) {
  const [employees] = await connection.query( SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees JOIN roles ON employees.role_id = roles.id );
  const [roles] = await connection.query('SELECT id, title FROM roles');
  
  const { employee_id, role_id } = await inquirer.prompt([
  {
  type: 'list',
  name: 'employee_id',
  message: 'Select the employee to update:',
  choices: employees.map(({ id, name }) => ({ value: id, name })),
  },
  {
  type: 'list',
  name: 'role_id',
  message: 'Select the new role for the employee:',
  choices: roles.map(({ id, title }) => ({ value: id, name: title })),
  },
  ]);
  
  await connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, employee_id]);
  console.log('Employee role updated');
  }
  
  main();
