import React, { Component, Fragment } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';
import { QuizMarvel } from '../QuizMarvel';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

class Quiz extends Component {

  // Création d'un constructor pour ne pas avoir à recopier tous les éléments du state :
  constructor(props) {
    super(props)

    this.initialState = {
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
  
    this.state = this.initialState;
    this.storedDatatRef = React.createRef();
  }

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
  showToastMsg = pseudo => {
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

  componentDidUpdate(prevProps, prevState) {
    // Affichage de la question :
    if((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    } 
    if((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer:null,
        btnDisabled:true
      })
    }

    // Correction du bug d'affichage du score en prenant en compte prevState :
    if(this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);
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
      this.setState({
        quizEnd:true
      })
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
    this.setState({...this.initialState, quizLevel:param})
    this.loadQuestions(this.state.levelNames[param]);
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

    return this.state.quizEnd ? 

    (<QuizOver 
      ref={this.storedDatatRef}
      levelNames={this.state.levelNames}
      score={this.state.score}
      maxQuestions={this.state.maxQuestions}
      quizLevel={this.state.quizLevel}
      percent={this.state.percent}
      loadLevelQuestions={this.loadLevelQuestions}
    />) :(
      
      <Fragment>
        <h2>Pseudo : {pseudo}</h2>
        <Levels />
        <ProgressBar 
          idQuestion={this.state.idQuestion} 
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
          {displayOptions}
        <button 
          disabled={this.state.btnDisabled} 
          className='btnSubmit'
          onClick={this.nextQuestion}
        >
          {/* Affichage du bouton : texte change à la dernière question : */}
            {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminé !"}
        </button>
    </Fragment>
    );
  }
}

export default Quiz;
