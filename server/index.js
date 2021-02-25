const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
require('dotenv').config();

const authRoutes = require('./routes/auth');

const clientURL = process.env.CLIENT_URL || 'http://localhost:3000',
  port = process.env.PORT || 4000,
  dbCollection = process.env.DB_NAME || 'meditatree',
  mongoURL = `mongodb://localhost/${dbCollection}`,
  sessionSecret = process.env.SESSION || 'banana';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  cors({
    origin: clientURL,
    credentials: true,
  })
);

app.use(
  session({
    name: 'meditatree',
    secret: sessionSecret,
    resave: 'false',
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    },
    store: MongoStore.create({
      mongoUrl: mongoURL,
    }),
  })
);

require('./models/user.js');

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Up at http://localhost:${port}`);
});
