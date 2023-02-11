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

// Update (update a food)

// Delete (delete a food)