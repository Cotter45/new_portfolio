'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    title: {
      type:DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    rating: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5]
      }
    },
    comment: {
      type: DataTypes.TEXT, 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 1000]
      }
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};