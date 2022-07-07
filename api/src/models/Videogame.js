const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID, 
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.FLOAT
    },
    platforms: {      
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },    
    image: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: "Last update"
  });
};
