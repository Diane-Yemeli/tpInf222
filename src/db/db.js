const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '', // change si ton root a un mot de passe
    database: process.env.DB_NAME || 'blog_taf1',
    waitForConnections: true,
    connectionLimit: 10,
    });

    async function initDb() {
    // Crée la table si elle n'existe pas
    await db.query(`
        CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        contenu TEXT NOT NULL,
        auteur VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        categorie VARCHAR(100) NOT NULL,
        tags TEXT NOT NULL
        )
    `);
}

module.exports = { db, initDb };

