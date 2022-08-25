import React, { Fragment } from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {
  
  // Question actuelle (destructuring) :
  const actualQuestion = idQuestion + 1;

  // Pourcentage d'avancement de la barre :
  const getPercent = (totalQuestions, questionId) => {
    return(100/totalQuestions) * questionId;
  }

  // Pourcetage de progression :
  const progressPercent = getPercent(maxQuestions, actualQuestion);

  return (
    <Fragment>
        <div className='percentage'>
            <div className='progressPercent'>{`Question : ${idQuestion + 1} / ${maxQuestions}`}</div>
            <div className='progressPercent'>{`Progression : ${progressPercent} %`}</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' style={{width:`${progressPercent}%`}}></div>
        </div>
    </Fragment>
  )
}

// Le memo fait que la fonction ne s'enclenche qu'une seule fois (optimisation) :
export default React.memo(ProgressBar);
