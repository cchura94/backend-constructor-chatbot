const { OpenAI } = require("openai")

const openai = new OpenAI({
    apiKey: process.env.OpenAI_API_KEY
});

async function generarRepuestaAI(mensajeUsuario, historialAnterior = [], promptSistema){
    try {
        const messages = [
            {role: "system", content: promptSistema},
            ...historialAnterior,
            {role: "user", content: mensajeUsuario}
        ];
        console.log(messages);

        const completion = await openai.chat.completions.create({
            model: 'gpt-5',
            messages: messages
        });

        const respuesta = completion.choices[0].message.content;

        return {
            respuesta,
            nuevoHistorial: [
                ...historialAnterior,
                {role: "user", content: mensajeUsuario},
                {role: "assistant", content: respuesta}
            ]
        }

    } catch (error) {
        console.log("Error en OpenAi Service: ", error);
        return {respuesta: "Lo siente, tuve un problema al procesar tu solicitud", nuevoHistorial: historialAnterior};
    }
}

module.exports = { generarRepuestaAI };