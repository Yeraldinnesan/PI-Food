const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID, //gives a unique hexadecimal number
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cookingTime: {
        type: DataTypes.INTEGER,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "https://st2.depositphotos.com/1310390/5294/v/950/depositphotos_52942549-stock-illustration-set-of-black-silhouette-food.jpg",
      },
      steps: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false, ignoreDuplicates: true }
  );
};
