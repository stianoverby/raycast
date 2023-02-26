const express = require('express');
const app = express();

app.use('/', (req, res) => {
    console.log(req.url);
  res.sendFile(__dirname + req.url);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});