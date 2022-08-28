import React from 'react'
import './quiz-end-box.css'

export default class QuizEndBox extends React.Component
{
    state = {
	results: undefined,
	questions: undefined,
    }
    
    componentDidMount()
    {
	fetch('/api/quiz/end')
	    .then(response => response.json())
	    .then( json => this.setState(json))
	    .catch(error => console.log(error))
    }

    renderQuestions = (question, index) => {
	const id = index + 1;
	const correct = (question.answer === question.correctAnswer);
	return(
	    <div className="quiz-result-question">
		<div> {correct ? <span className="quiz-result-chekckmark">&#x2714;</span> : <span className="quiz-result-X">&#x2718;</span>} {id}.  {question.bigger} - {question.smaller} = <span className={correct ? "quiz-result-question-correct" : "quiz-result-question-incorrect"}>{question.answer ? <span className="quiz-result-question-answer">{question.answer}</span> : [<span className="quiz-result-question-noanswer">&empty;</span>]}</span> 
		    {!correct && <span className="quiz-result-question-correct">{question.correctAnswer}</span>}
		</div>
	    </div>
	);
	
    }
    
    render()
    {
	if(!this.state.results || !this.state.questions) return null;
	
	return(
	    <div className="quiz-results-container">
		<div className="quiz-results-box">
		    <div className="quiz-results-title">Rezultati testa</div>
		    <div className="quiz-results-totals">
			<div>Točni odgovori: <span className="quiz-results-totals-correct">{this.state.results.correct}</span></div>
			<div>Netočni odgovori:<span className="quiz-results-totals-incorrect">{this.state.results.incorrect}</span></div>
			<div>Ukupno: {this.state.results.correct + this.state.results.incorrect}</div>
		    </div>
		    <button className="quiz-results-button" onClick={this.props.onClick}>Igraj ponovno</button>
		</div>
		<div className="quiz-results-box">
		    <div className="quiz-results-title">Odgovori</div>
		    <div className="quiz-results-answers">
			{this.state.questions.map(this.renderQuestions)}
		    </div>
		</div>
	    </div>
	);
    }
}
