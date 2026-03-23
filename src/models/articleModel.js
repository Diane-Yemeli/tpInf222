const { db } = require('../db/db');

function rowToArticle(row) {
    return {
        id: row.id,
        titre: row.titre,
        contenu: row.contenu,
        auteur: row.auteur,
        date: row.date,
        categorie: row.categorie,
        tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    }

    function normalizeTags(tags) {
    if (Array.isArray(tags)) return tags.join(',');
    return String(tags || '');
    }

    async function createArticle({ titre, contenu, auteur, date, categorie, tags }) {
    const tagsStr = normalizeTags(tags);

    const [result] = await db.execute(
        `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [titre, contenu, auteur, date, categorie, tagsStr]
    );

    return { id: result.insertId };
    }

    async function getAllArticles({ categorie, auteur, date }) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (categorie) { query += ' AND categorie = ?'; params.push(categorie); }
    if (auteur) { query += ' AND auteur = ?'; params.push(auteur); }
    if (date) { query += ' AND date = ?'; params.push(date); }

    const [rows] = await db.execute(query, params);
    return rows.map(rowToArticle);
    }

    async function getArticleById(id) {
    const [rows] = await db.execute(`SELECT * FROM articles WHERE id = ?`, [id]);
    if (!rows.length) return null;
    return rowToArticle(rows[0]);
    }

    async function updateArticle(id, { titre, contenu, categorie, tags }) {
    const tagsStr = normalizeTags(tags);

    const [result] = await db.execute(
        `UPDATE articles
        SET titre = ?, contenu = ?, categorie = ?, tags = ?
        WHERE id = ?`,
        [titre, contenu, categorie, tagsStr, id]
    );

    return { updated: result.affectedRows };
    }

    async function deleteArticle(id) {
    const [result] = await db.execute(`DELETE FROM articles WHERE id = ?`, [id]);
    return { deleted: result.affectedRows };
    }

    async function searchArticles(queryText) {
    const q = `%${queryText}%`;
    const [rows] = await db.execute(
        `SELECT * FROM articles
        WHERE titre LIKE ? OR contenu LIKE ?`,
        [q, q]
    );
    return rows.map(rowToArticle);
    }

    module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
};