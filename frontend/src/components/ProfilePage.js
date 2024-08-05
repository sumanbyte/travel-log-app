import Card from 'react-bootstrap/Card';
import Loading from '../assets/loading-component/Loading';
import useAuthentication from '../hooks/useAuthentication'
import ModalTMP from '../assets/ModalTMP';
import { useEffect } from 'react';

function ProfilePage() {

  const { user, getUser } = useAuthentication();
  
  useEffect(() => {
    getUser();
  
    // eslint-disable-next-line
  }, [])
  return (
    <Card className='my-5' style={{ width: 'fit-content', margin: 'auto' }}>
      {
        !user ? <>
          <Loading />
        </>
          :
          <>
            <h2 className='text-center mx-3 my-2'>Your Profile</h2>
            <Card.Body>
              <Card.Title>Name: {user.name}</Card.Title>
              <Card.Title>Email: {user.email}</Card.Title>
              <ModalTMP name={user.name} />
            </Card.Body>
          </>
      }

    </Card>
  );
}

export default ProfilePage;