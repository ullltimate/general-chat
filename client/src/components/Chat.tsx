import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { socket } from '../socket';
import { useState, useEffect } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(()=>{
    socket.connect();
    return () => {
      socket.disconnect();
    };
  },[])
  useEffect(() => {
    socket.on('message', function(data) {
      setMessages(messages.concat(data))
    });
    return () => {
      socket.off('message', function(data) {
        setMessages(messages.concat(data))
      });
    };
  },[messages])
  function sendMessage(e: any){
    e.preventDefault();
    if (message) {
      socket.emit('message', message, function(data:any) {
        setMessages(messages.concat(data))
      });
      setMessage('');
    }
  }
  console.log(messages)
  
    return (
      <>
        <Col xs={8} className='p-0 border border-3 border-info rounded-end position-relative'>
            <h2 className='p-3 bg-info text-white'><i className="bi bi-wechat"></i> General chat</h2>
            <div>
              {messages.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <InputGroup className="position-absolute bottom-0">
              <Form.Control
                className='border-info'
                placeholder="Enter your message"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                as="textarea"
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="outline-info" id="button-addon2" type='submit' onClick={(e)=>sendMessage(e)}>
                Send <i className="bi bi-send"></i>
              </Button>
            </InputGroup>
        </Col>
      </>
    )
}
  
  export default Chat