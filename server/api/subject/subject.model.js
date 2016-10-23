'use strict';

import async from 'async';
import mongoose from 'mongoose';
import Chunk from './chunk/chunk.model';
import Tag from './tag/tag.model';

var SubjectSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  title: String,
  problematic: String,
  date: { type: Date, default: Date.now() },
  views: { type: Number, default: 0 },
  // votes: [{ author: String, }],
  result: [],
  // tags: [Tag.schema],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  meta: {
    shared:  { type: Number, default: 0 }

  }
});

SubjectSchema.statics.findResult = function(req) {
    // subject.chunks = [{title: 'okoook'}];
  // return this.findById(req.params.id, (err, subject) => {
    

    // this.find({ _id: req.params.id }, 'tags', (err, result) => {

      // console.log(result);
    // subject.chunks = null;
    // subject.result = Tag.find({ _subject: req.params.id }, () => {
// 
      // Chunk.find({ }, () => {
// 
      // });
// 
    // });




    


  // });
        // .populate('author chunks');
}

SubjectSchema.virtual('meta.votes').get(function () {
  return 43;
});
SubjectSchema.virtual('meta.comments').get(function () {
  return 22;
});
SubjectSchema.virtual('meta.sources').get(function () {
  return 156;
});

// SubjectSchema.virtual('result').get(function () {

//   // Tag.find
//   // var id = this._id;
//   // return Chunk.find();
//   // return Chunk.find({ _subject: id });

//   return ['HEY'];
//   // return this.statics.findResult();
// });

SubjectSchema.set('toJSON', {
    virtuals: true
});
// SubjectSchema.set('toObject', { getters: true, virtuals: true });


export default mongoose.model('Subject', SubjectSchema);