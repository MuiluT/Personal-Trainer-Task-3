import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class CustomerData extends Component
{

	constructor(props)
	{
	super(props);
	this.state = {
								customers: [],
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
		 fetch('https://customerrest.herokuapp.com/api/customers')
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
					this.setState({	customers: jsonedData.content	});
					//return jsonedData;
				})

				/* I wanted to join the data into one table so you could see
				name and activity with a collapsible data table on activities if there
				were more than one

			.then((linkData) =>
				{ //A personal link to the trainings
				this.setState({ urlLinks: linkData.content[0].links[2].href	});
			}) // Wanted to do another fetch and then combine to the customers state*/

	}

	//Add a customer with a post request
	addCustomer(customer)
	{
		fetch('https://customerrest.herokuapp.com/api/customers',
		{
			method: 'POST',
			headers: {
							 'Content-Type': 'application/json',
							 },
			body: JSON.stringify(customer)
		})
		.then(resolve => this.loadCustomers())
		.catch(error => console.error(error))
	}

	//Manually load customers and set the state
	loadCustomers = () =>
	{
		fetch('https://customerrest.herokuapp.com/api/customers')
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
				 this.setState({	customers: jsonedData.content	});
			 })
  }

	//Update a customer with a put method
	updateCustomer(customer, link)
	{
  	fetch(link,
     {
			 method: 'PUT',
			 headers: {
        			 'Content-Type': 'application/json',
						    },
			 body: JSON.stringify(customer)
    })
    .then(toast.success("Changes to customer saved!",
				 	{
        		position: toast.POSITION.TOP_LEFT
      		})
    		 )
    .catch(error => console.error(error))
		  this.loadCustomers();
  }

	//Delete a customer with delete method
	onDelClick = (idLink) =>
	{
  	confirmAlert({
    	 title: 'Deleting a customer',
       message: 'Are you sure you want to delete this?',
			 buttons:
			 [
				 {
					 label: 'CONFIRM',
					 onClick: () =>
					 {
		       	fetch(idLink,
							{
								method: 'DELETE'
							})
		        .then(resolve => this.loadCustomers())
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

	//Add a training with a post request
	//It should then show up in the training section
	addTraining(training)
	{
		fetch('https://customerrest.herokuapp.com/api/trainings',
		{
			method: 'POST',
			headers: {
							 'Content-Type': 'application/json',
							 },
			body: JSON.stringify(training)
		})
		.then(toast.success("New Training added!",
				 	{
        		position: toast.POSITION.TOP_LEFT
      		})
    		 )
		.catch(error => console.error(error))
	}

	render() {
		return (
		<div>
			<br></br>
			<h1>Customer Data</h1>
			<br></br>
			<ToastContainer autoClose={500}/>
			{/*Send props*/}
			<AddCustomer
				addCustomer={this.addCustomer}
				loadCustomers={this.loadCustomers}
			/>
		 	<ReactTable data={this.state.customers}
			 filterable

			 		/* We filter the row data by what it included in the row
				 	instead of what it begins with */
			 defaultFilterMethod={(filter, row) =>
					 (row[filter.id].toLowerCase().includes(filter.value.toLowerCase()))}
        columns=
				{[
            {
              columns:
							[
                {
                  accessor: "links[0].href",
                  show: false,
                },
								{
									id: "fullName",
									Header: "Full name",
									accessor: customerData => customerData.firstname +
														" " + customerData.lastname,
								},
                {
									id: "fullAddress",
                  Header: "Full address",
                  accessor: customerData => customerData.streetaddress +
														", " + customerData.postcode +
														", " + customerData.city,
                },
                {
                  Header: "E-mail",
                  accessor: "email",
                },
								{
                  Header: "Phone Number",
                  accessor: "phone",
                },
								{
									id: 'button',
									Header: "Edit",
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, original}) => (<EditCustomer
																						updateCustomer={this.updateCustomer}
																						loadCustomers={this.loadCustomers}
																						link={value}
																						customer={original}
																						/>)
                },
								{
									id: 'button',
									Header: "Add Training",
                  sortable: false,
                  filterable: false,
									width: 200,
                  accessor: 'links[0].href',
                  Cell: ({value, original}) => (<AddTraining
																								addTraining={this.addTraining}
																								loadTrainings={this.loadTrainings}
																								link={value}
																								customer={original}
																								/>)
                },
								{
									id: 'button',
									Header: "Delete",
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button	onClick={() => {this.onDelClick(value)}}>Delete</button>)
                },
              ]
            }
          ]}
          className="-striped -highlight" >
        </ReactTable>
		</div>
    );
  }


}

export default CustomerData;
