const mongoose = require('mongoose');

module.exports = async () => {
  // Connect to a new test database (assumes MongoDB)
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected for testing');
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};
