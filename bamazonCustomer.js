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
    console.log("\nWelcome to bamazon! Here are all the products.\n");
    readData();
});

const readData = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Department Name: " + res[i].department_name
                + " || Price: " + res[i].price);
        }
        if (err) throw err;
        console.log("\n");
        promptUser();
    });
}

const promptUser = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase?"
            },
            {
                type: "input",
                name: "units",
                message: "How many units of the product would you like to purchase?"
            }
        ])
        .then(answers => {
            console.log("\nYour order has been placed. One moment while we check to see if we have enough in stock... ");

            connection.query("SELECT stock_quantity FROM products WHERE ?",
                {
                    item_id: answers.id
                },
                function (err, res) {
                    if (res[0].stock_quantity >= answers.units) {
                        console.log("\nThere is enough in stock!");
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: res[0].stock_quantity - answers.units
                                },
                                {
                                    item_id: answers.id
                                }
                            ]
                        );
                        connection.query("SELECT stock_quantity, price FROM products WHERE ?",
                            {
                                item_id: answers.id
                            },
                            function (err, res) {
                                console.log("\nThe total cost of your purchase will be " + (res[0].price * answers.units) + " dollars.\n");
                                if (err) throw err;
                            }
                        );
                    }
                    else {
                        console.log("\nThere is not enough in stock.\n");
                    }
                    if (err) throw err;
                    connection.end();
                }
            );
        });
}