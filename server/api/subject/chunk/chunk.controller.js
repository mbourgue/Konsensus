'use strict';

import async from 'async';

import Chunk from './chunk.model';
import Subject from '../subject.model';
// import mongoose from 'mongoose';
import Tag from '../tag/tag.model';

import htmlparser from 'htmlparser2';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
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
    if(err) return handleError(err);

    Chunk.create(req.body, function(err, chunk) {
      if(err) return handleError(err);

      // subject.chunks.push(chunk._id);

      console.log(chunk);
      console.log('______________');
      console.log(req.body);
      
      Tag.findOne({ _subject: subject._id, name: req.body.title }, (err, tag) => {
        console.log(tag);
        if(tag.chunks)
          tag.chunks.push(chunk._id);
        
        // subject.tags[0].chunks.push(chunk._id);
        chunk._tag = tag._id;

        tag.save();

        subject.save(function(err) {
          if(err) return handleError(err);
          // console.log('Success!');
        });

        chunk._subject = subject._id;
        chunk.save(err => {
          if(err) return handleError(err);

        });


      });

     
        // .then(respondWithResult(res, 201))
    });
  }).then(respondWithResult(res))
    .catch(handleError(res));
}

export function remove(req, res) {
  Chunk
  .findOne({ _id: req.params.chunkid})
  .remove()
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

export function vote(req, res) {
  Chunk.findById(req.params.chunkid, function(err, chunk) {
    // var chunk = subject.chunks.id(req.params.chunkid);

    if(err) handleError(err);
    // if(!chunk) console.log('Il n\'y a aucun chunk');
    // if(!chunk.points) chunk.points = 0;

    chunk.score++;
    
    // console.log('pppppp' + chunk.points);
    chunk.save();
  }).then(respondWithResult(res));


}

export function getResult(req, res) {
  // Chunk.find({ _subject: req.params.id }, function(result) {
  //   console.log('OK' + result);
  // })

    Tag.find({ _subject: req.params.id }, function(err, tags) {
      async.each(tags, (tag, callback) => {
        
        Chunk.find({ _tag: tag._id }, (err, chunks) => {
          // console.log(chunks[0].fragments);
          tag.chunks = chunks;
          callback();
        });

      }, err => {

      });
    }).populate('chunks')
    .then(respondWithResult(res))
    .catch(handleError(res));

}

export function getChunks(req, res) {

  console.log('okokokokoookok oo kok oko ko kok k_________çççççççççççà' + req.params.tag);
  Chunk.find({ _tag: req.params.tag }, function(result) {
      console.log('kkk -> ' + result);
  })
    .sort('-score')
    // .populate('chunks')
    // .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}