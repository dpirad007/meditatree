const express = require('express');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

const User = require('../models/user');
const Group = require('../models/group');
const { populate } = require('../models/user');

router.use(isAuth);

router.get('/streak', async (req, res) => {
  try {
    const username = req.session.username;
    const user = await User.findOne({ username });

    res.send({ data: user.streak.current_streak, error: null });
  } catch (error) {
    res.send({ data: null, error: 'something went wrong' });
    console.error(error);
  }
});

router.put('/xp', async (req, res) => {
  try {
    const username = req.session.username;
    const xp = req.body.xp;
    const user = await User.findOne({ username });

    user.xp += xp;

    const lastDate = user.streak.last_session;
    const nextDay = new Date(lastDate);
    nextDay.to;
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    user[today.toDateString()] = true;

    if (nextDay === today) {
      user.streak.current_streak++;
    } else {
      user.streak.current_streak = 1;
    }
    user.streak.last_session = today;

    await user.save();

    res.send({ data: true, error: null });
  } catch (error) {
    res.send({ data: null, error: 'something went wrong' });
    console.error(error);
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const username = req.session.username;
    const user = await User.findOne({ username })
      .populate({
        path: 'group_id',
        populate: {
          path: 'users',
          select: 'username xp',
        },
      })
      .exec();

    const peers = user.group_id.users.map(({ username, xp }) => ({
      username,
      xp,
    }));
    res.send({ data: peers, error: null });
  } catch (error) {
    res.send({ data: null, error: 'something went wrong' });
    console.error(error);
  }
});

module.exports = router;
