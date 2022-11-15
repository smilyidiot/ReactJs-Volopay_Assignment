import {BiVideo} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

import './index.css'

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
        <button
          type="button"
          className="add-new-card-button"
          onClick={addNewCard}
        >
          <AiOutlinePlus className="plus-icon" />
          <span className="virtual">Virtual card</span>
        </button>
      </div>
    </div>
  )
}
export default Header
