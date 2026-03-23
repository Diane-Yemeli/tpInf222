const {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
} = require('../models/articleModel');

function validateCreatePayload(body) {
    const required = ['titre', 'contenu', 'auteur', 'date', 'categorie', 'tags'];
    for (const field of required) {
        if (body[field] === undefined || body[field] === null || String(body[field]).trim() === '') {
        return `Champ manquant/invalid: ${field}`;
        }
    }
    return null;
}

function validateUpdatePayload(body) {
    const allowed = ['titre', 'contenu', 'categorie', 'tags'];
    let hasAtLeastOne = false;

    for (const field of allowed) {
        if (body[field] !== undefined) {
            hasAtLeastOne = true;
            if (body[field] === null || String(body[field]).trim() === '') {
                return `Champ invalid: ${field}`;
            }
        }
    }

    if (!hasAtLeastOne) return 'Au moins un champ est requis pour la mise à jour';

    return null;
}

async function create(req, res) {
    try {
        const error = validateCreatePayload(req.body);
        if (error) return res.status(400).json({ message: error });

        const { titre, contenu, auteur, date, categorie, tags } = req.body;
        const result = await createArticle({ titre, contenu, auteur, date, categorie, tags });

        return res.status(201).json({ message: 'Article créé', id: result.id });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

async function getAll(req, res) {
    try {
        const { categorie, auteur, date } = req.query;
        const filters = {};
        if (categorie && categorie.trim()) filters.categorie = categorie;
        if (auteur && auteur.trim()) filters.auteur = auteur;
        if (date && date.trim()) filters.date = date;

        const articles = await getAllArticles(filters);
        return res.status(200).json(articles);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

async function getOne(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Id invalide' });

        const article = await getArticleById(id);
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });
        return res.status(200).json(article);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

async function update(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Id invalide' });

        const error = validateUpdatePayload(req.body);
        if (error) return res.status(400).json({ message: error });

        const { titre, contenu, categorie, tags } = req.body;
        const result = await updateArticle(id, { titre, contenu, categorie, tags });

        if (result.updated === 0) return res.status(404).json({ message: 'Article non trouvé' });
        return res.status(200).json({ message: 'Article mis à jour', updated: result.updated });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'Id invalide' });

        const result = await deleteArticle(id);

        if (result.deleted === 0) return res.status(404).json({ message: 'Article non trouvé' });
        return res.status(200).json({ message: 'Article supprimé', deleted: result.deleted });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

async function search(req, res) {
    try {
        const queryText = req.query.query;
        if (queryText === undefined || String(queryText).trim() === '') {
        return res.status(400).json({ message: 'query est requis' });
        }

        const results = await searchArticles(queryText.trim());
        return res.status(200).json(results);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur serveur', error: String(e) });
    }
}

module.exports = { create, getAll, getOne, update, remove, search };