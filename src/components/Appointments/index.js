import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isActive: false}

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({date: event.target.value})
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  isToggleStar = uniqueId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === uniqueId) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  staredItems = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  render() {
    const {appointmentList, title, date, isActive} = this.state
    // console.log(title)
    // console.log(date)
    // console.log(isActive)
    let filteredData
    if (isActive === true) {
      filteredData = appointmentList.filter(
        eachItem => eachItem.isStared === true,
      )
    } else {
      filteredData = appointmentList
    }

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="app-container">
            <form className="form-container" onSubmit={this.onFormSubmit}>
              <div className="container">
                <h1 className="app-heading"> Add Appointment</h1>
                <label htmlFor="titleId" className="label-title">
                  Title
                </label>
                <br className="break" />
                <input
                  placeholder="Title"
                  id="titleId"
                  className="title"
                  onChange={this.titleChange}
                  value={title}
                />
                <br />
                <label htmlFor="dateId" className="label-date">
                  Date
                </label>
                <br className="break" />
                <input
                  type="date"
                  id="dateId"
                  className="date"
                  onChange={this.dateChange}
                  value={date}
                />
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="app-image"
              />
            </form>
            <ul className="list-container">
              <li className="list-top-section">
                <h1 className="app-list-heading">Appointments</h1>
                <button
                  type="button"
                  className="stared-button"
                  onClick={this.staredItems}
                >
                  Starred
                </button>
              </li>

              <div className="items-in-a-list">
                {filteredData.map(eachApp => (
                  <AppointmentItem
                    key={eachApp.id}
                    eachAppItem={eachApp}
                    isToggleStar={this.isToggleStar}
                  />
                ))}
              </div>

              {/* <li className="item-container">
                <div className="item-top-section">
                  <h1 className="item-name">Dentist</h1>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
                    alt="star"
                    className="starImage"
                  />
                </div>
                <p className="date-format"> 20 July 2021, Tuesday</p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
