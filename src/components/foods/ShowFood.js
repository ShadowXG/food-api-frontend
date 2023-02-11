import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"
import { getOneFood, deleteFood, updateFood } from "../../api/foods"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingScreen from "../shared/LoadingScreen"
import EditFoodModal from "./EditFoodModal"
import ShowDish from "../dishes/ShowDish"
import NewDishModal from "../dishes/NewDishModal"

// need to get the id from the params
// then make a request to the api
// when the food is retrieved we'll render the data on the screen

const dishCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}
const ShowFood = (props) => {
    const [food, setFood] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [dishModalShow, setDishModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

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
    }, [updated])

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

    let dishCards
    if (food) {
        if (food.dishes.length > 0) {
            dishCards = food.dishes.map(dish => (
                <ShowDish 
                    key={dish.id}
                    dish={dish}
                    user={user}
                    food={food}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
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
                            <div><small>Cost: ${ food.cost }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setDishModalShow(true)}
                        >
                            Give {food.name} a dish!
                        </Button>
                        {
                            food.owner && user && food.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {food.name}
                                </Button>
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
            <Container className="m-2" style={dishCardContainerLayout}>
                {dishCards}
            </Container>
            <EditFoodModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateFood={updateFood}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                food={food}
            />
            <NewDishModal 
                food={food}
                show={dishModalShow}
                handleClose={() => setDishModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowFood