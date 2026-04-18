const sequelize = require("./../config/database");
const Bot = require("./Bot");
const ChatbotNode = require("./ChatbotNode");
const Option = require("./option");
const UserContext = require("./UserConext");

//Un Nodo tiee muchas opciones
ChatbotNode.hasMany(Option, {as: 'opciones', foreignKey: 'chatbotNodeId'});
// Una Opcion puede apuntar a otro Nodo
Option.belongsTo(ChatbotNode, {as: 'nextNode', foreignKey: 'next_node_id'});


Bot.hasMany(UserContext, {foreignKey: 'botId'});
UserContext.belongsTo(Bot, {foreignKey: 'botId'});

const db = {
    Bot,
    ChatbotNode,
    Option,
    UserContext,
    sequelize
}

module.exports = db;