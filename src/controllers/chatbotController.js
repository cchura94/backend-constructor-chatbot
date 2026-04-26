
const { ChatbotNode, Option } = require("./../models")

const chatbotController = {
    getAllNodes: async (req, res) =>  {
        try {
            const {botId} = req.query;
            console.log(botId);
            if(!botId){
                console.log(botId);

                return res.status(400).json({error: "El BotId es requerido"});
            }

            const nodos = await ChatbotNode.findAll({
                where: {botId: botId},
                include: [{model: Option, as: 'opciones'}]
            });

            return res.json(nodos);
            
        } catch (error) {
            
        }
    },
    createNode: async (req, res) =>  {
        try {
            const nodo = await ChatbotNode.create(req.body)
            return res.status(201).json(nodo);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
    updateNode: async (req, res) =>  {
        try {
            const {id} = req.params;
            const node = await ChatbotNode.update(req.body, {where: {id}});
            return res.status(201).json(node);
            
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
    deleteNode: async (req, res) =>  {
        try {
            await ChatbotNode.destroy({where: {id: req.para.id}});
            return res.status(204)
            
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    },

    createOption: async (req, res) =>  {
        try {
            console.log(req.body);
            const opcion = await Option.create(req.body)
            return res.status(201).json(opcion);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
    updateOption: async (req, res) =>  {
        try {
            const {id} = req.params;
            await Option.update(req.body, {where: {id}});
            return res.status(201).json({mensaje: "Opcion actualizada"});
            
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
    deleteOption: async (req, res) =>  {
        try {
            await Option.destroy({where: {id: req.para.id}});
            return res.status(204)
            
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    },
}

module.exports = chatbotController;