// this is rendered by ShowFood
// The state of whether it's open or not live is in ShowFood
import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import FoodForm from '../shared/FoodForm'
import messages from "../shared/AutoDismissAlert/messages"

const EditFoodModal = (props) => {
    // destructure the props
    const { user, show, handleClose, updateFood, msgAlert, triggerRefresh } = props

    const [food, setFood] = useState(props.food)

    const onChange = (e) => {
        e.persist()

        setFood(prevFood => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedFood = {
                [updatedName] : updatedValue
            }
            console.log(updatedFood)

            return {
                ...prevFood, ...updatedFood
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateFood(user, food)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: messages.updateFoodSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateFoodFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <FoodForm 
                    food={food}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Food"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditFoodModal