import React, { Component, Fragment } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
import { QuizMarvel } from '../QuizMarvel';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

class Quiz extends Component {

  state = {
    levelNames: ["debutant", "confirme", "expert"],
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
    quizEnd: false
  }

  storedDatatRef = React.createRef();

  loadQuestions = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDatatRef.current = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
      this.setState({
        storedQuestions:newArray
      })
    } else {
      console.log("Pas assez de questions...");
    }
  }

  // Notification de bienvenue :
  showWelcomeMsg = pseudo => {
    if(!this.state.showWelcomeMsg) {

      this.setState({
        showWelcomeMsg:true
      })

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
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(provProps, prevState) {
    // Affichage de la question :
    if(this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    } 

    // Passage à la question suivante :
    if(this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer:null,
        btnDisabled:true
      })
    }

    // Invocation de la notification si le pseudo est bien reçu :
    if(this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  }

  // Sauvegarder la réponse de l'utilisateur :
  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer:selectedAnswer,
      btnDisabled:false
    })
  }

  // Passage à la question suivante ou fin du jeu :
  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1){
      this.gameOver();
    } else {
      // Incrémentation du compteur de score :
      this.setState((prevState) => ({
        idQuestion:prevState.idQuestion + 1
      }))
    }

    // Augmenter le score si on n'est pas à la dernière question + réponse correcte :
    const goodAnswer = this.storedDatatRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }))

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

  // Fin du jeu -> passage à un autre composant :
  gameOver = () => {
    this.setState({
      quizEnd:true
    })
  }

  render() {

    const {pseudo} = this.props.userData;

    const displayOptions = this.state.options.map((option, index) => {
      return(
        <p key={index}
        onClick={() => this.submitAnswer(option)} 
        className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
      >{option}</p>
      )
    })

    return this.state.quizEnd ? (<QuizOver />) :(
      <Fragment>
        <h2>Pseudo : {pseudo}</h2>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
          {displayOptions}
        <button 
          disabled={this.state.btnDisabled} 
          className='btnSubmit'
          onClick={this.nextQuestion}>Suivant
        </button>
    </Fragment>
    );
  }
}

export default Quiz;
