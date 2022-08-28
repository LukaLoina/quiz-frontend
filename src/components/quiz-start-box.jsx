import React from 'react'
import './quiz-start-box.css'

export default class QuizStartBox extends React.Component
{
    render()
    {
	return(
	    <div className="quiz-start-box">
		<div className="quiz-start-box-title">arithmetic mental stress test</div>
		<p>Ovaj kviz sadrži pitanja u kojima je potrebno oduzeti dva troznamenkasta broja. Svako pitanje otvoreno je 3 sekunde. Odgovor se može dati pritiskom tipke Enter, pritiskom gumba Odgovori na pitanju ili čekanjem isteka vremenskog intervala.</p>
		<button className="quiz-start-button" onClick={this.props.onClick}>Započni kviz</button>
	    </div>
	)
    }
}
