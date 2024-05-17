//dependencies
const mysql = require("mysql2"); // Importing the mysql2 module for connecting to MySQL database
const inquirer = require("inquirer"); // Importing the inquirer module for user prompts
const consoleTable = require("console.table"); // Importing the console.table module for displaying formatted tables
const chalk = require("chalk"); // Importing the chalk module for colored console output

//connecting to database 
const connection = mysql.createConnection({
    host: "localhost", // MySQL server host
    port: 3306, // MySQL server port
    user: "root", // MySQL username
    password: "password", // MySQL password
    database: "employee_DB" // Name of the database to connect to
});

//connecting to server and database 
connection.connect(function(err){
    if (err) throw err;
    console.log(chalk.bold.cyan( `Cubicle Shuffle`)); // Displaying a colored message in the console
    promptStart(); // Calling the promptStart function to display the main menu
});

//main menu/ start app
promptStart = () => {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: chalk.cyan('CHOOSE AN OPTION BELOW:'), // Displaying a colored message in the console
        choices: [
                "EMPLOYEES.", // Option to view employees
                "DEPARTMENTS.", // Option to view departments
                "ROLES.", // Option to view roles
                "ADD EMPLOYEE.", // Option to add an employee
                "ADD DEPARTMENT.", // Option to add a department
                "ADD ROLE.", // Option to add a role
                "EXIT." // Option to exit the application
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "EMPLOYEES.":
                employees(); // Calling the employees function to display all employees
                break;
            case "DEPARTMENTS.":
                departments(); // Calling the departments function to display all departments
                break;
            case "ROLES.":
                roles(); // Calling the roles function to display all roles
                break;
            case "ADD EMPLOYEE.":
                addEmployee(); // Calling the addEmployee function to add a new employee
                break;
            case "ADD DEPARTMENT.":
                addDepartment(); // Calling the addDepartment function to add a new department
                break;
            case "ADD ROLE.":
                addRole(); // Calling the addRole function to add a new role
                break;
            case "EXIT.": 
                promptEnd(); // Calling the promptEnd function to exit the application
                break;
            default:
                break;
        }
    });
};

//show employees 
employees= () => {
    var query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.bgCyan(res.length + " EMPLOYEES FOUND!")); // Displaying the number of employees found
    console.log(chalk.bgCyan("ALL EMPLOYEES: ")); // Displaying a colored message in the console
    console.table(res); // Displaying the employee data in a formatted table
    promptStart(); // Calling the promptStart function to display the main menu
    });
};

departments = () => {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
    if(err)throw err;
    console.log(chalk.bgCyan(res.length + " DEPARTMENTS FOUND!")); // Displaying the number of departments found
    console.log(chalk.cyan("ALL DEPARTMENTS:")); // Displaying a colored message in the console
    console.table(res); // Displaying the department data in a formatted table
    promptStart(); // Calling the promptStart function to display the main menu
    });
};

roles = () => {
    var query = 'SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id';
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.cyan("ALL ROLES:")); // Displaying a colored message in the console
    console.table(res); // Displaying the role data in a formatted table
    promptStart(); // Calling the promptStart function to display the main menu
    });
};

addEmployee = () => {
    connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "FIRST NAME: ", // Prompting the user to enter the first name of the employee
            },
            {
                name: "last_name",
                type: "input", 
                message: "LAST NAME: " // Prompting the user to enter the last name of the employee
            },
            {
                name: "role", 
                type: "list",
                choices: () => {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "ROLE?" // Prompting the user to select the role of the employee
            }
            ]).then((answer) => {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                }                  
                }  
                connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                (err) => {
                    if (err) throw err;
                    console.log(chalk.bgCyan("EMPLOYEE ADDED!")); // Displaying a colored message in the console
                    promptStart(); // Calling the promptStart function to display the main menu
                }
                );
            });
    });
};

addDepartment = () => {
    inquirer
    .prompt([
        {
            name: "new_dept", 
            type: "input", 
            message: "NEW DEPARTMENT: " // Prompting the user to enter the name of the new department
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
        var query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
        if(err)throw err;
        console.log(chalk.bgCyan("DEPARTMENT ADDED!")); // Displaying a colored message in the console
        promptStart(); // Calling the promptStart function to display the main menu
        });
    });
};

addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "new_role",
            type: "input", 
            message: "NEW ROLE: " // Prompting the user to enter the name of the new role
        },
        {
            name: "salary",
            type: "input",
            message: "SALARY: " // Prompting the user to enter the salary of the new role
        },
        {
            name: "deptChoice",
            type: "rawlist",
            choices: () => {
                var deptArry = [];
                for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                }
                return deptArry;
            },
        }
    ]).then((answer) => {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }

        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: deptID
            },
            (err, res) => {
                if(err)throw err;
                console.log(chalk.bgCyan("ROLE ADDED!")); // Displaying a colored message in the console
                promptStart(); // Calling the promptStart function to display the main menu
            }
        );
    });
    });   
};

promptEnd = () => {
    connection.end(); // Closing the database connection
};