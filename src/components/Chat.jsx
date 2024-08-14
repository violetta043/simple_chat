import React from "react";
import socket from "../socket";


function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null); 

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId, 
        text: messageValue,
    });
    onAddMessage({userName, text: messageValue}); 
    setMessageValue('');
  }; 

  React.useEffect(() => {
    socket.on('ROOM:NEW_MESSAGE', (message) => {
      onAddMessage(message);
    });
  
    return () => {
      socket.off('ROOM:NEW_MESSAGE');
    };
  }, []);
  
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999); 
  }, [messages]); 

  return (
    <div className="wrapper">
      <div className="chat">
        <div className="chat-users">
            Room: <b>{roomId}</b>
            <hr />
          <b>User ({users.length}):</b>
          <ul>
            {users.map((name, index) => (
              <li key={name + index}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <p >{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"
            />
            <button onClick={onSendMessage } type="button" className="btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
