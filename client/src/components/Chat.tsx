import { Button, Col, Form, InputGroup } from 'react-bootstrap';

function Chat() {

    return (
      <>
        <Col xs={8} className='p-0 border border-3 border-info rounded-end position-relative'>
            <h2 className='p-3 bg-info text-white'><i className="bi bi-wechat"></i> General chat</h2>
            <div>
              
            </div>
            <InputGroup className="position-absolute bottom-0">
              <Form.Control
                className='border-info'
                placeholder="Enter your message"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-info" id="button-addon2">
                Send <i className="bi bi-send"></i>
              </Button>
            </InputGroup>
        </Col>
      </>
    )
  }
  
  export default Chat