const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'user_id',
    });
  }

  return User;
};

module.exports = User;
