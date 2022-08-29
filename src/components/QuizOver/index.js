import React, { Fragment, useEffect, useState } from 'react';

import { TiChevronRight } from 'react-icons/ti';
import { FaAward } from 'react-icons/fa';
import { BsHandThumbsDownFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';

import Loader from '../Loader';
import Modal from '../Modal';

import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {

  const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props; 
  
  // Récupération de la clé API :
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  // Récupération du hash :
  const hash = '2db2ee218c7dd2c6034acd250726a3f4';

  // State de la question :
  const [asked, setAsked] = useState([]);
  // State du popup :
  const [openModal, setOpenModal] = useState(false);
  // State des infos sur les characters dans le popup :
  const [characterInfo, setCharacterInfo] = useState([]);
  // State de gestion du loading des résultats de l'API :
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current)

    if(localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
  }, [ref])

  // Fonction de comparaison de date de fetch de l'API et de la date actuelle :
  const checkDataAge = (date) => {
    // Conversion des différentes dates :
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
  
    // Création de nouvelle data si le dernier fetch dans le localstorage date de + de 15 jours
    if(daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now());
    }
  }

  // Affichage du popup + de la donnée de l'API via axios :
  const showModal = (id) => {
    setOpenModal(true);

    if(localStorage.getItem(id)){
      setCharacterInfo(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
      .then((response) => {
        setCharacterInfo(response.data);
        setLoading(false);
        localStorage.setItem(id, JSON.stringify(response.data));
        
        if(!localStorage.getItem('marvelStorageDate')){
          localStorage.setItem('marvelStorageDate', Date.now());
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  // Fermeture du popup :
  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  }

  // Note moyenne obtenue aux questions :
  const averageGrade = maxQuestions / 2;

  // Gestion du cas où on n'a pas la moyenne (redirection vers le niveau précédent) :
  if(score < averageGrade) {
    setTimeout(() => {
      loadLevelQuestions(quizLevel)
    }, 4000);
  } 

  // Décision à prendre en fonction de la note obtenue :
  const decision = score >= averageGrade  ? (
    <Fragment>
      <div className='stepsBtnContainer'>
        {
          quizLevel < levelNames.length ? (
            // Condition 1 : On a la moyenne et il reste des niveaux à faire :
          <Fragment>
            <p className='successMsg'>Bravo, passez au niveau suivant ! <BsFillHandThumbsUpFill /></p>
            <button onClick={() => loadLevelQuestions(quizLevel)} className='btnResult success'>Niveau suivant... <TiChevronRight /></button>
          </Fragment>
          ) : (
            // Condition 2 : On  a la moyenne et on a terminé tous les niveaux :
          <Fragment>
            <p className='successMsg'>Bravo, vous êtes un expert ! <FaAward size='50px'/></p>
            <button onClick={() => loadLevelQuestions(0)} className='btnResult gameOver'>Accueil</button>
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
        <p className='failureMsg'>Dommage, vous avez échoué... <BsHandThumbsDownFill /></p>
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
        <td><button 
          className='btnInfo'
          onClick={() => showModal(question.heroId)}
          >Infos
        </button></td>
      </tr>
    )
  })
 ) : (
  <tr>  
    <td colSpan={3}>
      <Loader 
        styling={{textAlign:'center', color:'red'}} 
        loadingMsg={"On ne va pas te filer les bonnes réponses tout de suite, quand même ! 😜 <br/> Tu refais le niveau ?" }/>
    </td>
  </tr>
 )

 // Variable pour afficher les résultats dans la modale après le loading :
 const resultInModal = !loading ? (
  <Fragment>
    <div className='modalHeader'>
      <h2>{characterInfo.data.results[0].name}</h2>
    </div>
    <div className='modalBody'>
      <div className='comicImage'>
        <img src={characterInfo.data.results[0].thumbnail.path+'.'+characterInfo.data.results[0].thumbnail.extension} alt="comic character pic"/>
        <p>{characterInfo.attributionText}</p>
      </div>
      <div className='comicDetails'>
        <h3>Description</h3>
        {
          characterInfo.data.results[0].description ? 
          <p>characterInfo.data.results[0].description</p> : <p>Description indisponible</p>
        }
        <h3>Plus d'infos</h3>
        {
          characterInfo.data.results[0].urls && characterInfo.data.results[0].urls.map((url, index) => {
            return <a key={index} href={url.url} target='_blank' rel='noopener noreferrer'>{url.type}</a>
          })
        }
      </div>
    </div>
    <div className='modalFooter'>
      <button className='modalBtn' onClick={hideModal}>Fermer</button>
    </div>
  </Fragment>
 ) : (
  <Fragment>
    <div className='modalHeader'>
      <h2>Résponse de Marvel...</h2>
    </div>
    <div className='modalBody'>
      <Loader />
    </div>
  </Fragment>
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

      <Modal showModal={openModal} hideModal={hideModal}> 
        {resultInModal}
      </Modal>

    </Fragment>
  )
});

export default React.memo(QuizOver);

