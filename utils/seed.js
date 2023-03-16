const connection = require('../config/connection');
const { Thought, User } = require('../models');
const {
  getRandomUserName,
  getRandomReaction,
  getRandomThought,
  genRandomIndex,
} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await Thought.deleteMany({});
  await User.deleteMany({});
  const userData =[]
  // Empty arrays for randomly generated posts and reactions
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
  // Makes reactions array
  const makeThought = (thoughtText) => {
    thoughts.push({
      thoughtText,
      username: getRandomUserName().split(' ')[0],
      reactions: [reactions[genRandomIndex(reactions)]._id],
    });
  };

  // Wait for the reactions to be inserted into the database
  await User.collection.insertMany(userData);

  // For each of the reactions that exist, make a random post of 10 words
  reactions.forEach(() => makeThought(getRandomThought(10)));

  // Wait for the posts array to be inserted into the database
  await Thought.collection.insertMany(thoughts);

  // Log out a pretty table for reactions and posts
  console.table(reactions);
  console.table(thoughts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});