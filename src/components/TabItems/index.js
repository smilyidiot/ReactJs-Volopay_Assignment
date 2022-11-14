import {VscThreeBars} from 'react-icons/vsc'
import {BsFillGridFill} from 'react-icons/bs'

import './index.css'

const TabItems = props => {
  const {cardStatus, alignGrid, openYoursTab} = props

  const yoursCard = () => {
    openYoursTab(true)
  }

  const allCard = () => {
    cardStatus('active')
  }

  const blockedCard = () => {
    cardStatus('blocked')
  }

  const grid = () => {
    alignGrid(false)
  }

  const horizontal = () => {
    alignGrid(true)
  }

  return (
    <div className="tab-container">
      <nav className="nav-bar-container">
        <button className="nav-button" type="button" onClick={yoursCard}>
          Your
        </button>
        <button className="nav-button" type="button" onClick={allCard}>
          All
        </button>
        <button className="nav-button" type="button" onClick={blockedCard}>
          Blocked
        </button>
      </nav>
      <nav className="alignment-container">
        <button type="button" className="align-button" onClick={grid}>
          <BsFillGridFill className="tab-icon" />
        </button>
        <button type="button" className="align-button" onClick={horizontal}>
          <VscThreeBars className="tab-icon" />
        </button>
      </nav>
    </div>
  )
}

export default TabItems
