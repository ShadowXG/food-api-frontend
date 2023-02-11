import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"
import { getOneFood } from "../../api/foods"
import messages from "../shared/AutoDismissAlert/messages"

// need to get the id from the params
// then make a request to the api
// when the food is retrieved we'll render the data on the screen

const ShowFood = (props) => {
    const [food, setFood] = useState(null)

    const { id } = useParams()

    const { user, msgAlert } = props

    useEffect(() => {
        getOneFood(id)
            .then(res => setFood(res.data.food))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting food',
                    message: messages.getFoodsFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if(!food) {
        return <p>loading...</p>
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{ food.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Category: { food.category }</small></div>
                            <div><small>Cost: { food.cost }</small></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowFood