import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(Moment));

class Calendar extends Component {

  constructor(props) {
        super(props);
        this.state = {
                      trainings: [],
                      eventCalendar: [],
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
            this.setState({	trainings: jsonedData	},
            () => {this.getEventTimes(); }); //callback for when after state is set
          })

  }

  //Use this to get the event times from the
  //gettrainings json
  getEventTimes()
  {
    var bigCalendarFormat = [];
    //For each item i in trainings, we make a new array
    //in calendar format and then set it to the
    //eventCalendar state that's in BigCalendar format.
    for(var i = 0; i < this.state.trainings.length; i++)
    {
      bigCalendarFormat.push({
                          title: this.state.trainings[i].activity,
                          //startAccessor and endAccessor for BigCalendar
                          //must resolve to a JavaScript Date object.
                          start: Moment(this.state.trainings[i].date).toDate(),
                          end: Moment(this.state.trainings[i].date).add(this.state.trainings[i].duration, 'minutes').toDate()
                          });
    }
    // Testing console.log(calendarFormat);
    this.setState({eventCalendar: bigCalendarFormat});
  }


 render() {
    return (
      <div>
        <br></br>
        <h1>Training Calendar</h1>
        <br></br>

        <BigCalendar
        events={this.state.eventCalendar}
        defaultView='week'
        views={['day', 'week', 'month']}
        showMultiDayTimes
        />
      </div>

          );
  }
}


export default Calendar;
