import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parseDocument from '../middleware/parseDocument.js';

const router = express.Router();

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../uploads/');

router.post('/', (req, res) => {
    if (!req.files || !req.files.policy) {
        return res.status(400).send('No file was uploaded.');
    }

    const policyDocument = req.files.policy;
    const uploadPath = path.join(uploadDir , policyDocument.name);

    policyDocument.mv(uploadPath, async err => {
        if (err) return res.status(500).send(err);

        try {
            const textContent = await parseDocument(uploadPath);
            req.app.locals.documentContent = textContent;
            res.status(200).send('File uploaded and parsed successfully.');
        } catch (parseError) {
            res.status(500).send(`Error parsing document: ${parseError.message}`);
        }
    });
});

export default router;
