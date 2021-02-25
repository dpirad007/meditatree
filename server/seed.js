const argon2 = require('argon2');
const mongoose = require('mongoose');
require('dotenv').config();

const dbCollection = process.env.DB_NAME || 'meditatree',
  mongoURL = `mongodb://localhost/${dbCollection}`;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const User = require('./models/user');
const Group = require('./models/group');

const addUsers = async () => {
  try {
    const users = [];
    for (let i = 1; i <= 120; ++i) {
      const username = 'test' + i;
      const user = new User({
        username,
        password: await argon2.hash(username),
        division: Math.floor(i / 30) + 1,
      });
      users.push(user);
    }
    await User.insertMany(users);
    console.log('Users added');
  } catch (error) {
    console.error(error.message);
  }
};

const createGroups = async () => {
  try {
    for (let i = 1; i <= 4; ++i) {
      const users = (await User.find({ division: i })).map(({ id }) => id);
      const group = new Group({ users: users });
      await group.save();

      await Promise.all(
        users.map(async id => {
          await User.findByIdAndUpdate(id, { group_id: group.id });
        })
      );
      console.log('Groups linked');
    }
  } catch (error) {
    console.error(error.message);
  }
};

(async () => {
  await addUsers();
  await createGroups();
})();
