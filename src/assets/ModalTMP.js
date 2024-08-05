import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useAlert from '../hooks/useAlert'
import useAuthentication from '../hooks/useAuthentication';

function ModalTMP() {
  const { setShow: setShowAlert, setAlert } = useAlert()
  const [show, setShow] = useState(false);
  const {getUser, user} = useAuthentication()
  const [name, setName] = useState(user.name);

  const editUser = async (name) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/editinfo/edit`, {
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
    }else{
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
    getUser();
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit your Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your Name" onChange={(e) => setName
                (e.target.value)} value={name} />

            </Form.Group>
            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> editUser(name)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTMP;