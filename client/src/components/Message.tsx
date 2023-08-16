import { Col, Row, Stack } from "react-bootstrap"
import Tag from "./Tag"

function Message(props:any) {
    return (
      <>
        <Stack direction="horizontal" gap={2}>
          {props.tags.map((e: any, i:any) => <Tag key={i} tagName={e}/>)}
        </Stack>
        <Row className="mb-3">
            <Col xs={'auto'}>{new Date(Date.parse(props.date)).toDateString()}</Col>
            <Col xs={'auto'}>{props.messageText}</Col>
        </Row>
      </>
    )
}
  
  export default Message