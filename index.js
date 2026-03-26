const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');
const textRoutes = require('./src/routes/text.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/text', textRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/docs`);
});