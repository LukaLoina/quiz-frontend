import React from 'react'
import './question-loader.css'

export default class QuestionLoader extends React.Component
{
    state = {
	timerId: undefined
    }
    
    componentDidMount()
    {
	const timer = setTimeout(() => {this.props.onTimeout()} ,2000);
	this.setState({timerId: timer});
    }

    componentWillUnmount()
    {
	clearTimeout(this.state.timerId);
    }
    
    render()
    {
	return(
	    <>
		<div className="lds-dual-ring"></div>
	    </>
	);
    }
}
