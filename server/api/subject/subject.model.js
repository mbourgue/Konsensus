'use strict';

import mongoose from 'mongoose';

var SubjectSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  title: String,
  date: { type: Date, default: Date.now() },
  views: Number,
  // votes: [{ author: String, }],
  // answers: ,
  tags: [],
  shared: Number,
  chunks: [{  author: String,
              content: String,
              sources: [{ url: String }], 
              shared: Number,
              rank: Number,
              points: Number
          }]
       
      //  author: String
       
        // user: {
          // name: "Matthieu BOURGUE",
          // influence: { points: 1345, pastille: {color: "#22EE33"} } 
        // },
        // tags: []
});

export default mongoose.model('Subject', SubjectSchema);