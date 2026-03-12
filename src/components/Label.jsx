import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Label({ label, linkLabel, related = true }) {
    const [isRelated, setRelation] = useState(related)

    async function handleUpdateLabel(e) {
        e.preventDefault()
        linkLabel(label.documentId, !isRelated)
        setRelation(!isRelated)
    }

    return (
        <Button variant={isRelated ? "warning" : "light"} onClick={handleUpdateLabel}>
            {label.title}
        </Button>
    )
}