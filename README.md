# Invoice Management System

Simple invoice management system with MongoDB and Express API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with MongoDB connection:
```
PORT=3000
MONGO_URI=mongodb+srv://harishsugandhi09_db_user:xWphXAPFPyBMOAJC@thinkbridge.5d2rf4f.mongodb.net/?retryWrites=true&w=majority&appName=thinkbridge
NODE_ENV=development
```

3. Seed the database:
```bash
node seedData.js
```

4. Start the server:
```bash
npm start
```

## URLs

- Frontend: http://localhost:3000
- API: http://localhost:3000/api/invoices
- API Docs: http://localhost:3000/api-docs

## Features

- View invoice items
- Click items to see details
- MongoDB database integration
- REST API with Swagger docs
