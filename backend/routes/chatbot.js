import express from 'express';

// Dynamic import to load node-fetch
const getFetch = async () => {
    const { default: fetch } = await import('node-fetch');
    return fetch;
};

const router = express.Router();

router.post('/', async (req, res) => {
    const question = req.body.question;
    const documentContent = req.app.locals.documentContent;

    if (!documentContent) {
        return res.status(400).send({ answer: 'Please upload a policy document first.' });
    }

    try {
        const fetch = await getFetch();
        const response = await fetch(process.env.PYTHON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, document: documentContent }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.send({ answer: data.answer });
    } catch (error) {
        console.error('Error in chatbot route:', error);
        res.status(500).send({ answer: 'An error occurred while processing your request.' });
    }
});

export default router;
