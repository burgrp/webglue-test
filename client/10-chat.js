wg.pages.home = {
    title: "Chat",
    render(container) {

        container.append(
            H1().text("Chat"),
            DIV(async div => {
                let addMessage = m => DIV().text(m).appendTo(div);
                let messages = await wg.chat.getMessages();
                messages.forEach(addMessage);
                div.onNewMessage(addMessage);
            }),
            DIV([
                TEXT(),
                BUTTON().text("Send").click(async e => {
                    let input = $(e.target).siblings("input");
                    let errorDiv = $(e.target).parent().siblings(".error");
                    try {
                        errorDiv.fadeOut();
                        await wg.chat.send(input.val());
                        input.val("");
                    } catch (error) {
                        errorDiv.text(error);
                        errorDiv.fadeIn();
                    }
                })
            ]),
            DIV("error"),
            DIV("nav", [
                AHREF({href: "help"}).text("Help")
            ])
        );
    }
}

wg.pages.help = {
    title: "Help",
    render(container) {
        container.append(
            H1().text("Help"),
            DIV().text("Some information to be written here..."),
            DIV("nav", [
                AHREF({href: "/"}).text("Chat")
            ])
        );
    }
}