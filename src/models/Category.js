const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false
  });

  return Category;
};

module.exports = Category;
