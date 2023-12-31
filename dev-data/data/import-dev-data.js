const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' });

const databaseUrl = process.env.MONGODB_URL;
const databaseLocal = process.env.MONGODB_LOCAL;

mongoose
  .connect(databaseUrl)
  .then((connection) => console.log('DB connected successfully!!!...'));

//   read JSON file
const tours = JSON.parse(
  fs.readFileSync('dev-data/data/tours-simple.json', 'utf-8'),
);

// import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported!...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!...');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
