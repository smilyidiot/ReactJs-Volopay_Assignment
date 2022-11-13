// Write your code here
import {Component} from 'react'
import Popup from 'reactjs-popup'
import Loader from 'react-loader-spinner'

// import {BsFillGridFill} from 'react-icons/bs'
// import {VscThreeBars} from 'react-icons/vsc'

import {BiSearchAlt2, BiFilter} from 'react-icons/bi'

import Header from '../Header'
import TabItems from '../TabItems'
import CardsList from '../CardsList'

import './index.css'

// const tabsList = [
//   {tabId: 'active', displayText: 'Your'},
//   {tabId: null, displayText: 'All'},
//   {tabId: 'blocked', displayText: 'Blocked'},
// ]

class Home extends Component {
  state = {
    isLoading: true,
    activeTab: 'active',
    searchValue: '',
    checkSubscription: '',
    checkBurner: '',
    selectValue: '',
    cardsData: {},
    contentSize: '40%',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const url = 'https://636e1713182793016f3638e2.mockapi.io/Vpay'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    //  {
    //         "name": "MemoStates",
    //         "owner_name": "Rohit",
    //         "budget_name": "Software subscription",
    //         "owner_id": 2,
    //         "spent": {
    //             "value": 100,
    //             "currency": "SGD"
    //         },
    //         "available_to_spend": {
    //             "value": 1000,
    //             "currency": "SGD"
    //         },
    //         "card_type": "burner",
    //         "expiry": "9 feb",
    //         "limit": 100,
    //         "status": "active"
    //     }

    if (response.ok) {
      const newData = data.map(each => ({
        id: each.id,
        name: each.name,
        ownerName: each.owner_name,
        budgetName: each.budget_name,
        ownerId: each.owner_id,
        spent: each.spent,
        availableToSpend: each.available_to_spend,
        cardType: each.card_type,
        expiry: each.expiry,
        limit: each.limit,
        status: each.status,
      }))

      this.setState({cardsData: newData, isLoading: false})
    } else {
      this.setState({cardsData: '', isLoading: false})
    }
  }

  onSearch = event => {
    this.setState({
      searchValue: event.target.value,
    })
  }

  onCheckSubscription = event => {
    this.setState({checkSubscription: event.target.checked})
    console.log('event of subs', event)
  }

  onCheckBurner = event => {
    this.setState({checkBurner: event.target.checked})
    console.log('event of burner', event)
  }

  onClickSelectOptions = event => {
    this.setState({selectValue: event.target.value})
  }

  onSubmitButton = event => {
    event.preventDefault()

    const {checkSubscription, checkBurner, selectValue} = this.state
    console.log('checkSubscription', checkSubscription)
    console.log('checkBurner', checkBurner)
    console.log('selectValue', selectValue)

    if (checkSubscription) {
      this.setState({checkSubscription})
    } else {
      this.setState({checkSubscription: ''})
    }
  }

  showCards = (cardType, number) => {
    this.setState({activeTab: cardType})
    const {activeTab} = this.state
    console.log(activeTab, number)
  }

  showAlignment = noOfItems => {
    if (noOfItems === '2') {
      const twoItems = {width: '40%'}
      this.setState({contentSize: twoItems})
    } else {
      const singleItem = {width: '80%'}
      this.setState({contentSize: singleItem})
    }

    const {contentSize} = this.state
    console.log('contentSize', contentSize)
  }

  renderViewItems = () => {
    const {cardsData, searchValue} = this.state

    const searchResults = cardsData.filter(each =>
      each.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    // console.log('searchResults', searchResults)

    return (
      <div className="main-container">
        <Header />
        <TabItems cardStatus={this.showCards} alignGrid={this.showAlignment} />
        <hr />
        <div className="filter-container">
          <div className="search-bar">
            <input
              type="search"
              className="search-input"
              onChange={this.onSearch}
            />
            <BiSearchAlt2 className="search-icon" />
          </div>
          <div className="filter-box">
            <Popup
              modal
              position="left bottom"
              trigger={
                <button type="button" className="popup-button">
                  <BiFilter className="filter-icon" />
                  <p className="filter-heading">Filter</p>
                </button>
              }
            >
              {close => (
                <form
                  className="popup-container"
                  onSubmit={this.onSubmitButton}
                >
                  <h1 className="popup-heading">Filter</h1>
                  <hr />
                  <div className="type-container">
                    <h1 className="type-heading">Type</h1>
                    <ul className="type-list">
                      <li className="checkbox-item">
                        <input
                          type="checkbox"
                          id="subscription"
                          className="checkbox"
                          onChange={this.onCheckSubscription}
                        />
                        <label className="label" htmlFor="subscription">
                          Subscription
                        </label>
                      </li>
                      <li className="checkbox-item">
                        <input
                          type="checkbox"
                          id="burner"
                          className="checkbox"
                          onChange={this.onCheckBurner}
                        />
                        <label className="label" htmlFor="burner">
                          Burner
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="card-holder-container">
                    <select
                      className="select-options"
                      onChange={this.onClickSelectOptions}
                      placeholder="Select cardholder"
                    >
                      <option value="limit">Limit</option>
                      <option value="expiry">Expiry</option>
                    </select>
                  </div>
                  <div className="button-container">
                    <button type="submit">Apply</button>
                    <button type="button" onClick={() => close()}>
                      Clear
                    </button>
                  </div>
                </form>
              )}
            </Popup>
          </div>
        </div>
        <div className="card-container">
          <ul className="cards-list">
            {searchResults.map(eachCard => (
              <CardsList key={eachCard.id} content={eachCard} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderViewItems()
        )}
      </>
    )
  }
}

export default Home
