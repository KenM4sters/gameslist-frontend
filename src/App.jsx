import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  getGame,
  getGames,
  saveGame,
  updateGame,
  updatePhoto,
} from "./api/GameService";
import GameList from "./components/GameList";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import { ToastContainer, toast } from "react-toastify";
import { toastError } from "./api/Toast";

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    protagonist: "",
    rating: "",
  });

  const getAllGames = async (page = 0, size = 4) => {
    try {
      setCurrentPage(page);
      const { data } = await getGames(page, size);
      setData(data);
    } catch (e) {
      console.log(e);
      toastError(e);
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleNewGame = async (e) => {
    e.preventDefault();
    try {
      const { data } = await saveGame(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: "",
        protagonist: "",
        rating: "",
      });
      getAllGames();
    } catch (e) {
      console.log(e);
      toastError(e);
    }
  };

  const updateGame = async (game) => {
    try {
      const { data } = await saveGame(game);
    } catch (e) {
      console.log(e);
      toastError(e);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (e) {
      console.log(e);
      toastError(e);
    }
  };

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  return (
    <>
      <Header toggleModal={toggleModal} numOfGames={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/games"} />} />
            <Route
              path="/games"
              element={
                data.content ? (
                  <GameList
                    data={data}
                    currentPage={currentPage}
                    getAllGames={getAllGames}
                  />
                ) : (
                  <p>waiting for data...</p>
                )
              }
            />
            <Route
              path="/games/:id"
              element={
                <GameDetails
                  updateGame={updateGame}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <section className="modal_wrapper">
          <div className="modal_header">
            <h3>New Game</h3>
            <p onClick={() => toggleModal(false)} className="close-tag">
              close
            </p>
          </div>
          <div className="divider"></div>
          <div className="modal_body">
            <form onSubmit={handleNewGame} className="modal_form">
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Name</span>
                  <div className="input-box-text">
                    <input
                      type="text"
                      value={values.name}
                      onChange={onChange}
                      name="name"
                      required
                    />
                  </div>
                </div>
                <div className="input-box">
                  <span className="details">Protagonist</span>
                  <div className="input-box-text">
                    <input
                      type="text"
                      value={values.protagonist}
                      onChange={onChange}
                      name="protagonist"
                      required
                    />
                  </div>
                </div>
                <div className="input-box">
                  <span className="details">Rating</span>
                  <div className="input-box-text">
                    <input
                      type="text"
                      value={values.rating}
                      onChange={onChange}
                      name="rating"
                      required
                    />
                  </div>
                </div>
                <div className="file-input" >
                  <span className="details">Profile Photo</span>
                  <div className="">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      ref={fileRef}
                      name="photo"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form_footer">
                <button
                  onClick={() => toggleModal(false)}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
