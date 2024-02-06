import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGame, saveGame, updatePhoto } from "../api/GameService";
import { toastSuccess } from "../api/Toast";

const GameDetails = ({ updateGame, updateImage }) => {
  const inputRef = useRef();
  const [game, setGame] = useState({
    id: "",
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
      setGame((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
      toastSuccess("Photo updated!");
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setGame({...game, [e.target.name]: e.target.value})
  };
  const onUpdateGame = async (e) => {
    e.preventDefault();
    await updateGame(game);
    fetchGame(id)
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
        <div className="game_settings">
          <form onSubmit={onUpdateGame} className="form">
            <div className="user-details">
              <input
                type="hidden"
                defaultValue={game.id}
                name="id"
                required
              />
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={game.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={game.protagonist}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={game.rating}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
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
