import React from 'react';
import './question-timer.css'
import './timer-bar.css'

export default class QuestionTimer extends React.Component
{
    state = {
	timerId: undefined
    }
    
    componentDidMount()
    {
	let timeout = 0;
	if(this.props.minutes) timeout += 60000 * this.props.minutes;
	if(this.props.seconds) timeout += 1000 * this.props.seconds;
	const timer = setTimeout(this.props.onTimeout, timeout);
	this.setState({timerId: timer, timeout: timeout});
    }

    componentWillUnmount()
    {
	clearTimeout(this.state.timerId);
    }
    
    render()
    {
	const style={animation: `timer-bar-animation ${this.state.timeout/1000}s linear`}
	return(
	    <div className="timer-bar-outline">
		<div className="timer-bar question-timer-bar" style={style}></div>
	    </div>
	);
    }
}

