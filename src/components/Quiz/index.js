import React, { Component, Fragment } from 'react';

import { QuizMarvel } from '../QuizMarvel';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { TbChevronRight } from 'react-icons/tb';
import { TiChevronRight } from 'react-icons/ti';

import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';

toast.configure();

// Ce que l'on met dans le state doit servir à gérer le render() de notre app :
const initialState = {
  quizLevel:0,
  maxQuestions:10,
  storedQuestions:[],
  question: null,
  options:[],
  idQuestion: 0,
  btnDisabled:true,
  userAnswer:null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent:null
}

const levelNames = ["debutant", "confirme", "expert"];


class Quiz extends Component {

  // Création d'un constructor pour ne pas avoir à recopier tous les éléments du state :
  constructor(props) {
    super(props)
    this.state = initialState;
    this.storedDatatRef = React.createRef();
  }

  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDatatRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
      this.setState({ storedQuestions:newArray })
    }
  }

  // Notification de bienvenue :
  showToastMsg = pseudo => {
    if(!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg:true })

      toast.warn(`Bienvenue ${pseudo} et bonne chance ! 🍀`, {
            position: "top-right",
            autoClose:3000,
            hideProgressBar:false,
            pauseOnHover:true,
            pauseOnClick:true,
            draggable:false
          });
    }
  }

  componentDidMount(){
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
        // Destructuring du state pour enlever this.state avant chaque nom de variable :
        const {
          maxQuestions,
          storedQuestions,
          idQuestion,
          quizEnd,
          score
        } = this.state;

    // Affichage de la question :
    if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options
      })
    } 
    if((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer:null,
        btnDisabled:true
      })
    }

    // Correction du bug d'affichage du score en prenant en compte prevState :
    if(quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    // Invocation de la notification si le pseudo est bien reçu, seulement au moment du montage :
    if(this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
    }
  }

  // Sauvegarder la réponse de l'utilisateur :
  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer:selectedAnswer,
      btnDisabled:false
    })
  }

  // Passage à la question suivante ou fin du niveau sur lequel on se trouve :
  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1){
      this.setState({ quizEnd:true })
    } else {
      // Incrémentation du compteur de score :
      this.setState((prevState) => ({ idQuestion:prevState.idQuestion + 1 }))
    }

    // Augmenter le score si on n'est pas à la dernière question + réponse correcte :
    const goodAnswer = this.storedDatatRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }))

      // Affichage de la notification d'échec ou de réussite :
      toast.success('Bravo, + 1 ! ✅', {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        pauseOnHover:true,
        pauseOnClick:true,
        draggable:false
      });
    } else {
      toast.error('Oups... 😉', {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        pauseOnHover:true,
        pauseOnClick:true,
        draggable:false
      });
    }
  }

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  // Fin du jeu -> passage à un autre composant :
  gameOver = percent => {
    
    // Si la note est sup à 50%, on a gagné + passage au niveau suivant :
    if(percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
      })
    // Si la note est inf à 50%, on a perdu :
    } else {
      this.setState({percent})
    }
  }

  // Chargement des questions suivantes 
  loadLevelQuestions = (param) => {
    this.setState({...initialState, quizLevel:param})
    this.loadQuestions(levelNames[param]);
  }

  render() {

    // Destructuring du state pour enlever this.state avant chaque nom de variable :
    const {
    quizLevel,
    maxQuestions,
    question,
    options,
    idQuestion,
    btnDisabled,
    userAnswer,
    score,
    quizEnd,
    percent } = this.state;

    const {pseudo} = this.props.userData;

    const displayOptions = options.map((option, index) => {
      return(
        <p key={index}
        onClick={() => this.submitAnswer(option)} 
        className={`answerOptions ${userAnswer === option ? "selected" : null}`}
      >
        <TbChevronRight />
        {option}</p>
      )
    })

    return quizEnd ? 

    (<QuizOver 
      ref={this.storedDatatRef}
      levelNames={levelNames}
      score={score}
      maxQuestions={maxQuestions}
      quizLevel={quizLevel}
      percent={percent}
      loadLevelQuestions={this.loadLevelQuestions}
    />) :(
      
      <Fragment>
        <h2>Pseudo : {pseudo}</h2>
        <Levels 
        levelNames={levelNames} 
        quizLevel={quizLevel}
        />

        <ProgressBar 
          idQuestion={idQuestion} 
          maxQuestions={maxQuestions}
        />

        <h2>{question}</h2>

          {displayOptions}

        <button 
          disabled={btnDisabled} 
          className='btnSubmit'
          onClick={this.nextQuestion}
        >
          <TiChevronRight />
          
          {/* Affichage du bouton : texte change à la dernière question : */}
            {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminé !"}
        </button>
    </Fragment>
    );
  }
}

export default Quiz;
