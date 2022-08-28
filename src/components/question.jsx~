import React from 'react';
import './question.css'
import QuestionTimer from './question-timer'

export default class Question extends React.Component
{
    state = {
	question: undefined,
	input: undefined
    }

    componentDidMount()
    {
	if(this.props.questionNumber !== undefined){
	    fetch('./api/quiz/question/'+this.props.questionNumber)
		.then(response => response.json())
		.then(json => {
		    if( json.status === "error" )
		    {
			if(this.props.onAbort) this.props.onAbort();
		    }
		    else
		    {
			const { question } = json;
			this.setState({"question": question,
				       "input": ''})
		    }
		    
		})
		.catch(error => console.log(error));
	}
    }

    answer = () => {
	if(this.props.questionNumber !== undefined){
	    fetch('./api/quiz/question/'+this.props.questionNumber,
		  {
		      method: 'POST',
		      headers: {
			  'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({'question': this.state.question, 'answer': this.state.input}),
		  })
		.then(response => response.json())
		.then(json => {
		    const { correct } = json;
		    if(!correct && this.props.wrongSound) this.props.wrongSound();
		    if(this.props.onAnswer) this.props.onAnswer();
		})
		.catch(error => console.log(error));
	}
    }
    
    answerButton = (event) => {
	this.answer();
    }

    answerTextBox = (event) => {
	if(event.key ==='Enter'){
	    this.answer();
	}
    }

    getInput = (event) => {
	if(event.target.validity.valid){
	    this.setState({input: event.target.value});
	} else {
	    event.target.value = this.state.input;
	}
    }
    
    render()
    {
	const {question} = this.state;
	if(!question) return null;
	return(
	    <div className="question-box">
		<div className="question-title">Pitanje {this.props.questionNumber + 1}</div>
		<QuestionTimer seconds={5} onTimeout={this.answer} />
		<div className="question-text"><span>{question}</span> <input className="question-text-input" autoFocus type="text" pattern="[0-9]*" maxLength="3" onChange={this.getInput} onKeyUp={this.answerTextBox}></input></div>
		<div className="question-answer">
		    
		    <input className="question-answer-button" type="button" value="Odgovori" onClick={this.answer} ></input>
		</div>
	    </div>
	)
    }
}
