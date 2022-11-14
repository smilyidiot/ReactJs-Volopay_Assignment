import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsDot} from 'react-icons/bs'
import {ImFire} from 'react-icons/im'
import {TiArrowSync} from 'react-icons/ti'
import {GoPrimitiveDot} from 'react-icons/go'

import './index.css'

class CardItemDetails extends Component {
  state = {
    isLoading: false,
    cardDetails: {},
  }

  componentDidMount() {
    this.getEachCard()
  }

  getEachCard = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {url} = match

    const fetchUrl = `https://636e1713182793016f3638e2.mockapi.io/Vpay${url}`

    const response = await fetch(fetchUrl)
    const data = await response.json()

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
      console.log(newData)

      this.setState({cardDetails: newData, isLoading: false})
    } else {
      this.setState({cardDetails: '', isLoading: false})
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
      <div className="card-browser-container">
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
          <span className="desc">Expires: {expiry}</span>
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

    console.log(spent)
    return (
      <div className="card-browser-container">
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
              {/* {spent.value} {spent.currency} */}
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
              {/* {availableToSpend.value} {availableToSpend.currency} */}
            </span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {cardDetails, isLoading} = this.state
    const {cardType} = cardDetails
    const showBurnerCard = cardType === 'burner'

    return (
      <div className="card-browser">
        {isLoading ? (
          <div className="leader">
            <Loader type="Oval" height={50} width={50} />
          </div>
        ) : (
          <>
            {showBurnerCard
              ? this.showBurnerCards()
              : this.showSubscriptionCards()}
          </>
        )}
      </div>
    )
  }
}

export default CardItemDetails
