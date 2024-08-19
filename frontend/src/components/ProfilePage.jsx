import Card from 'react-bootstrap/Card';
import Loading from '../assets/loading-component/Loading';
import useAuthentication from '../hooks/useAuthentication'
import ModalTMP from '../assets/ModalTMP';
import { useEffect } from 'react';
import useMode from '../hooks/useMode';

function ProfilePage() {

  const { user, getUser, loading, error } = useAuthentication();
  const { darkMode } = useMode();
  // console.log(user)

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  // console.log(user)
  // console.log("i am running from profilepage component")

  return (
    <>
      <Card className={`${darkMode ? "dark-mode" : ""} dark-mode-transition`} style={{ border: "none", minHeight: "100vh" }}>
        {
          loading ? <>
            <Loading />
          </>
            : error ?
              <Card.Body className={`${darkMode ? "dark-mode" : ""}  dark-mode-transition`}>{error}</Card.Body> : user &&
              <>
                <h2 className={`${darkMode ? "dark-mode": "" } dark-mode-transition px-3 py-2 my-0 font-owsald`}>Your Details</h2>
                <Card.Body className={`${darkMode ? "dark-mode" : ""}  dark-mode-transition`}>
                  <Card.Title>Name: {user.name}</Card.Title>
                  <Card.Title>Email: {user.email}</Card.Title>
                  <ModalTMP name={user.name} />
                </Card.Body>
              </>
        }


      </Card>
    </>
  );
}

export default ProfilePage;