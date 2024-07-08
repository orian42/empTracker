const express = require('express');
const { title, mainMenu } = require('./prompts.js');

const PORT = process.env.PORT || 3001;
const app = express();

console.clear;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    title();  
    mainMenu();//Call function to begin application
});
