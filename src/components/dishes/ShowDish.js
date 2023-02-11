import { Card, Button } from "react-bootstrap"

const ShowDish = (props) => {
    const { dish } = props

    return (
        <>
            <Card className="m-2" style={{width: '25%'}}>
                <Card.Header>{dish.title}</Card.Header>
                <Card.Body>
                    <small>{dish.description}</small>
                </Card.Body>
                <Card.Footer>Cost: ${dish.cost}</Card.Footer>
            </Card>
        </>
    )
}

export default ShowDish