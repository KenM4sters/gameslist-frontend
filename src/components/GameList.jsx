import React from "react";
import Game from "./Game";

const GameList = ({ data, currentPage, getAllGames }) => {
  return (
    <>
    <main className="game_list_body">
      <div className="game_list_wrapper">
        {data?.content?.length == 0 && <div>No Games...</div>}
        <ul className="game_list_items">
          {data?.content?.length > 0 &&
            data.content.map((game) => 
              <Game game={game} key={game.id}></Game>
            )}
        </ul>
      </div>

      {data?.content?.length > 0 && data?.totalPages > 1 && 
        <div className="pagination">
            <a onClick={() => getAllGames(currentPage - 1)} className={0 == currentPage ? 'disabled' : ''}>
                &laquo;
            </a>
            { data && [...Array(data.totalPages).keys()].map((page, index) => 
                <a onClick={() =>  getAllGames(page)} className={currentPage == page ? 'active' : ''} key={page}>
                    {page + 1}
                </a>
            )}
            <a onClick={() => getAllGames(currentPage + 1)} className={data.totalPages - 1 == currentPage ? 'disabled' : ''}>
                &raquo;
            </a>
        </div>
      }
    </main>
    </>
  );
};

export default GameList;
