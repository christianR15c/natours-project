const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const { checkBody } = require('../middleware/checkBody');

const router = express.Router();

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:tourId').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
