'use strict';

import Chunk from './chunk.model';
import Subject from '../subject.model';
import mongoose from 'mongoose';

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

export function create(req, res) {
  Subject.findById(req.params.id, function(err, subject) {
    
    subject.chunks.push(req.body);
    subject.save(function (err) {
      if (err) return handleError(err)
      console.log('Success!');
    });
    
  } ).then(respondWithResult(res));
}

export function vote(req, res) {

  Subject.findById(req.params.id, function(err, subject) {
      
      var chunk = subject.chunks.id(req.params.chunkid);

      if(err) handleError(err);
      if(!chunk) console.log('Il n\'y a aucun chunk');
      if(!chunk.points) chunk.points = 0;

      
      chunk.points += 1;
      // console.log('pppppp' + chunk.points);
      subject.save();

  }).then(respondWithResult(res));
}