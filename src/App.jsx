import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getGame, getGames, saveGame } from './api/GameService';
import GameList from './components/GameList'
import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    protagonist: "",
    rating: ""
  });

  const getAllGames = async(page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getGames(page, size);
      setData(data);
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllGames();
  }, []);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleNewGame = async (e) => {
    e.preventDefault();
    try {
      const res = await saveGame(values);
    } catch(e) {
      console.log(e);
    }
  }

  const toggleModal = (show) =>  show ? modalRef.current.showModal() : modalRef.current.close();


  return (
    <>
      <Header toggleModal={toggleModal} numOfGames={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Navigate to={"/games"} />}/>
            <Route path="/games" element={data.content ? <GameList data={data} currentPage={currentPage} getAllGames={getAllGames}/> : <p>waiting for data...</p>} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Game</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewGame}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Protagonist</span>
                <input type="text" value={values.protagonist} onChange={onChange} name='protagonist' required />
              </div>
              <div className="input-box">
                <span className="details">Rating</span>
                <input type="text" value={values.rating} onChange={onChange} name='rating' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default App
