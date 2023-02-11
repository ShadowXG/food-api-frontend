import { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import LoadingScreen from "../shared/LoadingScreen"

// api function from api file
import { getAllFoods } from "../../api/foods"

import messages from '../shared/AutoDismissAlert/messages'

// styling object for react components fooloiwng timms design
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// FoodsIndex will make a request to the API for all the foods
// once it gets a response, display a card for each food
const FoodsIndex = (props) => {
    const [foods, setFoods] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    // get foods from the api when the component mounts
    useEffect(() => {
        getAllFoods()
            .then(res => setFoods(res.data.foods))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting foods',
                    message: messages.getFoodsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!foods) {
        // if no foods display loading
        return <LoadingScreen />
    } else if (foods.length === 0) {
        return <p>No foods yet, go add some!</p>
    }

    // Once an array of foods is found, loop over them and
    // produce a card for each
    const foodCards = foods.map(food => (
        <Card key={ food.id } style={{ width: '25%', margin: 5}}>
            <Card.Header>{ food.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/foods/${food.id}`} className="btn btn-info">View { food.name }</Link>
                </Card.Text>
                { food.owner ?
                    <Card.Footer>
                        owner: {food.owner.email}
                    </Card.Footer>
                : null }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerStyle }>
            { foodCards }
        </div>
    )
}

export default FoodsIndex