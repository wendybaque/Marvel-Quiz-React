import React from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';


const Quiz = (props) => {
  return (
    <div>
      <h2>Pseudo : {props.userData.pseudo}</h2>
      <Levels />
      <ProgressBar />
      <h2>Notre question Quiz</h2>
      <p className='answerOptions'>Question 1</p>
      <p className='answerOptions'>Question 2</p>
      <p className='answerOptions'>Question 3</p>
      <p className='answerOptions'>Question 4</p>
      <button className='btnSubmit'>Suivant</button>
    </div>
  )
}

export default Quiz;
