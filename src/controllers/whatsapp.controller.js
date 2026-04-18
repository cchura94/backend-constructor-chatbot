const whatsappService = require("./../services/whatsappService");
const Bot = require("./../models/Bot");
const UserContext = require("./../models/UserConext");
const ChatbotNode = require("./../models/ChatbotNode");
const Option = require("./../models/option");

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

async function recibirMensajeWebhook(req, res){
    console.log(JSON.stringify(req.body, null, 2));
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        if(!value?.messages){
            return res.status(200).send("No Mensaje");
        }

        const phoneId = value.metadata?.phone_number_id;

        const botConfig = await Bot.findOne({where: {identifier: phoneId}});

        if(!botConfig) return res.sendStatus(200);

        const message = value.messages[0];
        const numero = message.from;

        if(message.type === "text"){
            mensajeUsuario = message.text.body;
        }
        if(message.type === "interactive"){

        }

        // buscar o crear el context del cliete
        let [context, created] = await UserContext.findOrCreate({
            where: {phone_number: numero, botId: botConfig.id},
            defaults: {current_node: "main", botId: botConfig.id}
        });

        if(created){
            await enviarMensajeDinamico(numero, 'main');
            return res.sendStatus(200);
        }

        const nodeData = await ChatbotNode.findOne({
            where: {node_key: context.current_node}
        });

        const opcion = await Option.findOne({
            where: {
                chatbotNodeId: nodeData.id,
                key: mensajeUsuario
            }
        });

        if(!opcion){
            await whatsappService.enviarMensajeWhatsapp(numero, { type: "text", body: "Debe elegir una opción del menú" });

            return res.sendStatus(200);


        }

        if(opcion.respuesta){
            await whatsappService.enviarMensajeWhatsapp(numero, opcion.respuesta);
        }

        if(opcion.next_node_id){
            const nodeData2 = await ChatbotNode.findOne({
                where: {
                    id: opcion.next_node_id
                }
            });

            await context.update({current_node: nodeData2.node_key});

            await enviarMensajeDinamico(numero, nodeData2.node_key);

        }


        return res.sendStatus(200);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

async function enviarMensajeDinamico(numero, nodeId){
    const nodo = await ChatbotNode.findOne({
        where: {node_key: nodeId},
        include: [{model: Option, as: 'opciones'}]
    });

    if(!nodo){
        console.log(`node ${nodeId} no encontrado`);
        return;
    }

    const optionesTexto = nodo.opciones.map(opt => `- 👉 *${opt.key}*: ${opt.text}`).join("\n");

    const mensajeFinal = `${nodo.mensaje}\n\n${optionesTexto}\n\n> *Indícanos una opción*`
    await whatsappService.enviarMensajeWhatsapp(numero, { type: "text", body: mensajeFinal });

    return;
}

module.exports = {
    enviarMensaje,
    recibirMensajeWebhook
}