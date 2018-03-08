module.exports = async config => {

    let messages = [];

    let events = {
        newMessage: null
    };

    return {
        events,
        api: {
            chat: {
                async send(message) {
                    if (!message) {
                        throw "Type a message, please.";
                    } 
                    messages.push(message);
                    events.newMessage(message);
                },
                async getMessages() {
                    return messages;
                }
            }
        },
        client: __dirname + "/client"
    }
}