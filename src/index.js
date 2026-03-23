    const express = require('express');
    const cors = require('cors');
    const swaggerUi = require('swagger-ui-express');
    const { swaggerSpec } = require('./swagger/swagger');
    const { router } = require('./routes/articles');
    const { initDb } = require('./db/db');

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
    res.json({ message: 'Blog API Backend - TAF1' });
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', router);

    const PORT = process.env.PORT || 3000;

    initDb()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((e) => {
        console.error('DB init failed:', e);
        process.exit(1);
    });