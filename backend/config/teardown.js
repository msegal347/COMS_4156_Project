const mongoose = require('mongoose');

module.exports = async () => {
  // Disconnect from the test database
  try {
    await mongoose.connection.close();
    console.log('Database disconnected after testing');
  } catch (error) {
    console.error(`Database disconnection error: ${error}`);
    process.exit(1);
  }
};
