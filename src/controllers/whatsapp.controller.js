const whatsappService = require("./../services/whatsappService");

async function enviarMensaje(req, res) {
    try {
        const { numero, mensaje } = req.body;
        if(!numero || !mensaje){
            return res.status(400).json({success: false, error: "Debes enviar un numero y un mensaje"});
        }

        const response = await whatsappService.enviarMensajeWhatsapp(numero, mensaje);

        return res.status(200).json({success: true, data: response});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, error: error.message});
    }
}

async function recibirMensajeCloudWebhook(req, res){
    

}

module.exports = {
    enviarMensaje
}