const Sequelize = require('sequelize');
const sequelize = new Sequelize('ecommerce_db', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql',
});

const { DataTypes } = require('sequelize');

const Category = require('./Category');
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

const Product = require('./Product');
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

const Tag = require('./Tag');
Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

const ProductTag = require('./ProductTag');
ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // references the 'product' table, not 'tag'
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag', // references the 'tag' table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// Associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products',
  foreignKey: 'tag_id',
});

module.exports = {
  Category,
  Product,
  Tag,
  ProductTag,
};
