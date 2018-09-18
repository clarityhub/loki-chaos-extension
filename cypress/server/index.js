const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '..', '..', 'build')));
app.get('/api/test', (req, res) => {
  res.status(200).json({});
});

app.listen(port, () => console.log('Server running'));
