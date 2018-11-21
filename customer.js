var inquirer = require('inquirer'); 
var mysql = require('mysql'); 
var table = require('console.table'); 
var values = []; 

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "baghumyan",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  purchase()
});

function continueShop () {
	inquirer.prompt([
		{
			type: "list",
			name: "repeat", 
			message: "Will you like to continue shopping?", 
			choices: ["YES", "NO"]
		}
	]).then(function(response) {
		if (response.repeat === "NO") {
			console.log("Thank you for shopping with Nare Fashion.Inc! See you next time.")
			connection.end()
		}
		else { 
			purchase()
		}
	});
};

function purchase () {
	connection.query("SELECT * FROM products", function(err, res) {
		if(err)	throw err; 
		values = [];
		for (var i = 0 ; i < res.length ; i++) {
			values.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price])
		};
		console.table(['Item ID','Item','Department','Price'], values);
		inquirer.prompt([
			{
				type: "input",
				name: "product", 
				message: "What will you like to buy (enter Item ID)?", 
				validate: function (value) { 
					if (isNaN(value) === false) {
						return true 
					} 
					else {
						return false 
					}
				}
			}, 
			{
				type: "input",
				name: "quantity", 
				message: "How many will you like to buy?",
				validate: function (value) { 
					if (isNaN(value) === false) {
						return true 
					} 
					else {
						return false 
					}
				}
			}
		]).then(function(response) {
			connection.query("SELECT * FROM products WHERE item_id=?", [response.product], function(err, res) {
				if (err) throw err; 
				if (response.quantity > res[0].stock_quantity) {
					console.log("Sorry! We only have " + res[0].stock_quantity + " left. Please reenter the quantity.")
					purchase()
				}
				else {
					var sales = res[0].price * response.quantity; 
					console.log("Your total is: $" + sales);
					var newSales = res[0].product_sales + sales;  
					var newQuantity = res[0].stock_quantity - response.quantity ; 
					connection.query(
				    "UPDATE products SET ? WHERE ?",
				    [
				      {
				        stock_quantity: newQuantity
				      },
				      {
				        item_id: response.product
				      }
				    ],
				    function(err, res) {
				    	if (err) throw err; 
				    	console.log(res.affectedRows + " inventory updates") 
				    }
				  );
					connection.query(
				    "UPDATE products SET ? WHERE ?",
				    [
				      {
				        product_sales: newSales
				      },
				      {
				        item_id: response.product
				      }
				    ],
				    function(err, res) {
				    	if (err) throw err; 
				    	console.log("Thank you for your purchase!") 
				    	continueShop()
				    }
				  );
				};
			});
		}); 
	});
};
