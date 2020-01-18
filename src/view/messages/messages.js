import React from 'react'
import "./messages.css"

class Messages extends React.Component {

    me = "me";

    messages = [
        {
            message: "Oui bien sûr!",
            from: "me",
            date: Date.now()
        },
        {
            message: "Bonjour, je souhaite avoir des infos sur comment marche la plateforme.",
            from: "Jean Beaudruche",
            date: Date.now()
        },
    ];

    conversations = [{
        lastMessage: "Bonjour, je souhaite avoir des infos sur comment marche la plateforme.",
        from: "Jean Beaudruche",
        date: Date.now()
    }];

    componentDidMount() {
        if (typeof document !== "undefined") {
            // let scroll = document.getElementById("scrollable-list");
        }
    }

    renderConversations = () => {

        let data = this.conversations.map((item, i) => {
            return (
                <div className="conversation-item">
                    <div className="conversation-item-photo">Photo</div>
                    <div className="conversation-item-info">
                        <div className="conversation-item-info-contact">{item.from}</div>
                        <div className="conversation-item-info-message">{item.lastMessage}</div>
                    </div>
                </div>
            )
        });

        return (
            <div className="conversations">
                <div className="conversations-title">Conversations</div>
                <div className="conversations-list" id="scrollable-list">
                    {data}
                    {data}
                </div>
            </div>
        )
    };

    renderMessagesList = () => {
        let messages = this.messages.map((item, i) => {
            return (
                <div key={i} className={`message ${item.from !== this.me ? 'left-message' : 'right-message'}`}>
                    {item.message}
                </div>
            )
        });

        return (
            <div className="message-list-messages">
                {messages}
                {messages}
                {messages}
                {messages}
                {messages}
            </div>
        )
    };

    renderMessages = () => {
        return (
            <div className="messages">
                <div className="messages-contact">Jean Beaudruche</div>
                <div className="messages-wrapper">
                    <div className="messages-section">
                        <div className="messages-list">
                            {this.renderMessagesList()}
                        </div>
                        <div className="messages-input-section">
                            <input className="input-message" placeholder="Écrivez un message ici..." type="text"/>
                            <button className="send-message">Envoyer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="main-conversations">
                {this.renderConversations()}
                {this.renderMessages()}
            </div>
        )
    }
}

export default Messages
