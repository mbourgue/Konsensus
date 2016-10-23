'use strict';

import mongoose from 'mongoose';

var ChunkSchema = new mongoose.Schema({
  _subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  _tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  author: String,
  fragments: [ { html: String, score: Number } ],
  title: String,
  content: String,
  sources: [{ url: String }],
  shared: Number,
  rank: Number,
  score: { type: Number, default: 0 },
  tags: [String]
});


export default mongoose.model('Chunk', ChunkSchema);
