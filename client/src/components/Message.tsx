import { Badge, Col, Row, Stack } from "react-bootstrap"

function Message(props:any) {
    console.log(props.date)
  
    return (
      <>
        <Stack direction="horizontal" gap={2}>
            <Badge pill bg="primary-subtle">
              #Primary
            </Badge>
            <Badge pill bg="secondary-subtle">
              #Secondary
            </Badge>
            <Badge pill bg="success-subtle">
              #Success
            </Badge>
        </Stack>
        <Row className="mb-3">
            <Col xs={'auto'}>{props.date}</Col>
            <Col xs={8}>{props.messageText}</Col>
        </Row>
      </>
    )
}
  
  export default Message