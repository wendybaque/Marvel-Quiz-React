import React, {useState, Fragment, useContext, useEffect} from 'react';
import {useNavigate } from 'react-router-dom'

import {FirebaseContext} from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = (props) => {

  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  // Accès à Firebase -> vérifie si l'utilisateur est connecté.
  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : navigate('/')
    })

    if (!!userSession) {
      firebase.user(userSession.uid)
      .get()
      .then((doc) => {
        if(doc && doc.exists) {
          const myData = doc.data();
          setUserData(myData)
        }
      })
      .catch((error) => {

      })
    }

    return () => {
      listener()
    }
  }, [userSession])
  

  return userSession === null ? (
    <Fragment>
      <div className='loader'></div>
      <p>Loading...</p>
    </Fragment>
  ) : (
    <div className='quiz-bg'>
        <div className='container'>
            <Logout />
            <Quiz userData={userData}/>
        </div>
    </div>
  )
}

export default Welcome;
