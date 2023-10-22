const db = require('./Models/sql'); // Replace with the path to your db.js file

// Attempt to connect to the database
const connect= db.connect()
  .then(() => {
    // Database connection successful
    console.log('Connected to the  sql database');

    // Example SELECT query
    // return db.any('SELECT * FROM your_table');
  })
  .catch((error) => {
    // Handle connection or query errors
    console.error('Error:', error);
  })
 
module.export= {connect}