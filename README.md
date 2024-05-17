# Cubicle-Shuffle

# Star Wars Themed Database Setup

This repository contains SQL scripts to set up a database with departments, roles, and employees, all themed around the Star Wars universe.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Database Structure](#database-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:
- A SQL database system (e.g., MySQL, PostgreSQL)
- A SQL client or command-line interface to run the SQL scripts

## Database Structure

The database consists of three tables:
1. **department**: Stores the names of the departments.
2. **role**: Stores the roles, their salaries, and their corresponding department IDs.
3. **employee**: Stores the employees' first names, last names, and their corresponding role IDs.

## Installation

To set up the database, follow these steps:

1. Create the **department** table:
   
2. Create the **role** table:

3. Create the **employee** table:

4. Populate the **department** table with Star Wars-themed departments:

5. Populate the **role** table with Star Wars-themed roles and their corresponding department IDs:

6. Populate the **employee** table with Star Wars-themed employees and their corresponding role IDs:
   
## Usage

Once the database is set up, you can query the tables to retrieve information about the departments, roles, and employees. For example:

- To get all employees and their roles:
    
    SELECT e.first_name, e.last_name, r.title
    FROM employee e
    JOIN role r ON e.role_id = r.id;
    

- To get all roles in the "Starship Engineering" department:
    
    SELECT r.title, r.salary
    FROM role r
    JOIN department d ON r.department_id = d.id
    WHERE d.name = 'Starship Engineering';
    ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is open source and available under the MIT License.
