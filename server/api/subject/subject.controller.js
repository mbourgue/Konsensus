'use strict';

import Subject from './subject.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
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
    .populate('author')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Create a Subject
export function create(req, res) {
  
  req.body.tags = interpretTags(req.body.tags);
  // console.log('TAGS:' + req.body.tags);

  req.body.author = req.user._id;

  // console.log(JSON.stringify(req)+ ",  " + JSON.stringify(res));

  Subject.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function show(req, res) {

    Subject.findById(req.params.id, function(err,subject ) {

      subject.views++;
      subject.save(function (err) {
        if (err) return handleError(err)
        console.log('Success!');
      });

      
    }).then(respondWithResult(res));
    // .catch(handleError(res));

}

export function remove(req, res) {
  return Subject.remove({ _id: req.params.id })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* CHUNK */
export function createChunk(req, res) {
  Subject.findById(req.params.id, function(err, subject) {
    
    subject.chunks.push(req.body);
    subject.save(function (err) {
      if (err) return handleError(err)
      console.log('Success!');
    });
    
  } ).then(respondWithResult(res));
}