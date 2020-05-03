import React, { Component } from 'react';
import './ChatList.css'

class ChatList extends Component {

    render() { 
        const {chats} = this.props;
        return ( 
            <div className="chat-list">
                {chats && chats.map((chat,i) => chat)}
            </div>
         );
    }
}
 
export default ChatList;