const { Schema, model,} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// initialize thought model
const Thought = model('thought', thoughtSchema);
module.exports = Thought;