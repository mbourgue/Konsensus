'use strict';

import Subject from './subject.model';
import Tag from './tag/tag.model';
import async from 'async';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log('Error: ' + err);
    res.status(statusCode).send(err);
  };
}

function interpretTags(str) {
  return String(str).split(';');
}

// Get list of Subjects
export function index(req, res) {



  Subject.find()
    .populate('author tags')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// ---
function getT() {
  
}


// Create a Subject
export function create(req, res) {

  // console.log(req.body);

  req.body.author = req.user._id;
  
  var t = req.body.tags;
  req.body.tags = [];

  let s = new Subject(req.body);

  let tags = [];
  async.each(t, (tag, callback) => {
  console.log(tags.length, ' tags');

    tags.push({ _subject: s._id, name: tag.name, chunks: [] });
    console.log(tags);

    callback();      

  }, err => {
    console.log(tags);
  })

  Tag.create(tags, (err, _tags) => {

    async.map(_tags, (c, callback) => {

      console.log(_tags);

      console.log(c._id, ' tags'); 
      s.tags.push(c._id);
      callback();
    }, (err, results) => {
      console.log(tags.length, ' tags'); 
      console.log(results);
      s.save();
    });

  });




  // Subject.create(req.body, (err, subject) => {

    
  // })
    // .then(respondWithResult(res, 201))
    // .catch(handleError(res));
}

export function show(req, res) {

  return Subject
    // .findResult(req)
    .findById(req.params.id)
    .populate('tags')
    .populate('author')
    // .populate('chunks')
    .exec(function (err, subject) {

      console.log(subject);

      subject.views++;
      subject.save(function (err) {
        if (err) return handleError(err)
      });
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function remove(req, res) {
  return Subject.remove({ _id: req.params.id })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
