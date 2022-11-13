import {Link} from 'react-router-dom'

import {BsDot} from 'react-icons/bs'
import {ImFire} from 'react-icons/im'
import {TiArrowSync} from 'react-icons/ti'
import {GoPrimitiveDot} from 'react-icons/go'

import './index.css'

const CardsList = props => {
  const {content} = props
  const {
    id,
    name,
    ownerName,
    budgetName,
    spent,
    availableToSpend,
    cardType,
    expiry,
    limit,
  } = content

  const showBurnerCards = () => (
    <li className="each-card-container">
      <Link to={`/${id}`} className="link">
        <div className="link-container">
          <div className="upper-details">
            <div className="upper-left-container">
              <h1 className="name">{name}</h1>
              <div className="bio-container">
                <span className="desc">{ownerName}</span>
                <BsDot className="dot-icon" />
                <span className="desc">{budgetName}</span>
              </div>
            </div>
            <div className="upper-right-container">
              <ImFire className="card-icon" />
            </div>
          </div>
          <div className="card-type-container">
            <p className="card-type">BURNER</p>
            <p className="desc">Expires: {expiry}</p>
          </div>
          <hr />
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <p className="notation-name">Spent</p>
            </div>
            <div className="currency">
              {spent.value} {spent.currency}
            </div>
          </div>
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <p className="notation-name">Available to spend</p>
            </div>
            <div className="available-currency">
              {availableToSpend.value} {availableToSpend.currency}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )

  const showSubscriptionCards = () => (
    <li className="each-card-container">
      <Link to={`/${id}`} className="link">
        <div className="link-container">
          <div className="upper-details">
            <div className="upper-left-container">
              <h1 className="name">{name}</h1>
              <div className="bio-container">
                <span className="desc">{ownerName}</span>
                <BsDot className="dot-icon" />
                <span className="desc">{budgetName}</span>
              </div>
            </div>
            <div className="upper-right-container">
              <TiArrowSync className="card-icon" />
            </div>
          </div>
          <div className="card-type-container">
            <p className="card-type">SUBSCRIPTION</p>
            <p className="expires">December Limit: {limit} SGD</p>
          </div>
          <hr />
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <p className="spent">Spent</p>
            </div>
            <div className="spent-currency">
              {spent.value} {spent.currency}
            </div>
          </div>
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <p className="notation-name">Available to spend</p>
            </div>
            <div className="available-currency">
              {availableToSpend.value} {availableToSpend.currency}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )

  const showCards = cardType === 'burner'

  return <>{showCards ? showBurnerCards() : showSubscriptionCards()}</>
}

export default CardsList
