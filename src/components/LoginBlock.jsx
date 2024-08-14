import React from 'react';
import axios from 'axios';

function LoginBlock({ onLogin }) {
    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState(''); 
    const [isLoading, setIsLoading] = React.useState(false); 

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert("this is a require feelds"); 
        }
        const obj = {
            roomId,
            userName
         }
        setIsLoading(true);
        await axios.post('/rooms', obj)
        onLogin(obj); 
    }
  return (
    <div className="wrapper">
      <div className="login-block">
        <input 
            type="text" 
            placeholder="RoomID" 
            value={roomId} 
            onChange={(e) =>setRoomId(e.target.value) }
        />
        <input 
            type="text" 
            placeholder="Your name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
        />
        <button disabled={isLoading} onClick={onEnter} className="btn-login">
            {isLoading ? 'LOGIN...': 'SING IN'}
        </button>
      </div>
    </div>
  );
}

export default LoginBlock;
