const connection = require('../config/connection');
const { Thought, User } = require('../models');
const {
  getRandomUserName,
  getRandomReaction,
  getRandomThought,
  genRandomIndex,
} = require('./data');

// seeding timer
console.time('seeding');

// mongodb connect
connection.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});
  const userData =[]
  // Empty arrays for randomly generated posts and reactions for insomnia
  const reactions = [...getRandomReaction(10)];
  const thoughts = [];
  for(let i=0; i<10; i++ ){
    const username = getRandomUserName().split(' ')[0]
    const email= `${username}@${username}.com`
    userData.push({
      email,
      username
    });
  }
  //generates reaction array
  const makeThought = (thoughtText) => {
    thoughts.push({
      thoughtText,
      username: getRandomUserName().split(' ')[0],
      reactions: [reactions[genRandomIndex(reactions)]._id],
    });
  };

  // reachtions insterted in db
  await User.collection.insertMany(userData);

