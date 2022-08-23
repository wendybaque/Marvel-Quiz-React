import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {FirebaseContext} from '../Firebase'

const Login = () => {

  const firebase = useContext(FirebaseContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if(password.length > 5 && email !== '') {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [password, email, btn])

  // Gestion de redirection :
  const navigate = useNavigate();

  // Accès à Firebase :
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.loginUser(email, password)
    .then(user => {
      setEmail('');
      setPassword('');
      navigate('/welcome');
    })
    .catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })
  }

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
      <div className='formBoxLeftLogin'>
      </div>
        <div className='formBoxRight'>
          <div className='formContent'>
            {error !== '' && <span>{error.message}</span> }
            <form onSubmit={handleSubmit}>
              <h2>Connexion</h2>
              {/* Champ e-mail */}
              <div className='inputBox'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required aria-required autoComplete='off'></input>
                <label htmlFor="email">E-mail</label>
              </div>
              {/* Champs mots de passe et confirmation */}
              <div className='inputBox'>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required aria-required autoComplete='off'></input>
                <label htmlFor="password">Mot de passe (6 caractères minimum)</label>
              </div>
              {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
            </form>

            <div className='linkContainer'>
              <Link className='simpleLink' to="/signup">Nouveau sur Marvel Quiz ? Inscris-toi maintenant !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
