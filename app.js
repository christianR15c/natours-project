const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// get a single tour
app.get('/api/v1/tours/:tourId', (req, res) => {
  const { tourId } = req.params;

  if (tourId > tours.length || !tour)
    return res.status(404).json({ status: 'fail', message: 'Invalid id' });
  const tour = tours.find((tour) => tour.id === tourId * 1);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// add the tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  newTour = Object.assign({ id: newId }, req.body);

  console.log(req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// update some properties of the tour
app.patch('/api/v1/tours/:id', (req, res) => {
  const { tourId } = req.params;

  let tour = tours.find((tour) => tour.id === tourId * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// delete the tour
app.delete('/api/v1/tours/:id', (req, res) => {
  const { tourId } = req.params;

  let tour = tours.find((tour) => tour.id === tourId * 1);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

app.post('/', (req, res) => {
  res.send('You can post using this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}...`);
});
