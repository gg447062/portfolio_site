const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

// app.use('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
