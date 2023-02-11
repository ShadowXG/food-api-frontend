import { Modal } from "react-bootstrap"
import { createDish } from '../../api/dishes'

const NewDishModal = (props) => {
    const {user, food, show, handleClose, msgAlert, triggerRefresh } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>new toy modal</p>
            </Modal.Body>
        </Modal>
    )
}

export default NewDishModal