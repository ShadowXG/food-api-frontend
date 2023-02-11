// needs to render a form
// the form should take the food object in state
// the form should make an axios post request when submitted
// send a success or failure alert
// on success: redirect our user to the new food show page
// on failure: should send a message and remain visible
import { useState } from "react"
import { createFood } from '../../api/foods'
import { createFoodSuccess, createFoodFailure } from '../shared/AutoDismissAlert/messages'
import FoodForm from '../shared/FoodForm'
import { useNavigate } from "react-router-dom"

const CreateFood = (props) => {
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [food, setFood] = useState({
        name: '',
        category: '',
        cost: ''
    })

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

            return {
                ...prevFood, ...updatedFood
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createFood(user, food)
            .then(res => { navigate(`/foods/${res.data.food.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: createFoodSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createFoodFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <FoodForm 
            food={food}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new food!"
        />
    )
}

export default CreateFood