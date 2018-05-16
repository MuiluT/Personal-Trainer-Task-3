import React, { Component } from 'react';
import Skylight from 'react-skylight';


class AddTraining extends Component {

constructor(props) {
      super(props);
      this.state = {
                    link: this.props.link,
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

  /* Save training to newTraining,
   send it to CustomerData.js AddTraining,
   load training data again*/
  handleSubmit = (event) => {
      event.preventDefault();

      /*var customer = [firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddess,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone,]; */

      //Apparently, just the link is enough
      var newTraining = {
                        customer: this.state.link,
                        activity: this.state.activity,
                        duration: this.state.duration,
                        date: this.state.date,
                        };

      this.props.addTraining(newTraining);
      this.refs.addTrainingPopUp.hide();

  }

  render() {
    // Make a new popup(modal) a certain size
    const addTrainingPopUp = {
      width: '30%',
      height: '50%',
      marginTop: '-250px',
      marginLeft: '-15%',
    };

    return (
      <div>
        <Skylight dialogStyles={addTrainingPopUp} hideOnOverlayClicked ref="addTrainingPopUp">
          <div className="card" style={{"width": "95%"}}>
            <div className="card-body">
                <h5 className="card-title">New training</h5>
                <form>
                  <div className="form-group">
                      <input type="text" placeholder="Firstname" value={this.state.firstname} readOnly={true} className="form-control" name="firstname"/>
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="Lastname" value={this.state.lastname} readOnly={true} className="form-control" name="lastname"/>
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="Address" value={this.state.streetaddress} readOnly={true} className="form-control" name="streetaddress" />
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="Postcode" value={this.state.postcode} readOnly={true} className="form-control" name="postcode" />
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="City" value={this.state.city} readOnly={true} className="form-control" name="city" />
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="E-mail" value={this.state.email} readOnly={true} className="form-control" name="email"/>
                  </div>

                  <div className="form-group">
                      <input type="text" placeholder="Phone Number" value={this.state.phone} readOnly={true} className="form-control" name="phone"/>
                  </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Duration (min)" className="form-control" name="duration" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Add training</button>
                    </div>
                </form>
            </div>
          </div>
        </Skylight>

        <div>
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.addTrainingPopUp.show()}>New Training</button>
        </div>
      </div>
    );
  }
}

export default AddTraining;
