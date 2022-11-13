import {Component} from 'react'

import {BsDot} from 'react-icons/bs'
import {ImFire} from 'react-icons/im'
import {TiArrowSync} from 'react-icons/ti'
import {GoPrimitiveDot} from 'react-icons/go'

import './index.css'

class CardItemDetails extends Component {
  state = {
    // isLoading: false,
    cardDetails: {},
  }

  componentDidMount() {
    this.getEachCard()
  }

  getEachCard = async () => {
    // this.setState({isLoading: true})

    const {match} = this.props
    const {url} = match

    const fetchUrl = `https://636e1713182793016f3638e2.mockapi.io/Vpay${url}`

    const response = await fetch(fetchUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const newData = {
        id: data.id,
        name: data.name,
        ownerName: data.owner_name,
        budgetName: data.budget_name,
        ownerId: data.owner_id,
        spent: data.spent,
        availableToSpend: data.available_to_spend,
        cardType: data.card_type,
        expiry: data.expiry,
        limit: data.limit,
        status: data.status,
      }

      this.setState({cardDetails: newData})
    } else {
      this.setState({cardDetails: ''})
    }
  }

  showBurnerCards = () => {
    const {cardDetails} = this.state
    const {
      name,
      ownerName,
      budgetName,
      spent,
      availableToSpend,
      expiry,
    } = cardDetails

    return (
      <div className="each-card-container">
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
    )
  }

  showSubscriptionCards = () => {
    const {cardDetails} = this.state
    const {
      name,
      ownerName,
      budgetName,
      spent,
      availableToSpend,
      limit,
    } = cardDetails
    return (
      <div className="each-card-container">
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
    )
  }

  render() {
    const {cardDetails} = this.state
    const {cardType} = cardDetails
    const showCards = cardType === 'burner'

    return (
      <>{showCards ? this.showBurnerCards() : this.showSubscriptionCards()}</>
    )
  }
}

export default CardItemDetails
