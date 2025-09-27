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

function searchProducts() {
    const searchTerm = prompt("Enter product name or ID to search: ") || "";
    const stmt = db.prepare(`
        SELECT * FROM products 
        WHERE name LIKE ? OR id = ?
    `);
    
    const results = stmt.all(`%${searchTerm}%`, parseInt(searchTerm) || -1);
    
    if (results.length === 0) {
        console.log("No products found.");
    } else {
        console.log("\n--- Search Results ---");
        results.forEach((product: any) => {
            console.log(`ID: ${product.id} | Name: ${product.name} | Price: $${product.price} | Stock: ${product.stock_quantity}`);
        });
    }
}

function updateProduct() {
    const id = parseInt(prompt("Enter product ID to update: ") || "0");
    
    const checkStmt = db.prepare(`SELECT * FROM products WHERE id = ?`);
    const existing = checkStmt.get(id);
    
    if (!existing) {
        console.log(`No product found with ID ${id}`);
        return;
    }
    
    const newName = prompt("Enter new name: ");
    const newPrice = parseFloat(prompt("Enter new price: ") || "0");
    const newStock = parseInt(prompt("Enter new stock quantity: ") || "0");
    
    const updateStmt = db.prepare(`
        UPDATE products 
        SET name = ?, price = ?, stock_quantity = ? 
        WHERE id = ?
    `);
    
    const result = updateStmt.run(newName, newPrice, newStock, id);
    
    if (result.changes > 0) {
        console.log(`Product with ID ${id} updated`);
    } else {
        console.log(`Failed to update product with ID ${id}`);
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
                searchProducts();
                break;
            case "3":
                updateProduct();
                break;
            case "4":
                inputRemoveProduct();
                break;
            case "5":
                console.log("byeeeee 😘");
                process.exit(0);
            default:
                console.log("wrong option retard. pwease choose 1-5.");
        }
    }
}

mainMenu();