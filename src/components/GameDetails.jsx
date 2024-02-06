import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGame, saveGame } from "../api/GameService";

const GameDetails = ({ updateGame, updateImage }) => {
  const [game, setGame] = useState({
    name: "",
    protagonist: "",
    rating: "",
    photoUrl: "",
  });

  const { id } = useParams();

  const fetchGame = async (id) => {
    try {
      const { data } = await getGame(id);
      saveGame(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGame(id);
  }, []);

  return (
    <>
      <Link to={'/'} className="link"><i className="bi bi-arrow-left"></i> Back to Home</Link>
    </>
  )
};

export default GameDetails;
