import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row } from 'react-bootstrap';
import Tags from './components/Tags';
import Chat from './components/Chat';
import './App.css'

function App() {

  return (
    <>
      <Container>
        <Row className='vh-100'>
          <Tags />
          <Chat />
        </Row>
      </Container>
    </>
  )
}

export default App
