const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController');

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles du blog
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titre, contenu, auteur, date, categorie, tags]
 *             properties:
 *               titre: { type: string }
 *               contenu: { type: string }
 *               auteur: { type: string }
 *               date: { type: string, example: "2026-03-18" }
 *               categorie: { type: string }
 *               tags:
 *                 oneOf:
 *                   - type: array
 *                     items: { type: string }
 *                   - type: string
 *     responses:
 *       201: { description: Article créé }
 *       400: { description: Requête mal formée }
 */
router.post('/articles', controller.create);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Lister les articles (optionnellement filtrés)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema: { type: string }
 *       - in: query
 *         name: auteur
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string }
 *     responses:
 *       200: { description: Liste d’articles }
 */
router.get('/articles', controller.getAll);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Obtenir un article par id
 *     tags: [Articles]
 */
router.get('/articles/:id', controller.getOne);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 */
router.put('/articles/:id', controller.update);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 */
router.delete('/articles/:id', controller.remove);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher un article par texte
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: { type: string }
 */
router.get('/articles/search', controller.search);

module.exports = { router };

