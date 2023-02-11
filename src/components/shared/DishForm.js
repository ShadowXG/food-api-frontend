import { Form, Button, Container } from "react-bootstrap"

const DishForm = (props) => {
    const { dish, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        placeholder="What is the dish's title"
                        name="title"
                        id="title"
                        value={ dish.title }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="What is the dish's description"
                        name="description"
                        id="description"
                        value={ dish.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Cost:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What is the dish's cost"
                        name="cost"
                        id="cost"
                        value={ dish.cost }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default DishForm