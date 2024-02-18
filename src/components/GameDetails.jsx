import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGame, saveGame, updatePhoto } from "../api/GameService";
import { toastSuccess } from "../api/Toast";

const GameDetails = ({ updateGame, updateImage, deleteGame }) => {
  const navToHome = useNavigate();
  const modalRef = useRef();
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
      setGame(data);
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
      fetchGame(id);
      toastSuccess("Photo updated!");
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setGame({ ...game, [e.target.name]: e.target.value });
  };
  const onUpdateGame = async (e) => {
    e.preventDefault();
    await updateGame(game);
    fetchGame(id);
    toastSuccess("Game updated!");
  };

  const onDeleteGame = async (e) => {
    e.preventDefault();
    await deleteGame(game.id);
    toastSuccess("Game deleted!");
    navToHome('/');
  }

  useEffect(() => {
    fetchGame(id);
  }, []);

  const toggleDeleteModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  return (
    <>
      <section className="game_details_wrapper">
        <div className="game_details_body">
          <img
            src={game.photoUrl}
            alt={`Photo of ${game.name}`}
            className="game_details_image"
          />
          <div className="game_details_info">
            <Link to={"/"} className="game_details_close">
              <p>Back to Home</p>
            </Link>
            <div className="game">
              <div className="game_settings">
                <form onSubmit={onUpdateGame} className="form">
                  <div className="user-details">
                    <div className="input-box-text">
                      <input
                        type="hidden"
                        defaultValue={game.id}
                        name="id"
                        required
                      />
                    </div>
                    <div className="game-details-input-box">
                      <span className="details">Name</span>
                      <div className="input-box-text">
                        <input
                          type="text"
                          value={game.name}
                          onChange={onChange}
                          name="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="game-details-input-box">
                      <span className="details">Rating</span>
                      <div className="input-box-text">
                        <input
                          type="text"
                          value={game.rating}
                          onChange={onChange}
                          name="rating"
                          required
                        />
                      </div>
                    </div>
                    <div className="game-details-input-box">
                      <span className="details">Protagonist</span>
                      <div className="input-box-text">
                        <input
                          type="text"
                          value={game.protagonist}
                          onChange={onChange}
                          name="protagonist"
                          required
                        />
                      </div>
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
            <button
              onClick={() => {
                toggleDeleteModal(true);
              }}
              className="danger"
            >
              Delete Game
            </button>
            <div className="game_metadata">
              <p className="game_name">{game.name}</p>
              <p className="game_file_formats">
                JPG, PNG, or GIF - max size 10MB
              </p>
              <button className="" onClick={selectImage}>
                Change Photo
              </button>
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
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <section className="modal_wrapper">
          <div className="delete-modal-container">
            <p onClick={() => toggleDeleteModal(false)} className="close-tag">
              close
            </p>
            <h3>Are you sure you want to delete {game.name}?</h3>
            <button style={{width: "30%"}} onClick={onDeleteGame}>Delete Game</button>
          </div>
        </section>
      </dialog>
    </>
  );
};

export default GameDetails;
