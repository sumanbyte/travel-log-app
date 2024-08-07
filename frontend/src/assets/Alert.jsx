
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import useAlert from '../hooks/useAlert';
function Alert() {
  const {show, setShow, alert} = useAlert();
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="bottom-end">


          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg={alert.color}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{alert.type}</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body className='text-white'>{alert.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
      <Col xs={6}>

      </Col>
    </Row>
  );
}

export default Alert;
