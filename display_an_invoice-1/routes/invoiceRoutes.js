const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           description: Customer name
 *         address:
 *           type: string
 *           description: Customer address
 *         email:
 *           type: string
 *           description: Customer email
 *         phone:
 *           type: string
 *           description: Customer phone
 *
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: Item name
 *         price:
 *           type: number
 *           description: Item price
 *         quantity:
 *           type: number
 *           description: Item quantity
 *
 *     Invoice:
 *       type: object
 *       required:
 *         - invoiceNumber
 *         - customer
 *         - items
 *       properties:
 *         invoiceNumber:
 *           type: string
 *           description: Unique invoice number
 *         date:
 *           type: string
 *           format: date
 *           description: Invoice date
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date
 *         customer:
 *           $ref: '#/components/schemas/Customer'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         subtotal:
 *           type: number
 *           description: Subtotal amount
 *         tax:
 *           type: number
 *           description: Tax amount
 *         total:
 *           type: number
 *           description: Total amount
 *         status:
 *           type: string
 *           enum: [draft, sent, paid, overdue]
 *           description: Invoice status
 *         notes:
 *           type: string
 *           description: Additional notes
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;