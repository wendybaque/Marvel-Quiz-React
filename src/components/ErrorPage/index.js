import React from 'react';
import batman from '../../assets/batman.png';

const centerH2 = {
  textAlign: 'center',
  marginTop: '50px'
}

const centerIMG = {
  display: 'block',
  margin:'40px auto'
}

const ErrorPage = () => {
  return (
    <div className='quiz-bg'>
      <div className='container'>
        <h2 style={centerH2}>Oups, cette page n'existe pas...</h2>
        <img style={centerIMG} src={batman} alt="Logo de Batman"/>
      </div>
    </div>
  )
}

export default ErrorPage
