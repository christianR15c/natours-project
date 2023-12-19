const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware...');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const { tourId } = req.params;

  if (tourId > tours.length || !tourId)
    return res.status(404).json({ status: 'fail', message: 'Invalid id' });
  let tour = tours.find((tour) => tour.id === tourId * 1);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const { tourId } = req.params;

  let tour = tours.find((tour) => tour.id === tourId * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const deleteTour = (req, res) => {
  const { tourId } = req.params;

  let tour = tours.find((tour) => tour.id === tourId * 1);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:tourId')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.post('/', (req, res) => {
  res.send('You can post using this endpoint...');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}...`);
});
