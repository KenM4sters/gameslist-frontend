import React from 'react'
import {Link} from 'react-router-dom'

const Game = ({ game }) => {
  return (
    <Link to={`/games/${game.id}`} className='game_item'>
        <div className='game_item_body'>
            <div className='game_item_image'>
                <img src={game.photoUrl} alt={game.name}></img>
            </div>
            <div className='game_item_info'>
                <p className='game_item_info_name'>{game.name.substring(0, 20)}</p>
                <p className='game_item_info_rating'>Rating: {game.rating}</p>
                <p className='game_item_body_protagonist'>{game.protagonist}</p>
            </div>
        </div>
    </Link>
  )
}

export default Game