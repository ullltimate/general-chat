import { Button, Col, Form, InputGroup, Stack } from 'react-bootstrap';
import { socket } from '../socket';
import { useState, useEffect } from 'react';
import Message from './Message';
import { addMessage, filterMessage, getMessages } from '../api/api';
import Tag from './Tag';

function Chat() {
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [allDefaultTags, setDefaultTags] = useState<any[]>([]);
  const [onTags, setOnTags] = useState<any[]>([]);
  const [valueTags, setValueTags] = useState('');
  const date = new Date();

  useEffect(()=>{
    socket.connect();
    getMessages(setMessages);
    setDefaultTags(['greeting', 'name', 'farewell', 'smile', 'xa-xa', 'help', 'films', 'comedy'])
    setOnTags(['greeting', 'name', 'farewell', 'smile', 'xa-xa', 'help','films', 'comedy', []])
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
      setOnTags(Array.from(new Set(onTags.concat(tags))));
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

  async function cancelTags(elem: string, tags: string[]){
    let onTags = tags.filter(function(f) { return f !== elem });
    setOnTags(onTags);
    await filterMessage(onTags, setMessages);
  }

  async function addTags(tags: any, value:string){
    if(!tags.includes(value)){
      tags.push(value) 
      setOnTags(tags);
    };
    await filterMessage(tags, setMessages);
    setValueTags('');
  }
  
    return (
      <>
        <Col xs={4} className='p-0 border border-3 border-end-0 border-info rounded-start position-relative'>
          <h2 className='p-3 bg-info text-white'># Tags</h2>
          <Stack direction="vertical" gap={2}>
            {onTags.filter((el)=> typeof el === 'string' && el !== '').map((e, i)=><Tag key={i} tagName={e} onClick={async()=>{await cancelTags(e, onTags)}}/>)}
          </Stack>
          <InputGroup className="position-absolute bottom-0">
            <Form.Control 
              className='border-info'
              placeholder="Enter your tags"
              value={valueTags}
              onChange={(e)=>setValueTags(e.target.value)}
              list='option-datalist'
            />
            <datalist id="option-datalist">
              {allDefaultTags.map((elem, i)=><option key={i} value={elem}></option>)}
            </datalist>
            <Button variant="outline-info" id="button-addon2" onClick={async()=>{await addTags(onTags, valueTags)}}>
              Send <i className="bi bi-send"></i>
            </Button>
          </InputGroup>
        </Col>
        <Col xs={8} className='p-0 border border-3 border-info rounded-end position-relative'>
            <h2 className='p-3 bg-info text-white'><i className="bi bi-wechat"></i> General chat</h2>
            <div className='ps-3 messages__overflow'>
              { 
               messages.map((el, i) => <Message key={i} messageText={el.messageText} date={el.sendMessage} tags={el.tags}/>)
              }
            </div>
            <InputGroup className="position-absolute bottom-0">
              <Form.Control
                className='border-info'
                placeholder="Enter your message"
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