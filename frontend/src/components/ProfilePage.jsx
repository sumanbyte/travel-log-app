import Card from 'react-bootstrap/Card';
import Loading from '../assets/loading-component/Loading';
import useAuthentication from '../hooks/useAuthentication'
import ModalTMP from '../assets/ModalTMP';
import { useEffect } from 'react';
import useMode from '../hooks/useMode';

function ProfilePage() {

  const { user, getUser, loading } = useAuthentication();
  const {darkMode} = useMode();
  // console.log(user)

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  // console.log(user)
  // console.log("i am running from profilepage component")

  return (
    <div className={`py-2 ${darkMode ? "dark-mode": ""} dark-mode-transition`} style={{minHeight: "100vh"}}>
    <Card style={{border: "none"}}>
      {
        loading ? <>
          <Loading />
        </>
          : !user ?
            <Card.Body className={`${darkMode ? "dark-mode" : ""}  dark-mode-transition`}>Some error occured</Card.Body> :
            <div  className={`${darkMode ? "dark-mode" : ""}  dark-mode-transition`}>
              <h2 className='mx-3 my-2 font-owsald'>Your Details</h2>
              <Card.Body >
                <Card.Title>Name: {user.name}</Card.Title>
                <Card.Title>Email: {user.email}</Card.Title>
                <ModalTMP name={user.name} />
              </Card.Body>
            </div>
      }

    </Card>
    </div>
  );
}

export default ProfilePage;