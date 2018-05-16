import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';
import EditTraining from './EditTraining';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class TrainingData extends Component
{

	constructor(props)
	{
	super(props);
	this.state = {
								trainings: [],
								requestFailed: false,
							 	};
	}

	//Once component mounts, it'll load the data
	componentDidMount()
	{
		this.loadData();
	}


	loadData = () =>
	{
		 fetch('https://customerrest.herokuapp.com/gettrainings')
			.then((response) =>
			{ if (!response.ok) //If the response is not ok
				{
				throw Error("Network request failed");
				}
				return response;
			})

			//Get the data in json form
			.then(data => data.json())
			.then((jsonedData) =>
				{
					this.setState({	trainings: jsonedData	});
				})

	}

	//Manually load trainings and set the state
	loadTrainings = () =>
	{
		fetch('https://customerrest.herokuapp.com/gettrainings')
		 .then((response) =>
		 { if (!response.ok) //If the response is not ok
			 {
			 throw Error("Network request failed");
			 }
			 return response;
		 })

		 //Get the data in json form
		 .then(data => data.json())
		 .then((jsonedData) =>
			 {
				 this.setState({	trainings: jsonedData	});
			 })
  }

	//Update a customer with a put method
	updateTraining(training, id)
	{
  	fetch("https://customerrest.herokuapp.com/api/trainings/" + id,
     {
			 method: 'PUT',
			 headers: {
        			 'Content-Type': 'application/json',
						    },
			 body: JSON.stringify(training)
    })
    .then(toast.success("Changes to training saved!",
				 	{
        		position: toast.POSITION.BOTTOM_LEFT
      		})
    		 )
    .catch(error => console.error(error))

		this.loadTrainings();
  }


	onDelClick = (id) =>
	{


		confirmAlert({
    	 title: 'Deleting a training session',
       message: 'Are you sure you want to delete this?',
			 buttons:
			 [
				 {
					 label: 'CONFIRM',
					 onClick: () =>
					 {
		       	fetch("https://customerrest.herokuapp.com/api/trainings/" + id,
							{
								method: 'DELETE'
							})
		        .then(resolve => this.loadTrainings())
		        .catch(error => console.error(error))

		        toast.success("Delete succeeded!",
						{
		          position: toast.POSITION.TOP_LEFT
		        });
				 	}
				},
				{
					label: 'CANCEL'
				}

			 ]
    })
  }


	render() {
		return (
		<div>
			<br></br>
			<h1>Training Data</h1>
			<br></br>

			<ToastContainer autoClose={500}/>
			{/* Pass data into table aaa*/}
			 <ReactTable data={this.state.trainings}
					filterable

						/*	We filter the row data by what it included in the row
 				 		instead of what it begins with */
				defaultFilterMethod={(filter, row) =>
            (row[filter.id].toLowerCase().includes(filter.value.toLowerCase()))}
		    	columns=
					{[
		      			{
		              columns:
									[
		                {
		                  Header: "Activity",
		                  accessor: "activity",
		                },
		                {
											id: "date", //Needs id because our accessor is not a string
		                  Header: "Time of activity",
		                  accessor: trainingsData => Moment(trainingsData.date).format('L')
																								+ ", " +Moment(trainingsData.date).format('HH:mm')
																								+ " - " + Moment(trainingsData.date).add(trainingsData.duration, 'minutes').format('HH:mm a')
																								+ ",	" + trainingsData.duration + " minutes",
		                },
										{
											id: 'button',
											sortable: false,
											filterable: false,
											width: 100,
											accessor: 'id',
											Cell: ({value, original}) => (<EditTraining
																							updateTraining={this.updateTraining}
																							loadTrainings={this.loadTrainings}
																							link={value}
																							training={original}
																							/>)
										},
		                {
		                  id: 'button',
		                  sortable: false,
		                  filterable: false,
		                  width: 100,
		                  accessor: 'id',
		                  Cell: ({value}) => (<button onClick={() => {this.onDelClick(value)}}>Delete</button>)
		                }
		              ]
		            }
		        ]}
		          className="-striped -highlight" >
		      </ReactTable>
		</div>
    );
  }


}

export default TrainingData;
