'use strict';

import mongoose from 'mongoose';
import Chunk from './chunk/chunk.model';

var SubjectSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  title: String,
  problematic: String,
  date: { type: Date, default: Date.now() },
  views: { type: Number, default: 0 },
  // votes: [{ author: String, }],
  // answers: ,
  tags: [],
  shared: Number,
  chunks: [Chunk.schema]
       
      //  author: String
       
        // user: {
          // name: "Matthieu BOURGUE",
          // influence: { points: 1345, pastille: {color: "#22EE33"} } 
        // },
        // tags: []
});

export default mongoose.model('Subject', SubjectSchema);