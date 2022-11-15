import {BiVideo} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

import './index.css'
import Popup from 'reactjs-popup'

const Header = () => {
  const addNewCard = () => {
    console.log('new card added')
  }
  const url = 'https://www.pokemon.com/us/pokemon-tcg/'

  return (
    <div className="upper-header">
      <div className="left-upper-container">
        <h1 className="main-heading">Virtual cards</h1>
        <a href={url} target="__blank" className="link">
          <BiVideo className="video-icon" />
          <p className="link-heading">Learn more</p>
        </a>
      </div>
      <div className="right-upper-container">
        <Popup
          trigger={
            <button
              type="button"
              className="add-new-card-button"
              onClick={addNewCard}
            >
              <AiOutlinePlus className="plus-icon" />
              <span className="virtual">Virtual card</span>
            </button>
          }
          position="left bottom"
        >
          {close => (
            <div className="new-card-container">
              <h1 style={{fontSize: '12px'}}>Here new card will be added</h1>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}
export default Header
