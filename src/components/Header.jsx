import React from 'react'

// Header function
// params - destructuring expected object into each parameter
const Header = ({ toggleModal, numOfGames }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3> Games List ({numOfGames}) </h3>
            <button onClick={() => toggleModal(true)} className='btn'> Add New Game </button>
        </div>
    </header>
  )
}

export default Header