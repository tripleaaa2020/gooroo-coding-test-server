'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('books', {
    bookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    contributorID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
    Books.belongsTo(models.contributors, {
        foreignKey: 'contributorID',
        targetKey: 'contributorID',
        as: 'contributors'
    });
    Books.belongsTo(models.categories, {
        foreignKey: 'categoryID',
        targetKey: 'categoryID',
        as: 'categories'
    });
  };
  return Books;
};