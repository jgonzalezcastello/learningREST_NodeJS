'use strict';


var mongoose = require('mongoose'),
  Project = mongoose.model('Projects');

exports.list_projects = function(req, res) {
  Project.find({}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.create_a_project = function(req, res) {
  var new_project = new Project(req.body);
  new_project.save(function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};


exports.read_a_project = function(req, res) {
  Project.findById({_id: req.params.projectID}, function(err, project) {
    if (err){
      //res.send(err);
      Project.find({name: { "$regex": req.params.projectID, "$options": "i" }}, function(err2,project2){
        if(err2){
          res.send(err2);
        }else
        res.json(project2);
      })
    }else
    res.json(project);
  });
};


exports.update_a_project = function(req, res) {
  Project.findOneAndUpdate({_id: req.params.projectID}, req.body, {new: true}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

//TODO: Create a variable for the delete response message to allow tests to check against that message.
var delete_project_message = 'Project succesfully deleted';
exports.delete_project_message = delete_project_message;
exports.delete_a_project = function(req, res) {
  Project.remove({
    _id: req.params.projectID
  }, function(err, project) {
    if (err)
      res.send(err);
    res.json({ message: 'Project successfully deleted' });
  });
};