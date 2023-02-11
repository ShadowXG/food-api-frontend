import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"
import { getOneFood, deleteFood } from "../../api/foods"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingScreen from "../shared/LoadingScreen"

// need to get the id from the params
// then make a request to the api
// when the food is retrieved we'll render the data on the screen

const ShowFood = (props) => {
    const [food, setFood] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

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

    const removeFood = () => {
        deleteFood(user, food.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.deleteFoodSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.deleteFoodFailure,
                    variant: 'danger'
                })
            })
    }

    if(!food) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ food.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Category: { food.category }</small></div>
                            <div><small>Cost: { food.cost }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            food.owner && user && food.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => removeFood()}
                                >
                                    Throw Away {food.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowFood