const axios = require("axios");

const TOKEN ="EAAdx3bXzG0kBRL2MbfYYsWKrqKtflpzGgrc0pjktA0mb0Fsa8wRZCKFmMUqVwrHJ3OlRirYZBz1oNbTs4OZAuBhsA9TZBkA0aXRoDDOnOnL6oujezLcarBAKrMSnWyvVSfE9jVAbz0LZBTtZCIdg7BxKlIG9VtD7FcZBjnXF1C2hxUZCVxgE5CyKa2yJcFAXPvToLXDoTfMW6MfIZCSXA6rrpZAbFJJxro42eZAMCFHJKa9QP9hByjzyZB4zb0ZBHyfEtfhfAo2MVQKZBR0AL6k7CpxAE8ZAZCPB";

axios.post("https://graph.facebook.com/v25.0/388467921024360/messages",
  {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "59173277937",
    "type": "image",
    "image": {
        "link": "https://blumbitvirtual.edtics.com/pluginfile.php/6357/course/overviewfiles/Post%20N8N%20%281%29.png",
        "caption": "Este es mi descripción"
    }
  },
  {
    headers: {
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
    },
  }
);