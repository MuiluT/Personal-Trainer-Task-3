import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import CustomerData from './Components/CustomerData';
import TrainingData from './Components/TrainingData';
import Calendar from './Components/Calendar';

class App extends Component {

	render() {
		return (
		<div className="App">

			<header className="App-header">
				<h1 className="App-title">Personal Trainer</h1>
				<h3>A collection of customers and their trainings with a calendar</h3>
			</header>

      <BrowserRouter>
          <div>
						<ul>
            	<li><Link to="/"><span>| Front Page |</span></Link>{''}</li>
							<li><Link to="/customers"><span>| List of Customers |</span></Link>{''}</li>
            	<li><Link to="/trainings"><span>| List of Trainings |</span></Link>{''}</li>
							<li><Link to="/calendar"><span>| Training Calendar |</span></Link>{''}</li>
						</ul>

            <Switch>
              <Route exact path="/" component={Homepage}/> {/*Located below*/}
              <Route path="/customers" component={CustomerData} />
              <Route path="/trainings" component={TrainingData} />
							<Route path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </BrowserRouter>
		</div>
    );
  }
}

class Homepage extends Component {
	render(){
		return (
			<div>
				<br></br>
				<h1>Homepage</h1>
				<br></br>

				<div>
					<p>Hello, this is the homepage for the personal trainer. You can navigate
					with the upper left navigation and see the data of customers and trainings.<br></br>
					Now you can also add/edit and remove customers and/or trainings in each respective tab.<br></br><br></br>
					They are all fully searchable and sortable.<br></br>
					Search is not case sensitive.<br></br>
					You can search by any data part of the table (i.e. "lastname" for person "firstname lastname")<br></br><br></br>
					Now with a calendar!</p>
				</div>
			</div>
		);
	}
}

export default App;
