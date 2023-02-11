import { Container } from "react-bootstrap"
import FoodsIndex from "./foods/FoodsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container style={{textAlign: 'center'}}>
			<h2>See All The Foods</h2>
			<FoodsIndex msgAlert={ props.msgAlert } />
		</Container >
	)
}

export default Home
