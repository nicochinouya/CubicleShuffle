
INSERT INTO department (name)
VALUES  ("Galactic Sales"),
        ("Starship Engineering"),
        ("Galactic Finance"),
        ("Outer Rim Marketing"),
        ("Jedi Council Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Head of Galactic Sales", 125000, 1),
        ("Sales Jedi", 80000, 1),
        ("Starship Electrical Engineer", 200000, 2), 
        ("Starship Software Engineer", 175000, 2), 
        ("Galactic Accountant", 125000, 3), 
        ("Head of Outer Rim Marketing", 200000, 4), 
        ("Marketing Padawan", 130000, 4), 
        ("VP Jedi Council Resources", 190000, 5), 
        ("Council Office Manager", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Leia", "Organa", 3), 
        ("Luke", "Skywalker", 1),
        ("Han", "Solo", 6),
        ("Chewbacca", "Wookiee", 4),
        ("Rey", "Skywalker", 2),
        ("Finn", "Stormtrooper", 7), 
        ("Poe", "Dameron", 5), 
        ("Padmé", "Amidala", 8), 
        ("Anakin", "Skywalker", 9);
