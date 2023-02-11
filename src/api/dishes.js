import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /dishes/:foodId
export const createDish = (foodId, newDish) => {
    console.log(foodId)
    return axios({
        url: `${apiUrl}/dishes/${foodId}`,
        method: 'POST',
        data: { dish: newDish }
    })
}

// UPDATE
// /dishes/:foodId/:dishId
export const updateDish = (user, foodId, updatedDish) => {
    return axios({
        url: `${apiUrl}/dishes/${foodId}/${updatedDish._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { dish: updatedDish }
    })
}

// DELETE
// /dishes/:foodId/:dishId
export const deleteDish = (user, foodId, dishId) => {
    return axios({
        url: `${apiUrl}/dishes/${foodId}/${dishId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}