const express = require('express');
const router = express.Router();
const textController = require('../controllers/text.controller');

/**
 * @swagger
 * /text/process:
 *   post:
 *     summary: Invierte texto por paréntesis de adentro hacia afuera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "(Hola (Mundo))"
 *     responses:
 *       200:
 *         description: Pasos de la inversión
 */
router.post('/process', textController.process);

/**
 * @swagger
 * /text/transform:
 *   post:
 *     summary: Aplica tres transformaciones al texto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Hello world! This is a test. Hello again."
 *     responses:
 *       200:
 *         description: Texto transformado
 */
router.post('/transform', textController.transform);

module.exports = router;