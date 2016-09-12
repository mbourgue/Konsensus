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
  return Subject.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Create a Subject
export function create(req, res) {
  
  req.body.tags = interpretTags(req.body.tags);
  console.log('TAGS:' + req.body.tags);

  Subject.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}