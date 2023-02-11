import { useState } from "react"
import { Modal } from "react-bootstrap"
import DishForm from "../shared/DishForm"
import { createDish } from '../../api/dishes'
import messages from "../shared/AutoDismissAlert/messages"

const NewDishModal = (props) => {
    const { food, show, handleClose, msgAlert, triggerRefresh } = props

    const [dish, setDish] = useState({})

    const onChange = (e) => {
        e.persist()

        setDish(prevDish => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedDish = {
                [updatedName] : updatedValue
            }

            console.log('the toy', updatedDish)
            console.log('the toy (state)', dish)

            return {
                ...prevDish, ...updatedDish
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createDish(food.id, dish)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: messages.createDishSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createDishFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <DishForm 
                    dish={dish}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${food.name} a dish!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewDishModal