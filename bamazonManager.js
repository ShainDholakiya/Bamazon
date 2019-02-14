var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to bamazon Manager!\n");
    promptUser();
});

const promptUser = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "command",
                message: "Choose a command to do.\n",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ])
        .then(answers => {
            if (answers.command === "View Products for Sale") {
                readData();
            }
            else if (answers.command === "View Low Inventory") {
                lowInventory();
            }
            else if (answers.command === "Add to Inventory") {
                addInventory();
            }
            else if (answers.command === "Add New Product") {
                addProduct();
            }
            else {
                console.log("Invalid action");
            }
        });
}

const readData = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Department Name: " + res[i].department_name
                + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
        }
        if (err) throw err;
        console.log("\n");
        connection.end();
    });
}

const lowInventory = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("ID: " + res[i].item_id + " || Product Name: " +
                    res[i].product_name + " || Department Name: " + res[i].department_name
                    + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
            }
        }
        if (err) throw err;
        console.log("\n");
        connection.end();
    });
}

const addInventory = () => {
    console.log("\nHere are all the products.\n");
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " +
            res[i].product_name + " || Department Name: " + res[i].department_name
            + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
        }
        if (err) throw err;
    
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the id of the product that you want to add inventory to?"
            },
            {
                type: "input",
                name: "stock",
                message: "How much inventory do you want to add?"
            }
        ])
        .then(answers => {
            console.log("\nUpdating inventory...\n");
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: parseInt(answers.stock) + parseInt(res[0].stock_quantity)
                    },
                    {
                        item_id: answers.id
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + " inventory updated!\n");
                    if (err) throw err;
                    console.log("\n");
                    connection.end();
                }
            );
        });
        });
    }

    const addProduct = () => {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "product",
                    message: "What is the product name?\n"
                },
                {
                    type: "input",
                    name: "department",
                    message: "What is the department name for the product?\n"
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the price of the product?\n"
                },
                {
                    type: "input",
                    name: "stock",
                    message: "How many do you have in stock?\n"
                }
            ])
            .then(answers => {
                console.log("\nInserting a new product...\n");
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: answers.product,
                        department_name: answers.department,
                        price: answers.price,
                        stock_quantity: answers.stock
                    },
                    function (err, res) {
                        console.log(res.affectedRows + " product inserted!\n");
                        if (err) throw err;
                        console.log("\n");
                        connection.end();
                    }
                );
            });
    }


