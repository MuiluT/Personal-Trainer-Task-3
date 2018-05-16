import React, { Component } from 'react';
import Skylight from 'react-skylight';


class AddCustomer extends Component {

constructor(props) {
      super(props);
      this.state = {
          firstname: '',
					lastname: '',
					streetaddress: '',
					postcode: '',
					city: '',
					email: '',
					phone: '',
				  };
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  /* Save customer to newCustomer,
   send it to CustomerData.js AddCustomer,
   load customers again*/
  handleSubmit = (event) => {
      event.preventDefault();
      var newCustomer = {
            firstname: this.state.firstname,
						lastname: this.state.lastname,
						streetaddress: this.state.streetaddress,
						postcode: this.state.postcode,
						city: this.state.city,
						email: this.state.email,
						phone: this.state.phone,
          };

      this.props.addCustomer(newCustomer);
      this.props.loadCustomers();
      this.refs.CustomerPopUp.hide();
  }

  render() {
    // Make a new popup to fit the screen
    const addCustomerPopUp = {
      width: '30%',
      height: '50%',
      marginTop: '-250px',
      marginLeft: '-15%',
    };

    return (
      <div>
        <Skylight dialogStyles={addCustomerPopUp} hideOnOverlayClicked ref="CustomerPopUp">
          <div className="card" style={{"width": "95%"}}>
            <div className="card-body">
                <h5 className="card-title">New customer</h5>
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Firstname" className="form-control" name="firstname" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Address" className="form-control" name="streetaddress" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="City" className="form-control" name="city" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="E-mail" className="form-control" name="email" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Phone Number" className="form-control" name="phone" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </form>
            </div>
          </div>
        </Skylight>

        <div>
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.CustomerPopUp.show()}>New customer</button>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
