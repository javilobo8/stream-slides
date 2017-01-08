const express = require('express');
const path = require('path');

const app = express();

const port = 7215;

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/file', express.static(path.join(__dirname, 'files')));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log('---Lobo---');
  console.log('\r\nAeolux donation server listening at http://localhost:%s', port)
});