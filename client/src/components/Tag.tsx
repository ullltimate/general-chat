import { Badge } from "react-bootstrap"

function Tag(props:any) {
    return (
      <>
        <Badge pill bg="danger-subtle" className="text-dark" onClick={props.onClick}> 
          {`#${props.tagName}`}
        </Badge>
      </>
    )
}
  
export default Tag