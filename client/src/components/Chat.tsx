import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { socket } from '../socket';
import { useState, useEffect } from 'react';
import Message from './Message';
import { addMessage, getMessages } from '../api/api';

function Chat() {
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const date = new Date();

  useEffect(()=>{
    socket.connect();
    getMessages(setMessages);
    return () => {
      socket.disconnect();
    };
  },[])

  useEffect(() => {
    socket.on('message', onMessageEvent);
    return () => {
      socket.off('message', onMessageEvent);
    };
  },[messages])

  function sendMessage(e: any){
    e.preventDefault();
    if (message) {
      socket.emit('message', [message, tags], onMessageEvent);
      setValue('');
      addMessage(message, tags);
    }
  }

  function onMessageEvent(data:any){
    setMessages(messages.concat(
      {
        messageText: data[0],
        tags: data[1],
        sendMessage: date.toISOString()
      }
    ))
  }

  function separateMessageTag(value:string){
    setValue(value)
    let strMessage = value.replace(new RegExp(`#.*`), '');
    setMessage(strMessage);
    if(value.includes('#')){
      let arrTags = value.replace(/^.+?#/, '').split('#');
      setTags(arrTags);
    }
  }
  
    return (
      <>
        <Col xs={8} className='p-0 border border-3 border-info rounded-end position-relative'>
            <h2 className='p-3 bg-info text-white'><i className="bi bi-wechat"></i> General chat</h2>
            <div>
              { 
               messages.map((el, i) => <Message key={i} messageText={el.messageText} date={el.sendMessage} tags={el.tags}/>)
              }
            </div>
            <InputGroup className="position-absolute bottom-0">
              <Form.Control
                className='border-info'
                placeholder="Enter your message"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                as="textarea"
                rows={1}
                value={value}
                onChange={(e) => separateMessageTag(e.target.value)}
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