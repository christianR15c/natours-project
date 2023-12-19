const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

router.param('tourId', (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  next();
});

router.route('/').get(getAllTours).post(createTour);
router.route('/:tourId').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
