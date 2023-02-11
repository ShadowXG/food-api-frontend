// this is where our api calls for the foods resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllFoods = () => {
    return axios(`${apiUrl}/foods`)
}

// READ -> Show
export const getOneFood = (id) => {
    return axios(`${apiUrl}/foods/${id}`)
}

// Create (create a food)
export const createFood = (user, newFood) => {
    return axios({
        url: `${apiUrl}/foods`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { food: newFood }
    })
}

// Update (update a food)

// Delete (delete a food)
export const deleteFood = (user, foodId) => {
    return axios({
        url: `${apiUrl}/foods/${foodId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}