import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /dishes/:foodId
export const createDish = (foodId, newDish) => {
    return axios({
        url: `${apiUrl}/dishes/${foodId}`,
        method: 'POST',
        data: { food: newDish }
    })
}

// UPDATE
// /dishes/:foodId/:dishId
export const updateDish = (user, foodId, updatedDish) => {
    return axios({
        url: `${apiUrl}/dishes/${foodId}/${updatedDish.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { food: updatedDish }
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