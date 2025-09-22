require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

let isDBConnected = false;

connectDB().then(connected => {
    isDBConnected = connected;
});

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Invoice API',
            version: '1.0.0',
            description: 'Second Roundd Bro'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: false,
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .scheme-container { display: none }
        .swagger-ui .info { margin: 10px 0 }
        .swagger-ui .info .title { font-size: 24px; margin: 0 }
        .swagger-ui .info .description { margin: 10px 0 }
    `,
    customSiteTitle: "ThinkBridge Invoice API DOccs"
}));

app.use('/api/invoices', invoiceRoutes);

app.get('/api/invoice', async (req, res) => {
    try {
        const Invoice = require('./models/Invoice');
        const invoices = await Invoice.find().limit(3);
        if (invoices.length > 0) {
            res.json(invoices[0]);
		}
		else {
			res.status(404).json({ message: 'No invoices found' });
		}
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`Frontend: http://localhost:${PORT}`);
});