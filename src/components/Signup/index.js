import React, {useState, useContext} from 'react';
import {FirebaseContext} from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const firebase = useContext(FirebaseContext);

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword : ''
  }

  const [loginData, setLoginData] = useState(data);

  // Gestion du message d'erreur :
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  // Appel de Firebase :
  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, pseudo} = loginData;
    firebase.signupUser(email, password)
    .then((authUser) => {
      return(firebase.user(authUser.user.uid).set({
        pseudo: pseudo,
        email: email
      })
      )
    })
    .then(() => {
      setLoginData({...data});
      navigate('/welcome');
    })
    .catch(error => {
      setError(error);
      setLoginData({...data});
    })
  }

  const {pseudo, email, password, confirmPassword} = loginData;

  // Gestion de l'affichage du bouton (que si tous les champs sont correctement remplis) :
  // = pas d'affichage de bouton si chaine de caractères vides
  const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ?  
  <button disabled>Inscription</button> : <button>Inscription</button>

  // Gestion des erreurs :
  const errorMsg = error !== '' && <span>{error.message}</span>;


  // Gestion de redirection :
  const navigate = useNavigate();

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
        <div className='formBoxLeftSignup'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>

            <form onSubmit={handleSubmit}>
              {errorMsg}
              <h2>Inscription</h2>
              {/* Champ pseudo */}
              <div className='inputBox'>
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required aria-required autoComplete='off'></input>
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              {/* Champ e-mail */}
              <div className='inputBox'>
                <input onChange={handleChange} value={email} type="email" id="email" required aria-required autoComplete='off'></input>
                <label htmlFor="email">E-mail</label>
              </div>
              {/* Champs mots de passe et confirmation */}
              <div className='inputBox'>
                <input onChange={handleChange} value={password} type="password" id="password" required aria-required autoComplete='off'></input>
                <label htmlFor="password">Mot de passe (6 caractères minimum)</label>
              </div>
              <div className='inputBox'>
                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" required aria-required autoComplete='off'></input>
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              </div>
              {btn}
            </form>

            <div className='linkContainer'>
              <Link className='simpleLink' to="/login">Déjà inscrit ? Connecte-toi.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
