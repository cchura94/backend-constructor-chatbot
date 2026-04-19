const express = require("express");
const whatsappController = require("./../controllers/whatsapp.controller");
const botController = require("./../controllers/bot.controller")
const chatbotController = require("./../controllers/chatbotController");

const router = express.Router();

const verify_token = "Mi.Codigo.SECRETO123"

router.post("/enviar-mensaje", whatsappController.enviarMensaje);

router.post("/webhook", whatsappController.recibirMensajeWebhook);

// verificar webhook
router.get("/webhook", function(req, res){
    console.log("VERIFICANDO...")
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

    if(mode === 'subscribe' && token === verify_token){
        console.log("WEBHOOK VERIFICADO");
        return res.status(200).send(challenge)
    }else{
        return res.status(403).end();
    }

});

// CRUDS bot

router.get("/bots", botController.getAll);
router.post("/bots", botController.create);
router.get("/bots/:id", botController.getOne);
router.put("/bots/:id", botController.update);
router.delete("/bots/:id", botController.delete);

router.get("/chatbot/nodes", chatbotController.getAllNodes);
router.post("/chatbot/nodes", chatbotController.createNode);
router.put("/chatbot/nodes/:id", chatbotController.updateNode);
router.delete("/chatbot/nodes/:id", chatbotController.deleteNode);

router.post("/chatbot/options", chatbotController.createOption);
router.put("/chatbot/options/:id", chatbotController.updateOption);
router.delete("/chatbot/options/:id", chatbotController.deleteOption);

module.exports = router;