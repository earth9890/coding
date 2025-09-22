const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
});

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    customer: {
        type: customerSchema,
        required: true
    },
    items: [{
        type: itemSchema,
        required: true
    }],
    subtotal: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['draft', 'sent', 'paid', 'overdue'],
        default: 'draft'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
invoiceSchema.pre("save", function (next) {
	let subtotal = 0;
	for (const item of this.items) {
		subtotal += item.price * item.quantity;
	}
	this.subtotal = subtotal;
	this.total = this.subtotal + this.tax;
	next();
});
  

module.exports = mongoose.model('Invoice', invoiceSchema);