const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/', (req, res) => {
  res.send('You can post using this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}...`);
});
