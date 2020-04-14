'use strict';
module.exports = (sequelize, DataTypes) => {
    const Contributors = sequelize.define('contributors', {
        contributorID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      }, {});
      Contributors.associate = function(models) {
        // associations can be defined here
        
      };
      return Contributors;
};