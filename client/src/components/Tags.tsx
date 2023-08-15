import { Button, Col, Form, InputGroup } from 'react-bootstrap';

function Tags() {

    return (
      <>
        <Col xs={4} className='p-0 border border-3 border-end-0 border-info rounded-start position-relative'>
          <h2 className='p-3 bg-info text-white'># Tags</h2>
          <div>
            
          </div>
          <InputGroup className="position-absolute bottom-0">
            <Form.Control 
              className='border-info'
              placeholder="Enter your tags"
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
  
  export default Tags
  