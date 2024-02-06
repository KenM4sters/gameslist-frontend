import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGame, saveGame, updatePhoto } from "../api/GameService";

const GameDetails = ({ updateGame, updateImage }) => {
  const inputRef = useRef();
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

  const selectImage = () => {
    inputRef.current.click();
  };

  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setGame((prev) => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`}))
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGame(id);
  }, []);

  return (
    <>
      <Link to={"/"} className="link">
        <i className="bi bi-arrow-left"></i> Back to Home
      </Link>
      <div className="game">
        <div className="game_details">
          <img src={game.photoUrl} alt={`Photo of ${game.name}`} />
          <div className="game_metadata">
            <p className="game_name">{game.name}</p>
            <p className="game_file_formats">
              JPG, PNG, or GIF - max size 10MB
            </p>
            <button className="btn" onClick={selectImage}>
              Change Photo
            </button>
          </div>
        </div>
        <div className="game_settings">Settings</div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => updatePhoto(e.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default GameDetails;
