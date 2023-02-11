import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import { deleteDish } from "../../api/dishes"
import messages from "../shared/AutoDismissAlert/messages"
import EditDishModal from "./EditDishModal"

const ShowDish = (props) => {
    const { dish, user, food, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const removeDish = () => {
        deleteDish(user, food.id, dish._id)
            .then(() => {
                msgAlert({
                    heading: 'Dish Deleted',
                    message: messages.deleteDishSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.deleteDishFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={{width: '25%'}}>
                <Card.Header>{dish.title}</Card.Header>
                <Card.Body>
                    <small>{dish.description}</small>
                </Card.Body>
                <Card.Footer>
                    Cost: ${dish.cost}
                    {
                        user && user._id === food.owner._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Dish
                            </Button>
                            <Button
                                onClick={() => removeDish()}
                                variant="danger"
                                className="m-2"
                            >
                                Delete Dish
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditDishModal 
                user={user}
                food={food}
                dish={dish}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowDish