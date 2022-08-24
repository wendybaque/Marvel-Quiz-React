import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const ForgetPassword = () => {

    const firebase= useContext(FirebaseContext);

    // Si on a un email ou pas :
    const [email, setEmail] = useState('');
    // Si on a trouvé un email correspondant :
    const [success, setSuccess] = useState(null);
    // Message d'erreur si pas d'email correspondant :
    const [error, setError] = useState(null);
    // Gestion de l'affichage du bouton :
    const disabled = email === '';
    // Gestion de redirection :
    const navigate = useNavigate();

    // Accès à Firebase :
    const handleSubmit = (e) => {
    e.preventDefault();
        firebase.passwordReset(email)
        // Réussite du porcessus :
        .then(() => {
            setError(null);
            setSuccess(`Votre mot de passe vous a été envoyé par e-mail à ${email}. 📧 Pensez à consulter vos spams. 😉 `);
            setEmail('');
            setTimeout(() => {
                navigate('/login');
            }, 5000)
        })
        // Echec du processus :
        .catch((error) => {
            setError(error);
            setEmail('');
        })
    }

  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>
      <div className='formBoxLeftForget'>
      </div>
        <div className='formBoxRight'>
          <div className='formContent'>

            {success && <span style={{
                border:'1px solid green',
                background: 'green',
                color: '#ffffff'
            }}>{success}</span>}

           {error && <span>{error.message}</span>}

            <form onSubmit={handleSubmit}>
              <h2>Mot de passe oublié ?</h2>
              <div className='inputBox'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required aria-required autoComplete='off'></input>
                <label htmlFor="email">E-mail</label>
              </div>
              <button disabled={disabled}>Récupérer votre mot de passe</button>
            </form>

            <div className='linkContainer'>
              <Link className='simpleLink' to="/login">Déjà inscrit ? Connecte-toi !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;
