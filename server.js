const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/projects', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./projects.json'));
  res.json(data);
});

// app.use('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
