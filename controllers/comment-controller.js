const { Comment, User } = require('../models');

const commentController = {
    //get all user infomation
    getAllUser(req,res) {
        User.find({})
        .populate({
            path: 'comments',
            select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

// get one user by id
getCommentById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'comments',
        select: '-__v'
  })
  .select('-__v')
  .sort({ _id: -1 })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
},

//create User
createComment({ body }, res) {
 Comment.create(body)
 .then(dbCommentData => res.json(dbCommentData))
 .catch(err => res.json(err));
},

// update Comment by id
updateComment({ params, body }, res) {
  Comment.findOneAndUpdate({ _id: params.id}, body, { new:true, runValidators:true })
  .then(dbCommentData => {
    if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!'});
        return;
    }
    res.json(dbCommentData);
  })
  .catch(err => res.json(err));
},

//delete Comment
deleteComment ({ params }, res) {
    Comment.findOneAndUpdate({ _id: params.id })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.json(err));
}

};

module.exports = thoughtController;