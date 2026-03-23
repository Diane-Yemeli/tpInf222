# Blog API Backend (TAF1 - INF222 EC1)

API REST permettant la gestion d’un blog simple : création, lecture, mise à jour, suppression et recherche d’articles.
La documentation de l’API est disponible via **Swagger UI**.

## Technologies
- Node.js + Express
- MariaDB (MySQL) via `mysql2`
- Swagger / Swagger UI
- (Optionnel) dotenv pour config

## Prérequis
- Node.js installé
- MariaDB / MySQL installé (LAMPP possible)
- Accès à une base de données (créée automatiquement si prévue dans le code)

## Installation
1. Cloner le projet :
```bash
git clone [LIEN_GITHUB]
cd [NOM_DU_REPO]

    Installer les dépendances :

bash

npm install

    Configurer la base de données :

    Vérifier le fichier .env (s’il existe) ou la configuration dans src/db (ou initDb).
    Exemple de variables possibles :

env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_taf1
DB_PORT=3306
PORT=3000

    Si ton projet inclut initDb() / création automatique de la DB + table articles, lance directement le serveur.

Lancer le serveur (développement)
bash

npm run dev

Le serveur démarre sur :

    http://localhost:[PORT] (souvent 3000)

Documentation API (Swagger)

Une interface Swagger est disponible ici :

    http://localhost:3000/api-docs

    Si ton port est différent, remplace 3000.

Endpoints API
1) Créer un article

POST /api/articles

Body (JSON) :
json

{
  "titre": "Test 1",
  "contenu": "Contenu de test",
  "auteur": "Diane",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": ["nodejs", "mysql"]
}

Réponse attendue :

    Status 201
    JSON contenant l’ID de l’article créé (selon ton implémentation)

2) Lister les articles (avec filtres optionnels)

GET /api/articles

Filtres (optionnels) :

    ?categorie=Tech
    ?auteur=Diane
    ?date=2026-03-23

3) Lire un article unique

GET /api/articles/:id
4) Modifier un article

PUT /api/articles/:id

Body (JSON) :
json

{
  "titre": "Test 1 modifié",
  "contenu": "Nouveau contenu",
  "categorie": "Tech",
  "tags": ["nodejs", "api"]
}

Réponse attendue :

    Status 200
    Confirmation de mise à jour (selon ton implémentation)

5) Supprimer un article

DELETE /api/articles/:id
6) Rechercher des articles

GET /api/articles/search?query=texte

Exemple :

    /api/articles/search?query=test

Tests manuels (exemples)
Exemple POST via curl
bash

curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Test 1",
    "contenu": "Contenu de test",
    "auteur": "Diane",
    "date": "2026-03-23",
    "categorie": "Tech",
    "tags": ["nodejs","mysql"]
  }'

Exemple GET
bash

curl http://localhost:3000/api/articles

Structure du projet (exemple)

    src/routes/ : routes
    src/controllers/ : logique des endpoints
    src/models/ : requêtes BD
    src/db/ : connexion BD et initialisation (initDb)
    src/swagger/ : configuration Swagger

(Adapte si ta structure diffère.)
Codes HTTP utilisés (bonnes pratiques)

    201 : création réussie
    200 : requête OK
    400 : requête mal formée (validation)
    404 : article introuvable
    500 : erreur serveur

Auteur

    [YEMELI MOGOU MERVEILLE DIANE]
    [24F2764]
    INF222 – EC1

Remarques

    Si tu as rencontré des erreurs de connexion DB, vérifier :
        DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
        que MariaDB tourne bien
        que la table articles existe ou que initDb() la crée

stata


### 2 petites infos à me donner pour que je te le personnalise parfaitement
1) Dans ton projet, le port est bien **3000** ? (ou autre dans `.env` / code)
2) Ton README doit mentionner comment s’appelle exactement ton dossier de base (dans ton code) : `blog_taf1` c’est bien ça ?

Réponds juste avec ces 2 infos (ou colle ton `.env` si tu l’as), et je te renvoie la version finale parfaitement adaptée.

