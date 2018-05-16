import React, { Component } from 'react';
import Skylight from 'react-skylight';


class EditTraining extends Component {

constructor(props) {
      super(props);
      this.state = {
                    customer: this.props.training.customer.firstname +
                    " " + this.props.training.customer.lastname,
                    activity: this.props.training.activity,
                    duration: this.props.training.duration,
                    date: this.props.training.date,
                    link: this.props.link,
                    };
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  /* Save training to newTraining,
   send it to TrainingData.js AddCustomer,
   load training data again*/
  handleSubmit = (event) => {
      event.preventDefault();

      var newTraining = {
                        link: this.state.link,
                        activity: this.state.activity,
                        duration: this.state.duration,
                        date: this.state.date,
                        };

      this.props.updateTraining(newTraining, this.props.link);
      this.props.loadTrainings();
      this.refs.editTrainingPopUp.hide();
  }

  render() {
    // Make a new popup(modal) a certain size
    const editTrainingPopUp = {
      width: '30%',
      height: '50%',
      marginTop: '-250px',
      marginLeft: '-15%',
    };

    return (
      <div>
        <Skylight dialogStyles={editTrainingPopUp} hideOnOverlayClicked ref="editTrainingPopUp">
          <div className="card" style={{"width": "95%"}}>
            <div className="card-body">
                <h5 className="card-title">Edit training</h5>
                <form>
                  <div className="form-group">
                      <input type="text" placeholder="ID" value={this.state.customer} readOnly={true} className="form-control" name="customer" onChange={this.handleChange}/>
                  </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Activity" value={this.state.activity} className="form-control" name="activity" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Duration (min)" value={this.state.duration} className="form-control" name="duration" onChange={this.handleChange}/>
                    </div>

  				          <div className="form-group">
                        <input type="text" placeholder="Date" value={this.state.date} className="form-control" name="date" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </form>
            </div>
          </div>
        </Skylight>

        <div>
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.editTrainingPopUp.show()}>Edit</button>
        </div>
      </div>
    );
  }
}

export default EditTraining;
