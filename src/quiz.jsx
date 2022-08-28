import React from 'react';
import Question from './components/question';
import QuizTimer from './components/quiz-timer';
import QuestionLoader from './components/question-loader'
import QuizStartBox from './components/quiz-start-box'
import QuizEndBox from './components/quiz-end-box'
import './quiz.css'

export default class Quiz extends React.Component
{
    state = {
	question: undefined,
	questionNumber: undefined,
	started: undefined,
	ended: undefined
    }
    
    answer = () => {
	this.setState({"question": false});
    }

    nextQuestion = () => {
	this.setState({"question": true,
		       "questionNumber": this.state.questionNumber+1});
    }

    playSound = () => {
	const audio = new Audio('/wrong-answer.wav');
	audio.play();
    }

    startQuiz = () => {
	fetch('./api/quiz/start')
	    .then( () => this.setState({"started": true,
					"ended": false,
					"question": true,
					"questionNumber": 0}))
	    .catch(error => console.log(error));
    }

    endQuiz = () => {
	fetch('./api/quiz/end')
	    .then ( request => request.json())
	    .catch( error => console.log(error))
	this.setState({"ended":true})
    }

    abort = () => {
	this.setState({"started": undefined,
		       "ended": undefined});
    }
    
    render()
    {	    
	
	return (
	    <div className="quiz">
		{this.state.started && !this.state.ended && <QuizTimer minutes={7} onTimeout={this.endQuiz}  />}
		<div className="quiz-flex-wrapper">
		  {!this.state.ended && (!this.state.started ? <QuizStartBox onClick={this.startQuiz} /> :<> {this.state.question ? <Question questionNumber={this.state.questionNumber} onAnswer={this.answer} wrongSound={this.playSound} onAbort={this.abort} /> : <QuestionLoader onTimeout={this.nextQuestion} />}</>)}
		    {this.state.ended && <QuizEndBox onClick={this.startQuiz} />}
		</div>
	    </div>
	);
    }
}
