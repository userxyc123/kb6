const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

// Define the path to the knowledge base file
const knowledgeBasePath = path.join(__dirname, 'knowledge_base.json');

// Route to get the knowledge base
app.get('/knowledge_base', (req, res) => {
    fs.readFile(knowledgeBasePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading knowledge base');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Route to update the knowledge base
app.post('/knowledge_base', (req, res) => {
    fs.readFile(knowledgeBasePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading knowledge base');
            return;
        }

        const knowledgeBase = JSON.parse(data);
        knowledgeBase.questions.push(req.body);

        fs.writeFile(knowledgeBasePath, JSON.stringify(knowledgeBase, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error updating knowledge base');
                return;
            }
            res.status(200).send('Knowledge base updated');
        });
    });
});

// Export the app for Vercel
module.exports = app;
