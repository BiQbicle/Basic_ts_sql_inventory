import { Database } from "bun:sqlite";

const db = new Database("db/db.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )
`)

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT , 
        name TEXT NOT NULL, 
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL,
        category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id)
        )
`);

function addProduct(name: string, price: number, stock_quantity: number, category_id: number) {
    const stmt = db.prepare(`
    INSERT INTO products (name, price, stock_quantity, category_id)
    VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, price, stock_quantity, category_id);
    console.log(`Product added with ID: ${result.lastInsertRowid}`);
    
}

addProduct('Laptop', 999.99, 5, 1);