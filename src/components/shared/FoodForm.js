// this for will take several props and be used to both create and update foods
// the action will be dependent upon the parent component
// but the form will look the same on both
import { Form, Button, Container } from "react-router-dom"

const FoodForm = (props) => {
    // gonna need several props to get a working reusable form
    const { food, handleChange, handleSubmit, heading } = props
    // just thought of the fact that I could've made category an enum, 
    // but I would have to change a lot of code so I'm sticking to what I have
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the food's name"
                        name="name"
                        id="name"
                        value={ food.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control 
                        placeholder="What is the food's category"
                        name="category"
                        id="category"
                        value={ food.category }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>cost:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What is cost of the food"
                        name="cost"
                        id="cost"
                        value={ food.cost }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default FoodForm