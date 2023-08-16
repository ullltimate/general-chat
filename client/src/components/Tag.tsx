import { Badge } from "react-bootstrap"

function Tag(props:any) {
    return (
      <>
        <Badge pill bg="danger-subtle" className="text-dark">
          {`#${props.tagName}`}
        </Badge>
      </>
    )
}
  
export default Tag