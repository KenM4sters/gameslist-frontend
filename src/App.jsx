import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getGame, getGames } from './api/GameService';
import GameList from './components/GameList'
import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

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

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();


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
    </>
  )
}

export default App
