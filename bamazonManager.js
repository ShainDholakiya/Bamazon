var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

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
                choices: ["View Products for Sale", "View Low Inventory (less than 5)", "Add to Inventory", "Add New Product"]
            }
        ])
        .then(answers => {
            switch (answers.command) {
                case "View Products for Sale":
                    readData();
                    break;
                case "View Low Inventory (less than 5)":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
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
        endConnection();
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
        endConnection();
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
                    message: "What is the id of the product that you want to add inventory to?\n"
                },
                {
                    type: "input",
                    name: "stock",
                    message: "How much inventory do you want to add?\n"
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
                        endConnection();
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
                    endConnection();
                }
            );
        });
}

const endConnection = () => {
    console.log("\n");
    connection.end();
}
