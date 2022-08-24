import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../QuizMarvel';

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
    score: 0
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

  componentDidMount(){
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(provProps, prevState) {
    if(this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    } 
    if(this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer:null,
        btnDisabled:true
      })
    }
  }

  // Sauvegarder la réponse de l'utilisateur :
  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer:selectedAnswer,
      btnDisabled:false
    })
  }

  // Passage à laquestion suivante :
  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1){

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
    }
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

  return (
    <div>
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
    </div>
  )
  }
}

export default Quiz;
