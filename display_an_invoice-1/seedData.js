require('dotenv').config();
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const sampleInvoices = [
    {
        invoiceNumber: "INV-2024-001",
        date: new Date('2024-09-01'),
        dueDate: new Date('2024-10-01'),
        customer: {
            name: "ThinkBridge Solutions",
			address: "Amar Business St, Tech City, TC, Pune",
            email: "contact@thinkbridge.com",
            phone: "+919890247437"
        },
        items: [
            { name: "Web Development Services", price: 2500.00, quantity: 1 },
            { name: "UI/UX Design", price: 1200.00, quantity: 1 },
            { name: "Testing & QA", price: 800.00, quantity: 1 }
        ],
        tax: 450,
        status: "sent"
    },
    {
        invoiceNumber: "INV-2024-002",
        date: new Date('2024-09-15'),
        dueDate: new Date('2024-10-15'),
        customer: {
            name: "Digital Solutions Inc",
			address: "Amar Business St, Tech City, TC, Pune",
			email: "testing@thinkbridge.fun",
			phone: "+919890247437"
        },
        items: [
            { name: "Mobile App Development", price: 5000.00, quantity: 1 },
            { name: "Backend API Development", price: 3000.00, quantity: 1 },
            { name: "Cloud Infrastructure Setup", price: 1500.00, quantity: 1 }
        ],
        tax: 850,
        status: "paid"
    },
    {
        invoiceNumber: "INV-2024-003",
        date: new Date('2024-09-20'),
        dueDate: new Date('2024-10-20'),
        customer: {
            name: "E-Commerce Experts",
            address: "Amar Business St, Tech City, TC, Pune",
            email: "testing@thinkbridge.com",
			phone: "+919890247437"
        },
        items: [
            { name: "E-commerce Platform Development", price: 8000.00, quantity: 1 },
            { name: "Payment Gateway Integration", price: 1200.00, quantity: 1 },
            { name: "SEO Optimization", price: 800.00, quantity: 1 }
        ],
        tax: 1000,
        status: "draft"
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await Invoice.deleteMany({});
        console.log('Existing invoices cleared');

        const createdInvoices = await Invoice.insertMany(sampleInvoices);
        console.log(`${createdInvoices.length} sample invoices created`);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();