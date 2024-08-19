import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useAlert from '../hooks/useAlert'
import useAuthentication from '../hooks/useAuthentication';
import useMode from '../hooks/useMode';
import { IoCloseSharp } from "react-icons/io5";


function ModalTMP() {
  const { setShow: setShowAlert, setAlert } = useAlert();
  const { darkMode } = useMode();
  const [show, setShow] = useState(false);
  const { getUser, user } = useAuthentication()
  const [name, setName] = useState(user.name);


  console.log(user)

  const editUser = async (name) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/editinfo/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ name })
    });

    const json = await response.json();

    if (json.status) {
      setShowAlert(true);
      setAlert({
        color: 'success',
        type: "Success",
        message: json.message
      })
      handleClose();
      getUser();
    } else {
      setShowAlert(true);
      setAlert({
        color: 'danger',
        type: "Failed",
        message: json.message
      })
    }
  }

  const handleClose = () => {
    setShow(false);

  }

  const handleShow = () => {
    setShow(true)
  };



  return (
    <>
      <Button variant="primary" size='sm' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className={`d-flex justify-content-between ${darkMode ? "dark-mode": ""} dark-mode-transition`}>
          <Modal.Title >Edit</Modal.Title>
          <IoCloseSharp size={25} onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className={`${darkMode ? "dark-mode" : ""} dark-mode-transition`}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} value={name} />

            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer className={`${darkMode ? "dark-mode": ""} dark-mode-transition`}>
          <Button variant="secondary" size='sm' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size='sm' onClick={() => editUser(name)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTMP;