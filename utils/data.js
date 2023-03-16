const usernames = [
    'SixToes',
    'LeoTaylor',
    'PumpkinTaylor',
    'CookingMama',
    'GamerGuy',
    'ManExample',
    'MelTaylor',
    'DarkChocolate',

  ];

  const thought = [
    'Love learning web development',
    'I am a cat meow',
    'Politics these days...',
    'Check this new recipe',

  ];
  
  
  const reactions = [
    'Like!',
    'Dislike!',
    'Funny',
    'Sad',
    'Heartwarming',
 
  ];
  

  const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  
  const getRandomWord = () => `${thought[genRandomIndex(thought)]}`;
  
  const getRandomThought = (words) => {
    let post = '';
    for (let i = 0; i < words; i++) {
      post += ` ${getRandomWord()}`;
    }
    return post;
  };
  
  // random array code for names and thoughts
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  

  const getRandomUserName = () =>
    `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;
  
  
  const getRandomReaction = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        text: getRandomArrItem(reactions),
        username: getRandomUserName().split(' ')[0],
      });
    }
    return results;
  };
  
  // Export for seeds
  module.exports = {
    getRandomUserName,
    getRandomReaction,
    getRandomThought,
    genRandomIndex,
  };
