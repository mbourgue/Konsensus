'use strict';

import mongoose from 'mongoose';

var TagSchema = new mongoose.Schema({
  _subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  name: String,
  chunks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chunk' }]
});

export default mongoose.model('Tag', TagSchema);