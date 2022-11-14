// Write your code here
import {Component} from 'react'
import Popup from 'reactjs-popup'
import Loader from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroller'
import ReactPaginate from 'react-paginate'

import {BiSearchAlt2, BiFilter} from 'react-icons/bi'

import Header from '../Header'
import TabItems from '../TabItems'
import CardsList from '../CardsList'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    activeTab: 'active',
    yoursTab: false,
    searchValue: '',
    checkSubscription: '',
    checkBurner: '',
    selectValue: 'all',
    cardsData: {},
    contentSize: false,
    setItemOffSet: 0,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const url = 'https://636e1713182793016f3638e2.mockapi.io/Vpay'

    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)

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
    // console.log('event of subs', event)
  }

  onCheckBurner = event => {
    this.setState({checkBurner: event.target.checked})
    // console.log('event of burner', event)
  }

  onClickSelectOptions = event => {
    this.setState({selectValue: event.target.value})
  }

  onSubmitButton = event => {
    event.preventDefault()

    const {checkSubscription, checkBurner, selectValue} = this.state
    this.setState({
      checkSubscription,
      checkBurner,
      selectValue,
    })

    console.log('checkSubscription', checkSubscription)
    console.log('checkBurner', checkBurner)
    console.log('selectValue', selectValue)
  }

  showCards = cardType => {
    this.setState({activeTab: cardType, yoursTab: false})
  }

  yoursTabActive = bool => {
    this.setState({yoursTab: bool})
  }

  showAlignment = queue => {
    this.setState({contentSize: queue})
  }

  closeButton = () => {
    this.setState({
      checkSubscription: false,
      checkBurner: false,
      selectValue: 'all',
    })
  }

  renderViewItems = () => {
    const {
      cardsData,
      activeTab,
      yoursTab,
      searchValue,
      checkSubscription,
      checkBurner,
      selectValue,
      contentSize,
    } = this.state
    console.log(checkSubscription, checkBurner, selectValue)

    let openYourCards
    if (yoursTab) {
      openYourCards = cardsData.filter(each => each.ownerName === 'Akamaru')
    } else {
      openYourCards = cardsData
    }

    let subscriptionCards
    if (checkSubscription) {
      subscriptionCards = openYourCards.filter(each =>
        each.cardType.includes('subscription'),
      )
    } else {
      subscriptionCards = openYourCards
    }

    let burnerCards
    if (checkBurner) {
      burnerCards = subscriptionCards.filter(each =>
        each.cardType.includes('burner'),
      )
    } else {
      burnerCards = subscriptionCards
    }

    const tabCards = burnerCards.filter(each => each.status === activeTab)

    const searchResults = tabCards.filter(each =>
      each.name.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div style={{height: '700px', overflow: 'auto'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.renderViewItems}
          hasMore={false}
          loader={
            <div className="loader" key={0}>
              Loading...
            </div>
          }
          useWindow={false}
        >
          <div className="main-container">
            <Header />
            <TabItems
              cardStatus={this.showCards}
              openYoursTab={this.yoursTabActive}
              alignGrid={this.showAlignment}
            />
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
                  trigger={
                    <button type="button" className="popup-button">
                      <BiFilter className="filter-icon" />
                      <p className="filter-heading">Filter</p>
                    </button>
                  }
                  position="left top"
                >
                  {close => (
                    <div>
                      <form
                        className="popup-container"
                        onSubmit={this.onSubmitButton}
                      >
                        <h1 className="popup-heading">Filters</h1>
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
                          <h1 className="type-heading">CardHolder</h1>
                          <select
                            id="card-holder"
                            className="select-options"
                            onChange={this.onClickSelectOptions}
                            placeholder="Select cardholder"
                          >
                            <option default value="limit">
                              Limit
                            </option>
                            <option value="expiry">Expiry</option>
                          </select>
                        </div>
                        <div className="button-container">
                          <button type="submit" className="form-apply-button">
                            Apply
                          </button>
                          <button
                            type="button"
                            className="form-close-button"
                            onClick={this.closeButton}
                          >
                            Clear
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
            <div className="card-home-container">
              <ul className="cards-list">
                {searchResults.map(eachCard => (
                  <CardsList
                    key={eachCard.id}
                    content={eachCard}
                    queue={contentSize}
                  />
                ))}
              </ul>
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }

  paginateItems = () => {
    const {cardsData} = this.state

    const itemOffSet = 0
    const endOffSet = itemOffSet + 10

    console.log(`loading items from ${itemOffSet} to ${endOffSet}`)

    const currentItems = cardsData.length.slice(itemOffSet, endOffSet)
    const pageCount = Math.ceil(cardsData.length / 10)

    const handlePageClick = event => {
      const newOffSet = (event.selected * 10) % cardsData.length

      this.setState({setItemOffSet: newOffSet})
    }

    return (
      <div id="container">
        {this.renderViewItems()}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        {isLoading ? (
          <div className="loader-container">
            <Loader type="TailSpin" height={50} width={50} />
          </div>
        ) : (
          this.renderViewItems()
        )}
      </div>
    )
  }
}

export default Home
