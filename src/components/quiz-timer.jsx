import React from 'react'
import './timer-bar.css'
import './quiz-timer.css'

export default class QuizTimer extends React.Component
{
    state = {
	endTime: undefined,
	display: undefined,
	intervalId: undefined
    }

    tick()
    {
	const currentTime = new Date().getTime();
	const { endTime } = this.state;
	if(!endTime || !currentTime) return;
	
	const distance = endTime - currentTime;
	if(distance < 0){
	    if(this.state.intervalId) clearInterval(this.state.intervalId);
	    if(this.props.onTimeout) this.props.onTimeout();
	}
	
	const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
	const seconds = Math.max(0, Math.floor(((distance % (1000 * 60)) / 1000)));

	this.setState({"display": `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`});
    }
    
    componentDidMount(){
	let timeout = 0;
	if(this.props.minutes) timeout += 60000 * this.props.minutes;
	if(this.props.seconds) timeout += 1000 * this.props.seconds;

	const intervalId = setInterval(() => { this.tick()}, 250,);
	this.setState({"intervalId": intervalId,
		       "endTime": new Date().getTime() + timeout,
		       "duration": timeout});
    }

    componentWillUnmount()
    {
	if(this.state.intervalId) clearInterval(this.state.intervalId);
    }
    
    render(){
	const style={animation: `timer-bar-animation ${this.state.duration/1000}s linear`}
	return(
	    <>
		<div className="quiz-timer-separator"></div>
		<div className="timer-bar-outline quiz-timer-outline">
		    <div className="timer-bar quiz-timer-bar" style={style}></div>
		    <div className="quiz-countdown">{this.state.display}</div>
		</div>
	    </>
	);
    }
}
