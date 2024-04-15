// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppItem, isToggleStar} = props
  const {id, title, date, isStared} = eachAppItem

  const toggleStar = () => {
    isToggleStar(id)
  }

  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item-container">
      <div className="item-top-section">
        <p className="item-name">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={toggleStar}
        >
          <img src={starImgUrl} alt="star" className="starImage" />
        </button>
      </div>
      <p className="date-format">
        {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
