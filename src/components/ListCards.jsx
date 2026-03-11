import ListGroup from "react-bootstrap/ListGroup";

export default function ListCards({ children }) {
    return (
        <ListGroup style={{ minHeight: "2rem" }} className="gap-3">
            {children}
        </ListGroup>
    )
}
