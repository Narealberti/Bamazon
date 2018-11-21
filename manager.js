var inquirer = require('inquirer'); 
var mysql = require('mysql'); 
var table = require('console.table'); 
var values = []; 
var departmentArr = []; 

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
  manage()
});

function continueManage () {
	inquirer.prompt([
		{
			type: "list",
			name: "repeat", 
			message: "Will you like to do something else?", 
			choices: ["YES", "NO"]
		}
	]).then(function(response) {
		if (response.repeat === "NO") {
			console.log("Exit Store Management System.")
			connection.end()
		}
		else { 
			manage()
		}
	});
};

function viewInventory () {
	connection.query("SELECT * FROM products", function(err, res) { 
		if(err)	throw err; 
		values = [];
		for (var i = 0 ; i < res.length ; i++) {
			values.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity, "$" + res[i].product_sales])
		};
		console.table(['Item ID','Item','Department','Price', 'Inventory', 'Sales'], values);
		continueManage()
	});
}

function lowInventory () {
	connection.query("SELECT * FROM products", function(err, res) { 
		if(err)	throw err; 
		values = [];
		for (var i = 0 ; i < res.length ; i++) {
			if (res[i].stock_quantity < 5) {
				values.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity, "$" + res[i].product_sales])
			}; 
		};
		console.table(['Item ID','Item','Department','Price', 'Inventory', 'Sales'], values);
		continueManage()
	});
}

function addInventory () {
	connection.query("SELECT * FROM products", function(err, res) { 
		if(err)	throw err; 
		values = [];
		for (var i = 0 ; i < res.length ; i++) {
			values.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity, "$" + res[i].product_sales])
		};
		console.table(['Item ID','Item','Department','Price', 'Inventory', 'Sales'], values);
		inquirer.prompt([
			{
				type: "input",
				name: "addProduct", 
				message: "Which product will you like to add to (enter Item ID)?", 
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
				name: "quantityIncrease", 
				message: "How many will you like to add?", 
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
			connection.query("SELECT * FROM products WHERE item_id=?", [response.addProduct], function (err, res) {
				if (err) throw err; 
				var currentProuct = res[0].product_name
				var updatedQuantity = res[0].stock_quantity + parseInt(response.quantityIncrease)
				connection.query(
					"UPDATE products SET ? WHERE ?", 
					[
						{
							stock_quantity: updatedQuantity
						},
						{
							item_id: response.addProduct
						}
					], 
					function(err, res) { 
						if (err) throw err; 
						console.log(response.quantityIncrease + " units has been added to " + currentProuct);
						continueManage()
				});
			});
		});
	});
}

function addProduct () {
	connection.query("SELECT * FROM departments", function (err, res) { 
		if (err) throw err; 
		departmentArr = [];
		for (var i = 0; i < res.length; i++) {
			departmentArr.push(res[i].department_name)
		}; 
		inquirer.prompt([
			{
				type:"input",
				name:"productName",
				message:"What is the name of this new product?"
			},
			{
				type:"rawlist",
				name:"departmentName",
				message:"Which department does this product belong to?",
				choices: departmentArr,
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
				name: "productQuantity", 
				message: "How many of this product are we starting off with?", 
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
				name: "productPrice", 
				message: "What is the price of this product?", 
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
			connection.query('INSERT INTO products SET ?', {product_name: response.productName, department_name: response.departmentName, price: response.productPrice, stock_quantity: response.productQuantity}, function (error, results, fields) {
	  			if (error) throw error;
	  			console.log(response.productName + " has been added to " + response.departmentName + " department with item_id of " + results.insertId)
	  			continueManage()
			});
		});
	});
}

function manage () {
	connection.query("SELECT * FROM products", function(err, res) { 
		if(err)	throw err; 
		inquirer.prompt([
			{
				type: "list",
				name: "actions", 
				message: "What will you like to do?",
				choices: ["View Products","View Low Inventory","Add to Inventory","Add New Product"]
			}
		]).then(function(response) {
			if (response.actions === "View Products") {
				viewInventory()
			} else if (response.actions === "View Low Inventory") {
				lowInventory()
			} else if (response.actions === "Add to Inventory") {
				addInventory()
			} else if (response.actions === "Add New Product") {
				addProduct()
			}
			
		});
	});
}
