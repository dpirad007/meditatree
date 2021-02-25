const express = require('express');
const router = express.Router();
const argon2 = require('argon2');

const User = require('../models/user');
const isAuth = require('../middleware/isAuth');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const doc = await User.findOne({ username });
    if (doc) {
      res.send({
        data: null,
        error: [{ field: 'username', message: 'user already exists' }],
      });
      return;
    }
    const hashedPassword = await argon2.hash(password);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    req.session.username = doc.username;
    req.session.save(err => {
      if (err) throw err;
    });
    res.send({
      data: { username: doc.username },
      error: null,
    });
  } catch (err) {
    console.error(error);
    res.send({ data: null, error: 'unknown error occurred' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const doc = await User.findOne({ username });
    if (doc === null) {
      res.send({
        data: null,
        error: [{ field: 'username', message: "user doesn't exist" }],
      });
      return;
    }
    if (!(await argon2.verify(doc.password, password))) {
      res.send({
        data: null,
        error: [{ field: 'password', message: 'incorrect password' }],
      });
      return;
    }
    req.session.username = doc.username;
    req.session.save(err => {
      if (err) throw err;
    });
    res.send({
      data: { username: doc.username },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.send({ data: null, error: 'unknown error occurred' });
  }
});

router.post('/logout', isAuth, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.send({ data: null, error: 'unknown error occurred' });
    } else {
      res.send({ data: true, error: null });
    }
  });
});

router.get('/me', isAuth, async (req, res) => {
  const username = req.session.username;
  try {
    const user = await User.findOne({ username });
    if (user === null) {
      res.send({
        data: null,
        error: "user doesn't exist",
      });
      return;
    }
    res.send({
      data: { username: user.username, name: user.name },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.send({ data: null, error: 'unknown error occurred' });
  }
});

module.exports = router;
