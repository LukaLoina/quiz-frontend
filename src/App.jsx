import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Quiz from './quiz';
import './App.css'

function App() {
    return (
	<BrowserRouter>
	    <div>
		<nav>
		    <ul className="navbar-list">
			<li><Link to="/"> Home </Link></li>
			<li><Link to="/quiz"> Quiz </Link></li>
		    </ul>
		</nav>
	    </div>
	    <div className="content">
		<Routes>
		    <Route path="/quiz" element={<Quiz />} />
		    <Route path="/" element={<Home2 />} />
		
		</Routes>
	    </div>
	    <div className="footer">2020 &copy;</div>
	</BrowserRouter>
    );
}

/*
function Home()
{
    return <h2>Home</h2>;
}
*/
class Home2 extends React.Component
{
    state = {
	element: <h1>Goodbye world!</h1>
    }

    componentDidMount()
    {
	this.setState({element: <h1>Hello World!</h1>})
    }

    render()
    {
	return this.state.element
    }
}

export default App;
