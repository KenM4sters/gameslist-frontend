import React from 'react'

const Header = ({ toggleModal, numOfGames }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3> Games List ({numOfGames}) </h3>
        </div>
        <div className='header-btn-wrapper'>
          <button onClick={() => toggleModal(true)} className='btn'> Add New Game </button>
        </div>
    </header>
  )
}

export default Header