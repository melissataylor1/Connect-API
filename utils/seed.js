const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop Users
  await User.deleteMany({});

  // Drop Thoughts
  await Thought.deleteMany({});

  // Thoughts seed
  const thoughts = [
    {
      thoughtText: "This is my thought...",
      userName: 'Mel1998',
    },
    {
      thoughtText: 'Politics these days..',
      userName: 'PoliSciGuy',
    },
    {
      thoughtText: 'Check out this recipe!',
      userName: 'CookingMama',
    },

  ];

  // Add Thoughts
  await Thought.collection.insertMany(thoughts);

  // Users Seeed
  await User.collection.insertMany([
    {
      userName: 'Mel1998',
      email: 'meltaylor@hotmail.com',
    },
    {
      userName: 'PoliSciGuy',
      email: 'bigbrain@gmail.com',
    },
    {
      userName: 'CookingMama',
      email: 'loves2cook@live.com',
    },
    {
      userName: 'OrangeTabby',
      email: 'leotaylor@gmail.com',
    },
    {
      userName: '6toes',
      email: 'pumpkin_taylor@rogers.com',
    },
  ]);


});