const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const databaseUrl = process.env.MONGODB_URL;

mongoose
  .connect(databaseUrl)
  .then((connection) => console.log('DB connected successfully!!!...'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port: ${port}...`);
});
