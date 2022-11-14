import {Link} from 'react-router-dom'

import {BsDot} from 'react-icons/bs'
import {ImFire} from 'react-icons/im'
import {TiArrowSync} from 'react-icons/ti'
import {GoPrimitiveDot} from 'react-icons/go'

import './index.css'

const CardsList = props => {
  const {content, queue} = props
  const {
    id,
    name,
    budgetName,
    ownerName,
    spent,
    availableToSpend,
    cardType,
    expiry,
    limit,
  } = content

  const alignCards = queue ? {width: '90%'} : {width: '45%'}

  const showBurnerCards = () => {
    const jsonDate = new Date(expiry)
    const time = jsonDate.toLocaleDateString()
    return (
      <li className="each-card-container" style={alignCards}>
        <Link to={`/${id}`} className="link">
          <div className="link-container">
            <div className="upper-details">
              <div className="upper-left-container">
                <h1 className="name">{name}</h1>
                <div className="bio-container">
                  <span className="desc">{ownerName}</span>
                  <BsDot className="bs-dot" />
                  <span className="desc">{budgetName}</span>
                </div>
              </div>
              <div className="upper-right-container">
                <ImFire className="card-icon" />
              </div>
            </div>
            <div className="card-type-container">
              <span className="card-type">BURNER</span>
              <span className="desc">Expires: {time}</span>
            </div>
            <hr />
            <div className="spent-container">
              <div className="notation">
                <GoPrimitiveDot className="dot" />
                <span className="notation-name">Spent</span>
              </div>
              <div className="currency">
                <span>
                  {spent.value} {spent.currency}
                </span>
              </div>
            </div>
            <div className="spent-container">
              <div className="notation">
                <GoPrimitiveDot className="dot" />
                <span className="notation-name">Available to spend</span>
              </div>
              <div className="available-currency">
                <span>
                  {availableToSpend.value} {availableToSpend.currency}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
  }

  const showSubscriptionCards = () => (
    <li className="each-card-container" style={alignCards}>
      <Link to={`/${id}`} className="link">
        <div className="link-container">
          <div className="upper-details">
            <div className="upper-left-container">
              <h1 className="name">{name}</h1>
              <div className="bio-container">
                <span className="desc">{ownerName}</span>
                <BsDot className="bs-dot" />
                <span className="desc">{budgetName}</span>
              </div>
            </div>
            <div className="upper-right-container">
              <TiArrowSync className="card-icon" />
            </div>
          </div>
          <div className="card-type-container">
            <span className="card-type">SUBSCRIPTION</span>
            <span className="expires">December Limit: {limit}</span>
          </div>
          <hr />
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <span className="spent">Spent</span>
            </div>
            <div className="spent-currency">
              <span className="spent-value">
                {spent.value} {spent.currency}
              </span>
            </div>
          </div>
          <div className="spent-container">
            <div className="notation">
              <GoPrimitiveDot className="dot" />
              <span className="notation-name">Available to spend</span>
            </div>
            <div className="available-currency">
              <span>
                {availableToSpend.value} {availableToSpend.currency}
              </span>
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
