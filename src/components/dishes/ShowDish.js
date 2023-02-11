import { Card, Button } from "react-bootstrap"
import { deleteDish } from "../../api/dishes"
import messages from "../shared/AutoDismissAlert/messages"

const ShowDish = (props) => {
    const { dish, user, food, msgAlert, triggerRefresh } = props

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
        </>
    )
}

export default ShowDish