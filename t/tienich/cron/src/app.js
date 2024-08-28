const express = require('express');
const bodyParser = require('body-parser');
const cronManager = require('./cronManager');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Setup routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
