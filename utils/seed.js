const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Users
  await User.deleteMany({});

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Thoughts seed
  const thoughts = [
    {
      thoughtText: "Here's a cool thought...",
      userName: 'Amiko',
    },
    {
      thoughtText: 'Well, nice',
      userName: 'Lucia',
    },
    {
      thoughtText: 'I love to gamble, nice',
      userName: 'Al',
    },
    {
      thoughtText: 'Gamble all day everyday',
      userName: 'Sam',
    },
  ];

