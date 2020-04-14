'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('categories', {
        categoryID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        categoryName: DataTypes.STRING,
      }, {});
      Categories.associate = function(models) {
        // associations can be defined here
        
      };
      return Categories;
};