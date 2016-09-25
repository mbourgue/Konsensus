'use strict';

import mongoose from 'mongoose';

var ChunkSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  sources: [{ url: String }], 
  shared: Number,
  rank: Number,
  points: { type: Number, default: 0 }
});

export default mongoose.model('Chunk', ChunkSchema);