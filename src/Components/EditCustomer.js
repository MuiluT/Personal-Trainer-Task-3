import React, { Component } from 'react';
import Skylight from 'react-skylight';


class EditCustomer extends Component {

constructor(props) {
      super(props);
      this.state = {
                    firstname: this.props.customer.firstname,
                    lastname: this.props.customer.lastname,
                    streetaddress: this.props.customer.streetaddress,
                    postcode: this.props.customer.postcode,
                    city: this.props.customer.city,
                    email: this.props.customer.email,
                    phone: this.props.customer.phone,
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

      this.props.updateCustomer(newCustomer, this.props.link);
      this.props.loadCustomers();
      this.refs.editCustomerPopUp.hide();
  }

  render() {
    // Make a new popup to fit the screen
    const editCustomerPopUp = {
      width: '30%',
      height: '50%',
      marginTop: '-250px',
      marginLeft: '-15%',
    };

    return (
      <div>
        <Skylight dialogStyles={editCustomerPopUp} hideOnOverlayClicked ref="editCustomerPopUp">
          <div className="card" style={{"width": "95%"}}>
            <div className="card-body">
                <h5 className="card-title">Edit customer</h5>
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Firstname" value={this.state.firstname} className="form-control" name="firstname" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Lastname" value={this.state.lastname} className="form-control" name="lastname" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Address" value={this.state.streetaddress} className="form-control" name="streetaddress" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Postcode" value={this.state.postcode} className="form-control" name="postcode" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="City" value={this.state.city} className="form-control" name="city" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="E-mail" value={this.state.email} className="form-control" name="email" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Phone Number" value={this.state.phone} className="form-control" name="phone" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </form>
            </div>
          </div>
        </Skylight>

        <div>
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.editCustomerPopUp.show()}>Edit</button>
        </div>
      </div>
    );
  }
}

export default EditCustomer;
