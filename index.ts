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

addProduct("lappytappy", 999.99, 5);
addProduct("chooha(mouse)", 29.99, 20);
addProduct("keyboard", 79.99, 15);

removeProduct(2);