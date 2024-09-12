
import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import url from 'url';
import mongoose from 'mongoose';
import fileUploadRoute from './routes/fileUpload.js';
import chatbotRoute from './routes/chatbot.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.use('/api/upload', fileUploadRoute);
app.use('/api/ask', chatbotRoute);

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend/public/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
