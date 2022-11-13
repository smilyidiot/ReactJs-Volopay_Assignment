import {VscThreeBars} from 'react-icons/vsc'
import {BsFillGridFill} from 'react-icons/bs'

import './index.css'

const TabItems = props => {
  const {cardStatus, alignGrid} = props

  const yoursCard = () => {
    cardStatus('active', '1')
  }

  const allCard = () => {
    cardStatus('', '0')
  }

  const blockedCard = () => {
    cardStatus('blocked', '2')
  }

  const grid = () => {
    alignGrid('2')
  }

  const horizontal = () => {
    alignGrid('1')
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
        <button type="button" onClick={grid}>
          <BsFillGridFill className="tab-icon" />
        </button>
        <button type="button" onClick={horizontal}>
          <VscThreeBars className="tab-icon" />
        </button>
      </nav>
    </div>
  )
}

export default TabItems
