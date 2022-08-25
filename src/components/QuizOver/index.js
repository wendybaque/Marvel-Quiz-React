import React, { Fragment, useEffect, useState } from 'react';

const QuizOver = React.forwardRef((props, ref) => {

  const {levelNames, score, maxQuestions, quizLevel, percent} = props; 
  
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  // Note moyenne obtenue aux questions :
  const averageGrade = maxQuestions / 2;

  // Décision à prendre en fonction de la note obtenue :
  const decision = score >= averageGrade  ? (
    <Fragment>
      <div className='stepsBtnContainer'>
        {
          quizLevel < levelNames.length ? (
            // Condition 1 : On a la moyenne et il reste des niveaux à faire :
          <Fragment>
            <p className='successMsg'>Bravo, passez au niveau suivant ! 👏</p>
            <button className='btnResult success'>Niveau suivant...</button>
          </Fragment>
          ) : (
            // Condition 2 : On  a la moyenne et on a terminé tous les niveaux :
          <Fragment>
            <p className='successMsg'>Bravo, vous êtes un expert ! 🏆🏅</p>
            <button className='btnResult gameOver'>Niveau suivant...</button>
          </Fragment>
          )
        }
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite : {percent} %</div>
        <div className='progressPercent'>Note : {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  ) : (
    // Condition 3 : On n'a pas la moyenne, donc on ne peut pas passer au niveau suivant :
    <Fragment>
      <div className='setpsBtnContainer'>
        <p className='failureMsg'>Dommage, vous avez échoué... 😟</p>
      </div>

      <div className='percentage'>
        <div className='progressPercent'>Réussite : {percent} %</div>
        <div className='progressPercent'>Note : {score}/{maxQuestions}</div>
      </div>
    </Fragment>
  );

  // Affichage des réponses ou non en fonction du % de réussite (on ne les affiche pas si le niveau n'est pas OK) :
  const questionAnswer = score >= averageGrade ? (
  asked.map((question) => {
    return(
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td><button className='btnInfo'>Infos</button></td>
      </tr>
    )
  })
 ) : (
  <tr>  
    <td colSpan={3}>
      <p style={{textAlign:'center', color:'red'}}>On ne va pas te filer les réponses tout de suite, quand même ! 😜</p>
    </td>
  </tr>
 )
 
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées : </p>
      <div className='answerContainer'>

        <table className='answers'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
           {questionAnswer}
          </tbody>
        </table>

      </div>
    </Fragment>
  )
});

export default React.memo(QuizOver);

