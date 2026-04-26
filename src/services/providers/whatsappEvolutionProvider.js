const axios = require("axios");

const baseUrl = process.env.EVOLUTION_API_URL;
const instance = process.env.EVOLUTION_INSTANCE;
const apikey = process.env.EVOLUTION_API_KEY;

const headers = {
    "Content-Type": "application/json",
    "apikey": apikey
}

async function sendMessage(number, messageData){
    try {
        const {url, payload} = buildPayload(number, messageData);
        const respuesta = await axios.post(url, payload, {headers});
        return respuesta.data;
        
    } catch (error) {
        console.log("Error enviando el mensaje", {
            type: messageData?.type,
            number,
            error: JSON.stringify(error.response?.data)|| JSON.stringify(error.message)
        });
        return null;
    }
}

function buildPayload(number, data){
    switch (data.type) {
        case "text":
            return {
                url: `${baseUrl}/message/sendText/${instance}`,
                payload: {number, text: data.body}
            }
        case "image":
            return {
                url: `${baseUrl}/message/sendMedia/${instance}`,
                payload: {
                    number,
                    mediatype: "image",
                    media: data.link,
                    caption: data.caption || ""
                }
            }
        case "document":
            return {
                url: `${baseUrl}/message/sendMedia/${instance}`,
                payload: {
                    number,
                    mediatype: "document",
                    mimetype: "application/pdf",
                    media: data.link,
                    fileName: data.filename+".pdf",
                    caption: data.caption || ""
                }
            }
            case "location":
                return {
                    url: `${baseUrl}/message/sendLocation/${instance}`,
                    payload: {
                        number,
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                        name: data.name,
                        address: data.address
                    }
                }
        default:
            throw new Error(`Tipo de mensaje no soportado: ${data.type}`);
    }
}

module.exports = {
    sendMessage
}