import { Database } from "bun:sqlite";

const db = new Database("db/db.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL
    )
`);

function addProduct(name: string, price: number, stock_quantity: number) {
    const stmt = db.prepare(`
        INSERT INTO products (name, price, stock_quantity)
        VALUES (?, ?, ?)
    `);

    const result = stmt.run(name, price, stock_quantity);
    console.log(`Product added with ID: ${result.lastInsertRowid}`);
}

function removeProduct(id: number) {
    const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
    const result = stmt.run(id);
    
    if (result.changes > 0) {
        console.log(`Product with ID ${id} removed`);
    } else {
        console.log(`No product found with ID ${id}`);
    }
}

function inputAddProduct() {
    const name = prompt("Enter product name: ");
    const price = parseFloat(prompt("Enter price: ") || "0");
    const stockQuantity = parseInt(prompt("Enter stock quantity: ") || "0");
    
    addProduct(name, price, stockQuantity);
}

function inputRemoveProduct() {
    const id = parseInt(prompt("Enter product ID to remove: ") || "0");
    removeProduct(id);
}

function showMenu() {
    console.log("\n=== INVENTORY MANAGEMENT SYSTEM ===");
    console.log("1. Add Product");
    console.log("2. Search Products");
    console.log("3. Update Product");
    console.log("4. Remove Product");
    console.log("5. Exit");
    console.log("=====================================");
}

function mainMenu() {
    while (true) {
        showMenu();
        const choice = prompt("Choose an option (1-5): ");
        
        switch (choice) {
            case "1":
                inputAddProduct();
                break;
            case "2":
                console.log("SEARCH FEATURE COMING SOON BOAHHHHHH >:]");
                break;
            case "3":
                console.log("UPDAITE FEATURE COMING SOON BOAHHHHHH >:]");
                break;
            case "4":
                inputRemoveProduct();
                break;
            case "5":
                console.log("byeeeeee 😘");
                process.exit(0);
            default:
                console.log("Invalid option retard. choose 1-5.");
        }
    }
}

mainMenu();