import pdfParse from 'pdf-parse';
import { promises as fs } from 'fs';

/**
 * Parses the content of a document.
 * @param {string} filePath - Path to the file to be parsed.
 * @returns {Promise<string>} - The text content of the document.
 * @throws {Error} - Throws error if the file format is unsupported.
 */
const parseDocument = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);

        if (filePath.endsWith('.pdf')) {
            const pdfData = await pdfParse(dataBuffer);
            return pdfData.text;
        } else if (filePath.endsWith('.txt')) {
            return dataBuffer.toString('utf-8');
        } else {
            throw new Error('Unsupported file format.');
        }
    } catch (error) {
        throw new Error(`Error parsing document: ${error.message}`);
    }
};

export default parseDocument;
