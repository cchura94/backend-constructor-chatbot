const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./../config/database");

const Bot = sequelize.define(
  'Bot',
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataforma: {
      type: DataTypes.ENUM('cloud', 'evolution'),
      defaultValue: 'cloud'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Activo'
    },
    identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        comment: "Guarda el phone_number_id de Cloud o el nobre de instancia de Evolution"
    },
    prompt: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "Eres un asistente responde en menos de 30 palabras"
    }
  },
  {
    timestamps: true
  },
);

Bot.afterCreate(async (bot, options) => {
  const ChatbotNode = sequelize.models.ChatbotNode;

  await ChatbotNode.create({
    node_key: 'main',
    mensaje: `Hola, bienvenido a ${bot.name}`,
    botId: bot.id
  })
})

module.exports = Bot;