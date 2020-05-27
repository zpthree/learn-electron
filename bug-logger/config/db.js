const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://fakeUser:fakePassword@learn-electron-nwlxz.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
    console.log('mongdb commectejfj');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
