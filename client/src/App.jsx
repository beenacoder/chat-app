import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("/")

const App = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Recibo mi mensaje que envío tmb
    receiveMessage(message);
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage)
    }

  }, [])

  //Asi preservamos el mensaje anterior y no se restaura
  const receiveMessage = (message) => {
    setChat((state) => [...state, message]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Tu mensaje aquí...' onChange={e => setMessage(e.target.value)} />
        <button>Enviar</button>
      </form>
      <ul>
        {chat.map((chat, i) => (
          <li key={i}>{chat}</li>
        ))}
      </ul>
    </div>
  )
}

export default App